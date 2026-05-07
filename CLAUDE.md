# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Institutional website for **Evos Engenharia**, an engineering solutions company based in Belo Horizonte, MG, Brazil. The site is a single-page application (no framework, no build step) serving as a marketing/lead-generation page.

## Architecture

- **Static site**: plain HTML + CSS + vanilla JS — no bundler, no dependencies, no package.json
- **Single page**: `index.html` contains all sections; navigation uses anchor links with smooth scroll
- **Hosting**: GitHub Pages from `master` branch at `stratumengenharia.github.io/evos-engenharia`

### Key Files

| File | Purpose |
|------|---------|
| `index.html` | Full page structure — header, hero (video bg), about, services (tabbed), differentials, clients carousel, CTA, blog, contact form, footer |
| `styles.css` | All styling — CSS variables in `:root`, responsive breakpoints at 1024/768/480px |
| `script.js` | Interactivity — mobile menu, scroll spy, service tabs, animated counters (IntersectionObserver), contact form → WhatsApp redirect, scroll reveal animations, phone input mask |

### Design System (CSS Variables)

- Primary palette: `--primary: #1a3c40` (dark teal from logo), `--accent: #d4912a` (golden orange)
- Fonts: `Inter` (body), `Poppins` (headings) via Google Fonts
- Icons: Font Awesome 6.5 via CDN

### Assets (`img/`)

- `hero-video-hd.mp4` / `hero-video.mp4` — background video (Pexels, free license)
- `hero-bg.jpg`, `about.jpg`, `cta-bg.jpg`, `servicos.jpg` — section images (Unsplash, free license)
- `logo-outline.svg` — unused SVG attempt (can be deleted)

### Services Data

Service listings come from two reference files (`Evos Engenharia Civil.txt`, `Evos Engenharia Mecanica.txt`) and are hardcoded into the HTML under two tabs: "Edificações e Estruturas" and "Equipamentos e Instalações". The site intentionally avoids labeling these as "civil" or "mechanical" engineering — it uses generic terms like "Soluções em Engenharia."

## Development

Open `index.html` directly in a browser — no server or build required. For live reload during development, use any static server (e.g., `npx serve .` or VS Code Live Server).

## Deployment

Push to `master` branch triggers GitHub Pages rebuild automatically. The site is public at:
```
https://stratumengenharia.github.io/evos-engenharia/
```

## Contact Form Behavior

The contact form does **not** have a backend. On submit, it builds a pre-filled WhatsApp message URL (`wa.me/5537988413010`) and opens it in a new tab. The phone number belongs to the business owner.

## Important Conventions

- **Language**: all user-facing text is in Brazilian Portuguese (pt-BR)
- **Branding**: the company name is "Evos Engenharia" — never specify engineering sub-disciplines (civil, mechanical) in marketing copy; keep it generic as "Soluções em Engenharia"
- **Logo**: use `Logo Atualizada.png` (transparent background version); the old `Logo Evos Engenharia.jpeg` is kept for reference only
- **Logo spacing**: the logo image has internal transparent padding, so `margin-right: -40px` is applied to close the gap with the text
