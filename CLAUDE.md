# CLAUDE.md - Instructions for Claude Code

## Project Overview
ToolPilot is a modern web application for developer, productivity, PDF, conversion, image, and finance tools built with React, TypeScript, Vite, and Tailwind CSS.

## Git & Workflow Guidelines

### Header Navigation
- The header shows the logo, an "All tools" mega-menu with category links (Finance, Developer, PDF, Image, Text), search and action icons. Keep this navigation.

### Staging, Committing & Pushing to GitHub
When the user asks to push changes to GitHub:
1. Always check `git status` first to inspect modified and untracked files.
2. Ensure no stale lock file blocks git operations by running `rm -f .git/index.lock`.
3. Remove temporary backup/trash folders if present (e.g., `_to_delete/`).
4. Stage all changes with `git add .`.
5. Create a descriptive commit message summarizing the updates made.
6. Push directly to remote using `git push origin main` (or the active branch).
7. Ensure network permissions are enabled if running inside a restricted sandbox environment.

## Development & Build Commands
- `npm run dev`: Start local development server
- `npm run build`: Build production assets (`tsc && vite build`)
- `npm test`: Run tests
