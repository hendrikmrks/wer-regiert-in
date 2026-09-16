# Wer regiert in?

![License](https://img.shields.io/github/license/hendrikmrks/wer-regiert-in)
![Issues](https://img.shields.io/github/issues/hendrikmrks/wer-regiert-in)
![Stars](https://img.shields.io/github/stars/hendrikmrks/wer-regiert-in)
![Forks](https://img.shields.io/github/forks/hendrikmrks/wer-regiert-in)

**Wer regiert in?** visualizes the political landscape of Germany's 16 federal states (Bundesländer). It renders an interactive SVG map of Germany; clicking a state opens a detail view with its current government, governing party/coalition, population, and ministers.

> The live site (formerly hosted at wer-regiert-in.de) is no longer online. This repository is kept public as open source reference code.

## Table of Contents

- [How It Works](#how-it-works)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Data](#data)
- [Deployment](#deployment)
- [Planned Features](#planned-features)
- [Contributing](#contributing)
- [Code of Conduct](#code-of-conduct)
- [License](#license)

## How It Works

The frontend is a single-page React app. It bundles two static data files directly from source (no runtime API calls required to render the map):

- `src/data/bundeslaender.geo.json` — GeoJSON geometry for the 16 federal states, converted into SVG paths client-side (`src/hooks/loadGeoData.jsx`, `src/hooks/calculateMap.jsx`) using `d3-geo`/`topojson-client`.
- `src/data/statesData.json` — hand-maintained data per state: name, population, governing party/coalition, and list of ministers/government members.

Clicking a state on the map (`src/components/GermanyMap.jsx`) opens `src/components/StateModal.jsx`, which renders that state's government info, seat distribution (`SeatsDiagram.jsx`, via `recharts`/`@mui/x-charts`), and coalition breakdown (`Coalition.jsx`).

The footer's "last updated" timestamp is fetched live from the GitHub API (`src/hooks/lastGithubPush.js`), showing when this repository's `main` branch was last pushed — a way to signal how current the data is without a backend.

## Tech Stack

- **Frontend**: React 18, Vite 6, MUI (`@mui/material`, `@mui/x-charts`), React-Bootstrap, `d3-geo` / `topojson-client`, `recharts`
- **API** (`/api`, optional): Node.js, Express, Axios, CORS
- **Deployment**: static build shipped via SFTP through GitHub Actions

## Project Structure

```
wer-regiert-in/
├── src/
│   ├── components/       # GermanyMap, StateModal, Coalition, SeatsDiagram
│   ├── hooks/             # geo data loading, map path calculation, formatting, last-push timestamp
│   ├── data/               # bundeslaender.geo.json, statesData.json
│   ├── App.jsx
│   └── main.jsx
├── public/
├── api/                   # standalone Express API (see below)
│   ├── app.js
│   ├── caching-middleware.js
│   └── package.json
└── .github/workflows/main.yml
```

## Getting Started

Requires [Node.js](https://nodejs.org/) 18+.

```bash
# Clone the repository
git clone https://github.com/hendrikmrks/wer-regiert-in.git
cd wer-regiert-in

# Install frontend dependencies
npm install

# Start the frontend dev server (Vite, http://localhost:5173)
npm run dev

# Production build
npm run build
npm run preview

# Lint
npm run lint
```

The frontend needs no environment variables and no running API to work locally — it reads `src/data/statesData.json` directly at build time.

### Running the API

`/api` is a small Express service that re-serves `statesData.json` as a JSON API (`/api/states`, `/api/states/:stateId`, `/api/parties`, `/api/ministers`, `/api/states/by-party/:party`), fetching it live from this repository's `main` branch on GitHub rather than from a local copy. It isn't required to run the frontend and isn't currently wired into the UI.

```bash
cd api
npm install
npm start   # or: npm run dev (nodemon)
```

> Note: `api/caching-middleware.js` implements a simple in-memory response cache but is not currently required by `api/app.js` — every request hits the GitHub raw content URL directly. Treat it as a reference for how caching could be added, not as active code.

## Data

State data lives in [`src/data/statesData.json`](src/data/statesData.json) and is maintained by hand. To correct or update information about a state's government, edit that file directly and open a pull request — see [Contributing](#contributing).

## Deployment

[`.github/workflows/main.yml`](.github/workflows/main.yml) builds the frontend and deploys `dist/` to a server via SFTP on every push to `main`. Since the original hosting is no longer active, this workflow is kept for reference but will fail without the `SFTP_*` repository secrets configured; feel free to adapt or remove it for your own fork.

## Planned Features

- Multi language support
- Representation of the Federal Government
- Representation of previous governments

## Contributing

Contributions are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md) for how to set up your environment, the branch/PR workflow, and how to propose data corrections.

For major changes, please open an issue first to discuss what you'd like to change.

## Code of Conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md). By participating, you're expected to uphold it.

## License

This project is licensed under the [MIT License](LICENSE) — see the LICENSE file for details.
