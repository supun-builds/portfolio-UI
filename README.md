# Portfolio site

Public portfolio that reads everything from `portfolio-api` (edit content in `portfolio-admin`).

```bash
cp .env.example .env.local     # NEXT_PUBLIC_API_URL=http://localhost:3000
npm install
npm run dev                    # http://localhost:3002
```

**Required:** add this site's origin to `ALLOWED_ORIGINS` in `portfolio-api/.env.local`
(e.g. `ALLOWED_ORIGINS=http://localhost:3001,http://localhost:3002`) and restart the API,
otherwise the "Let's connect" form is blocked by CORS.

Content refreshes every 60 seconds, so admin edits appear without redeploying.
