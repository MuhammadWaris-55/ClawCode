# ClawCode

A CLI coding agent inspired by [OpenClaw](https://github.com/openclaw/openclaw) — built with **Bun** and **TypeScript**. ClawCode reads, analyzes, and modifies your codebase through an approval-based workflow, with three interaction modes (Agent, Plan, Ask) and remote control via Telegram.

---

## Features

- **Agent Mode** — autonomously executes multi-step coding tasks on your codebase
- **Plan Mode** — generates a step-by-step plan and asks for approval before any action is taken
- **Ask Mode** — read-only Q&A about your codebase, no file changes
- **Approval-based staging** — every file create/modify/delete is staged and logged before being written to disk; nothing touches your real files without confirmation
- **Web search tool** — powered by [Firecrawl](https://www.firecrawl.dev/), so the agent can pull in external/up-to-date information while working
- **Telegram integration** — control ClawCode remotely from your phone, including approving/rejecting plans and staged actions via inline buttons
- **Skill-aware** — reads local skill files (compatible with `.claude/skills` and `.cursor/skills-cursor` conventions)

---

## Requirements

- **[Bun](https://bun.sh)** `>=1.0.0` — ClawCode is built and run entirely on Bun, not Node.js. [Install Bun here](https://bun.sh/docs/installation) before proceeding.
- A **Telegram bot token** (optional, only needed for Telegram mode)
- An **OpenRouter API key** (for model access)
- A **Firecrawl API key** (for the web search tool)

---

## Installation

```bash
npm install -g clawcode-cli
```

Or, if you prefer installing with Bun directly:

```bash
bun add -g clawcode-cli
```

This installs the `clawcode-build` command globally on your system.

---

## Environment Setup

ClawCode reads its configuration from a `.env` file in your project root. Create one with the following keys:

```env
# Model provider
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Web search tool
FIRECRAWL_API_KEY=your_firecrawl_api_key_here

# Telegram integration (optional — only required for Telegram mode)
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
TELEGRAM_OWNER_ID=your_telegram_numeric_user_id_here
```

> ⚠️ **Never commit your `.env` file.** It's already excluded via `.gitignore` — keep it that way. Anyone with your API keys or bot token can use them on your behalf.

### Getting your API keys

| Key | Where to get it |
|---|---|
| `OPENROUTER_API_KEY` | [openrouter.ai](https://openrouter.ai/) → API Keys |
| `FIRECRAWL_API_KEY` | [firecrawl.dev](https://www.firecrawl.dev/) → Dashboard → API Keys |
| `TELEGRAM_BOT_TOKEN` | Message [@BotFather](https://t.me/BotFather) on Telegram → `/newbot` |
| `TELEGRAM_OWNER_ID` | Message [@userinfobot](https://t.me/userinfobot) on Telegram |

---

## Usage

Once installed and your `.env` is set up, run:

```bash
clawcode-build wakeup
```

You'll be prompted to choose a mode:

- **CLI mode** — interact directly in your terminal
- **Telegram mode** — control ClawCode remotely from Telegram

### CLI mode

After selecting CLI mode, choose one of:

- `Agent` — describe a task, ClawCode executes it end-to-end
- `Plan` — describe a goal, review and approve a generated step-by-step plan before execution
- `Ask` — ask questions about your codebase without making any changes

### Telegram mode

Once selected, ClawCode starts listening for messages from your bot. Message your bot directly from your phone to:

- Send tasks and goals
- Review and approve/reject staged plans with inline buttons
- Approve or reject individual file changes before they're written to disk

Only messages from the `TELEGRAM_OWNER_ID` you configured will be processed — all other senders are ignored for security.

---

## How it works

Every action ClawCode wants to take on your codebase — creating a file, modifying one, deleting one, running a shell command — is first **staged** and logged, not executed immediately. You review and approve (or reject) each action before anything actually touches your disk. This keeps the agent transparent and prevents unwanted changes.

---

## Project Structure

```
ClawCode/
├── ai/            # model provider setup, tool definitions
├── modes/
│   ├── agent/     # Agent mode logic
│   ├── ask/       # Ask mode logic
│   ├── plan/      # Plan mode logic (planner, validation, approval)
│   └── telegram/  # Telegram bot integration (handlers, sessions, approvals)
├── tui/           # terminal UI (wakeup screen, markdown rendering)
├── index.ts       # CLI entry point
└── package.json
```

---

## Contributing

Issues and pull requests are welcome. If you run into a bug or have a feature idea, feel free to open an issue on the [GitHub repository](https://github.com/MuhammadWaris-55/ClawCode).

---

## License

MIT © [Muhammad Waris](https://wariscodes.com)