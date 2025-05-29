import * as vscode from 'vscode';
import { queryLLM } from '../llm/queryLLM';

export function registerChatCommand(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('extension.chatWithLLM', async () => {
    const input = await vscode.window.showInputBox({ prompt: 'Ask your local LLM' });
    if (!input) return;

    const result = await queryLLM(input);
    vscode.window.showInformationMessage(result || 'No response.');
  });

  context.subscriptions.push(disposable);
}
