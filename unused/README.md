# unused/

Nothing in here is part of the live site. It is kept for reference rather
than deleted, so the history and the old designs stay easy to look back at.

Nothing here is deployed: `build.js` publishes an **allowlist** of files, so
anything not named in `COPY_AS_IS` (or compiled into the bundle) never
reaches `public/` and is not reachable on the web.

| Path | What it was |
|---|---|
| `css/` | Stylesheets for the pre-v2 design. Unreferenced since the Field Notes redesign. |
| `js/main.js` | Old site interactions — nav, scroll reveal, tabs, lightbox, LeetCode stats. |
| `js/jarvis.js` | The earlier HIREN chatbot, including the contact-email flow. Holds a second, now outdated copy of the system prompt. |
| `notebook-v1/` | The first notebook design (`index.html` plus its page modules). Was still being served at `/notebook/` with broken image paths. |
| `extract.js` | One-off script that dumped resume text with `pdf-parse` (never a dependency). |
| `img/` | Icons, certificate screenshots and project images the v2 pages don't use. v2 reads its images from `notebook/assets/`. |
| `IMG_20260125_124427.jpg` | A 1.1MB photo referenced nowhere. |

If you want any of this back, move it out and add it to `COPY_AS_IS` in
`build.js` (or import it into the bundle) — restoring the file alone is not
enough to publish it.
