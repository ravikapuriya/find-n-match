# FIND & MATCH!

A fast-paced pattern recognition game built with [Phaser 3](https://phaser.io/) and TypeScript, using Vite for development and build tooling.

## Game Description

FIND & MATCH! is a digital version of the classic card game where players must quickly find the matching symbol between two cards. Each card has a unique set of symbols, and there is always exactly one symbol in common between any two cards.

## Features

- Modern Phaser 3 + TypeScript + Vite setup
- Animated backgrounds and sound effects
- Dozens of unique, colorful symbols
- Responsive UI and smooth gameplay
- Easily extensible for new features or assets

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone the repository:
	```sh
	git clone <your-repo-url>
	cd phaser3-typescript-vite-template-master
	```
2. Install dependencies:
	```sh
	npm install
	```

### Running the Game (Development)

```sh
npm run dev
```
Open the local URL shown in your terminal to play.

### Building for Production

```sh
npm run build
```
The output will be in the `dist/` folder.

## Project Structure

- `src/` — Main game source code
  - `scenes/` — Phaser scenes (Game, Menu, Preload, etc.)
  - `helper/` — Utility and helper functions (deck generation, shapes, etc.)
  - `data/` — Game options and asset definitions
- `public/assets/` — Sprites, images, sounds, and other static assets
- `vite.config.ts` — Vite configuration
- `tsconfig.json` — TypeScript configuration

## Credits

- Game logic and code: [Your Name]
- Symbol art: [Attribution or source if required]
- Built with [Phaser 3](https://phaser.io/)

## License

MIT License. See [LICENSE](LICENSE) for details.
