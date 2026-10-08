# Ewan Frontend — Organized CSS (Safe Pass)

This pass reorganizes the existing SCSS without intentionally changing selector order or behavior.

## What changed
- `src/styles.scss` is now an ordered import index instead of a 22k-line file.
- Original global blocks were moved into `src/styles/` in the exact same cascade order.
- `home.scss` was split into ordered partials under `pages/home/styles/` while preserving order.
- `angular.json` and `package.json` are included unchanged.
- Existing page/component TypeScript and HTML were left unchanged.

## Responsive convention going forward
- Phone: `@media (max-width: 767px)`
- Tablet: `@media (min-width: 768px) and (max-width: 992px)`
- Desktop: base styles outside media queries.

## Important
The project contains legacy responsive overrides that overlap (some use 1024px). They are preserved in this safe pass so the current design does not break. Clean those visually page-by-page after confirming the site still renders the same.
