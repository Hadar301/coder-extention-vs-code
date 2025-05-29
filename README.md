# coder-extention-vs-code



# Local Code Assistant (VS Code Extension)

**Local Code Assistant** is a Visual Studio Code extension that enables real-time, privacy-preserving code suggestions powered by a local Large Language Model (LLM) such as [DeepSeek Coder](https://github.com/deepseek-ai/DeepSeek-Coder) served via [LM Studio](https://lmstudio.ai/).

## ✨ Features

- 🔌 **Offline/Local LLM** support via LM Studio (OpenAI-compatible API).
- 💬 **Ask LLM** command: Chat directly with your local LLM in the editor.
- 🤖 **Inline Code Completion**: Auto-suggests code as you type, like GitHub Copilot — but private.

## 🛠 Requirements

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)
- [VS Code](https://code.visualstudio.com/)
- [LM Studio](https://lmstudio.ai/) with a downloaded LLM (e.g. `deepseek-coder-6.7b-instruct`)
- LM Studio must be running an OpenAI-compatible API server (e.g. `http://localhost:1234`)

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/local-code-assistant
cd local-code-assistant

