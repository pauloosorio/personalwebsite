# Paulo's Garden Portfolio

Personal portfolio website for Paulo Osorio.

The site is built around an animated garden, interactive object layers, paper-based dialogs, and project pages that document product design, design-system work, and the making of the portfolio itself.

## Prerequisites

- Node.js `>=22.13.0`

## Local Development

```bash
pnpm install
CI=true pnpm run dev
```

## Commands

- `CI=true pnpm run dev`: start local development
- `CI=true pnpm run build`: verify production build output
- `CI=true pnpm run lint`: run linting
- `CI=true pnpm run test`: run the existing build/render checks

## Project Notes

- Main app source lives in `app/`.
- Public images, video, PDF, and generated assets live in `public/`.
- Hosting configuration lives in `.openai/hosting.json`.
- The broader project documentation lives one level above this site folder.
- The live website should only be updated after Paulo validates the local change and explicitly approves publishing.
