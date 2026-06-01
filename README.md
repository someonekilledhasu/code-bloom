# CodeBloom

CodeBloom is a self-contained Git learning garden for first-time open source contributors. It combines a soft baby-pink interface with practical Git lessons, saved progress, a guided command lab, a pull-request roadmap, a curated repository explorer, and rotating Git facts from two CSS-drawn side companions.

## Live Demo
🌐 https://lifeops-three.vercel.app/

## Open the app

You can open `index.html` directly in a browser. For the most reliable local experience, serve the folder with any static server:

```powershell
cd outputs/codebloom
python -m http.server 4173
```

Then visit `http://localhost:4173`.

## Features

- Six practical Git modules with command explanations and checkpoints
- A guided Git workflow simulator that models repository state
- A searchable, filterable explorer with 30 real open source repositories
- A checkable eight-step contribution roadmap
- Eighteen hand-picked learning resources
- Local saved progress, profile details, and achievement patches
- Global search with `Ctrl K`
- Soft pink and berry-night themes
- Responsive layout and mobile navigation
- CSS-drawn mascot companions with rotating Git facts

## Project structure

```text
codebloom/
  index.html
  styles.css
  app.js
  README.md
```

The app has no build step and no external dependencies. All progress is stored in browser `localStorage`.
