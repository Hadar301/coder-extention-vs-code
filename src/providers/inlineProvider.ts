import * as vscode from 'vscode';
import { queryLLM } from '../llm/queryLLM';

export class InlineCodeCompletionProvider implements vscode.InlineCompletionItemProvider {
  async provideInlineCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    context: vscode.InlineCompletionContext,
    token: vscode.CancellationToken
  ): Promise<vscode.InlineCompletionList> {
    const linePrefix = document.lineAt(position).text.substring(0, position.character);
    if (!linePrefix.trim()) return { items: [] };

    const prompt = `Continue this code with only the next line of code, no explanation:\n${linePrefix}`;
    console.log('[InlineProvider] Prompt sent to LLM:', prompt);

    const raw = await queryLLM(prompt);
    if (!raw) return { items: [] };

    const cleaned = raw.replace(/```[\s\S]*?```/, '').trim();
    const lines = cleaned.split('\n').map(line => line.trim()).filter(Boolean);
    const suggestion = lines[0] || '';
    console.log('[InlineProvider] Final Suggestion Inserted:', suggestion);

    if (!suggestion) return { items: [] };

    const currentLine = document.lineAt(position);
    const range = new vscode.Range(position, currentLine.range.end);

    return {
      items: [
        {
          insertText: suggestion,
          range,
        }
      ]
    };
  }
}
