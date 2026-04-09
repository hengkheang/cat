# 🐱 Cat Oracle

A mystical, generative cat gallery built with React + Vite. Deployed on GitHub Pages.

## Setup

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

### Option A — GitHub Actions (recommended, automatic)

1. Push this repo to GitHub
2. Go to **Settings → Pages → Source** → select **GitHub Actions**
3. Every push to `main` will auto-deploy ✨

### Option B — Manual with gh-pages

```bash
# Set your repo name in vite.config.js first!
npm run deploy
```

### ⚠️ Important: set your repo name

Open `vite.config.js` and change the `base` to match your repo name:

```js
base: '/your-repo-name/',
```

## Tech

- React 18 + Vite
- [The Cat API](https://thecatapi.com) (no key needed for basic use)
- CSS Modules — no external CSS libraries
- Google Fonts: Cinzel + Cormorant Garamond
