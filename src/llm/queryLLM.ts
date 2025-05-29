import fetch from 'node-fetch';
import * as vscode from 'vscode';

export async function queryLLM(prompt: string): Promise<string | null> {
  try {
    const res = await fetch('http://localhost:1234/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'deepseek-coder-6.7b-instruct', // Match your LM Studio model name
        messages: [
          { role: 'system', content: 'You are a helpful coding assistant. Reply with code only.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.2,
        max_tokens: 100
      })
    });

    const json = await res.json();
    return json.choices?.[0]?.message?.content?.trim() ?? null;
  } catch (err: any) {
    vscode.window.showErrorMessage('LLM query failed: ' + err.message);
    return null;
  }
}
