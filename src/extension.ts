import * as vscode from 'vscode';
import { queryLLM } from './llm/queryLLM';
import { InlineCodeCompletionProvider } from './providers/inlineProvider';

export function activate(context: vscode.ExtensionContext) {
  console.log('Extension "Local Code Assistant" is now active!');

  // Register the "Ask LLM" command (optional but useful)
  context.subscriptions.push(
    vscode.commands.registerCommand('local-code-assistant.askLLM', async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;

      const selection = editor.document.getText(editor.selection);
      const prompt = selection || await vscode.window.showInputBox({ prompt: 'Enter your question for the LLM' });
      if (!prompt) return;

      const response = await queryLLM(prompt);
      if (response) {
        editor.edit(editBuilder => {
          editBuilder.insert(editor.selection.active, `\n${response}`);
        });
      }
    })
  );

  // Register inline completion provider
  context.subscriptions.push(
    vscode.languages.registerInlineCompletionItemProvider(
      { pattern: '**' }, // Apply to all files
      new InlineCodeCompletionProvider()
    )
  );
}

export function deactivate() {}
