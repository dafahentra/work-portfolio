# Works Portfolio

Personal portfolio of Dafa Hentra Anjana — financial analyst, equity researcher, and builder of data-driven tools.

---

## Overview

A multi-page static site built with Handlebars templating and Webpack. Content is fully data-driven through JSON files. Features WebGL interactions, smooth page transitions, and a work showcase with full-width slider.

## Stack

| Concern | Technology |
|---|---|
| Templating | Handlebars |
| Bundler | Webpack 4 |
| CSS | Bootstrap 5 + SCSS |
| Animation | GSAP, Locomotive Scroll |
| 3D / WebGL | Three.js |
| Deployment | Netlify |

## Structure

```
src/
  html/         Page templates
  partials/     Reusable components (header, footer, widgets)
  assets/       SCSS, JS modules, images, fonts, files
  data/         JSON content files
dist/           Build output
```

## Content

All site content is managed through JSON files. No template changes required for routine updates.

| File | Content |
|---|---|
| `src/data/config.json` | Site title and global settings |
| `src/data/work.json` | Portfolio projects |
| `src/data/experience.json` | Work experience |
| `src/data/skills.json` | Skill stacks |
| `src/assets/files/cv.pdf` | Downloadable CV |

## Usage

```bash
npm install
npm start        # development server at localhost:8080
npm run build    # production build to dist/
```

**Node.js v17+ note:** A compatibility patch for Webpack 4 / OpenSSL 3 is applied in `node_modules/webpack/lib/util/createHash.js`. Re-apply after a clean `npm install`.

## Deployment

Configured for Netlify. Push to the connected branch to trigger a build.

```
build command  : npm run build
publish dir    : dist/
```

## License

MIT — see [LICENSE.md](LICENSE.md).
