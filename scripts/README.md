# Website Validation Scripts

This folder contains post-build scripts for link quality and sitemap checks.

## Commands

```bash
npm run check:all
npm run build:check
npm run check:links
npm run check:deadlinks
npm run check:sitemap
```

## Scripts

- `check-trailing-slashes.mjs`: fails if internal page links miss trailing slashes.
- `check-dead-links.mjs`: fails if internal page links point to missing routes.
- `check-sitemap-status.mjs`: checks deployed sitemap and robots.txt health.

## Notes

- The link checks read from `dist/` after a build.
- `check:sitemap` targets `https://openapi-format.com` by default.
- Override the site host for sitemap checks with `SITE_URL`, for example:

```bash
SITE_URL="https://preview.example.com" npm run check:sitemap
```
