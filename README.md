 Week 5 — Single Page Application (SPA) Simulation

A responsive SPA simulation built with **HTML, CSS and vanilla JavaScript**.

## Features
- Client-side routing for `/`, `/about`, `/projects`, and `/contact`
- Browser History API using `history.pushState()`
- Back/forward navigation using `popstate`
- Dynamic DOM rendering without full-page reloads
- Active navigation state and `aria-current`
- Responsive layout for desktop, tablet and mobile
- Mobile navigation menu
- Client-side contact-form validation
- 404 route handling
- Reduced-motion support
- No external JavaScript framework or dependency

## Folder Structure
```text
week5-spa-project/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Run Locally
Because the project uses client-side routes, run it through a local server.

Example:
```bash
python -m http.server 5500
```
Then open `http://localhost:5500/`.

## Testing
Recommended viewport checks:
- 1920 × 1080 — desktop
- 1366 × 768 — laptop
- 768 × 1024 — tablet
- 390 × 844 — mobile

Test navigation by clicking every route, refreshing each route through a server, and using browser Back/Forward buttons
