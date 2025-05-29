import * as vscode from 'vscode';
import { queryLLM } from '../llm/queryLLM';

export function registerInlineProvider(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.languages.registerInlineCompletionItemProvider({ scheme: 'file' }, {
      async provideInlineCompletionItems(document, position) {
        const linePrefix = document.lineAt(position).text.substring(0, position.character);
        const filePrefix = document.getText(new vscode.Range(
          new vscode.Position(Math.max(0, position.line - 10), 0),
          position
        ));

        const prompt = `Continue the following code:\n\n${filePrefix}${linePrefix}`;
        const result = await queryLLM(prompt);
        if (!result) return [];

        return [
          {
            insertText: result,
            range: new vscode.Range(position, position),
          }
        ];
      }
    })
  );
}
