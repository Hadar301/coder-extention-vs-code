import * as vscode from 'vscode';
import { registerChatCommand } from './providers/chatProvider';
import { registerInlineProvider } from './providers/inlineProvider';

export function activate(context: vscode.ExtensionContext) {
  registerChatCommand(context);
  registerInlineProvider(context);
}

export function deactivate() {}
