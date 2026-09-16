# Contributing to Wer regiert in?

Thanks for your interest in contributing! This document covers how to set up the project locally, how to propose changes, and how to report bugs or data errors.

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## Getting Set Up

Requires [Node.js](https://nodejs.org/) 18+.

```bash
git clone https://github.com/hendrikmrks/wer-regiert-in.git
cd wer-regiert-in
npm install
npm run dev
```

This starts the Vite dev server at `http://localhost:5173`. No environment variables or running API are needed — the frontend reads `src/data/statesData.json` directly.

If you're working on the optional `/api` service:

```bash
cd api
npm install
npm run dev
```

## Ways to Contribute

- **Fix or update state data**: The most common contribution. Edit [`src/data/statesData.json`](src/data/statesData.json) (government, ministers, population, etc.) or [`src/data/bundeslaender.geo.json`](src/data/bundeslaender.geo.json) (map geometry) and open a pull request describing the source of the correction.
- **Bug fixes**: UI issues, rendering bugs, incorrect calculations (e.g. in `src/hooks/calculateMap.jsx`).
- **Features**: See the [Planned Features](README.md#planned-features) list in the README, or open an issue to discuss a new idea first.

For anything beyond a small fix, please open an issue first to discuss the change — this avoids wasted effort if the direction doesn't fit the project.

## Branching & Pull Requests

1. Fork the repository
2. Create a branch off `main` (`git checkout -b feature/short-description`)
3. Make your changes
4. Run the linter: `npm run lint`
5. Commit with a clear, descriptive message
6. Push your branch and open a Pull Request against `main`
7. Describe what changed and why, and link any related issue

## Code Style

The project uses ESLint (`npm run lint`). Please make sure your changes pass linting before opening a PR. There is no dedicated test suite at the moment — manually verify the map still renders and the relevant state's detail view is correct.

## Reporting Bugs or Incorrect Data

Open a [GitHub issue](https://github.com/hendrikmrks/wer-regiert-in/issues) with:

- What's wrong (incorrect data, broken behavior, visual bug)
- Steps to reproduce, if it's a behavioral bug
- A source/reference if you're reporting incorrect government data

## Questions

Feel free to open an issue, or reach out at kontakt@hendrik-beier.de.
