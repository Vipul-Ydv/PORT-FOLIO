/**
 * Build Script — produces the deployable `public/` folder.
 *
 * Everything shipped to the browser is compiled and minified into a single
 * bundle, so the site is not served as a readable tree of source files.
 * Nothing is published unless it is named here: the copy list is an
 * allowlist, not a filter.
 *
 * Note: minification is obfuscation, not privacy. Any code the browser runs
 * can be read by whoever runs it. Secrets belong in the serverless functions
 * under api/ (which are never copied into public/), not in the page.
 *
 * Usage: npm run build
 */

import fs from 'fs';
import path from 'path';
import { minify as minifyHTML } from 'html-minifier-terser';
import { minify as minifyJS } from 'terser';
import { transformAsync } from '@babel/core';
import presetReact from '@babel/preset-react';

const DIST = './public';

// Static files/folders published as-is. Anything absent from this list is not
// deployed — dead code and unused assets stay out of the bundle by default.
const COPY_AS_IS = [
    'img/portfolio.png',        // og:image
    'img/hiren-sketch.svg',     // favicon
    'notebook/assets',          // project + profile images used by the pages
    'vipul_res.pdf',            // linked from the contact page
];

// Compiled in this order into one bundle; order matters because each file
// hangs its exports off `window` for the next one to read.
const APP_SOURCES = [
    'notebook/data.js',
    'notebook/v2/toc.js',
    'notebook/scribbles.js',
    'notebook/hiren.js',
    'notebook/v2/pages-a.jsx',
    'notebook/v2/pages-b.jsx',
    'notebook/v2/pages-c.jsx',
    'notebook/v2/pages-d.jsx',
    'notebook/v2/app.jsx',
];

const BUNDLE_NAME = 'app.min.js';

// ── Helpers ──────────────────────────────────────────────────────────

function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyRecursive(src, dest) {
    if (!fs.existsSync(src)) {
        console.warn(`⚠️  Skipped missing asset: ${src}`);
        return;
    }
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
        ensureDir(dest);
        for (const child of fs.readdirSync(src)) {
            copyRecursive(path.join(src, child), path.join(dest, child));
        }
    } else {
        ensureDir(path.dirname(dest));
        fs.copyFileSync(src, dest);
    }
}

function kb(bytes) {
    return `${(bytes / 1024).toFixed(1)}kb`;
}

// ── Anti-DevTools Script (injected into HTML) ────────────────────────
// Kept from the original build. Worth knowing: this stops nobody who wants
// the source (View Source, curl and the network tab all still work) and it
// does block ordinary visitors from copying text or using browser tooling.
// Bundling above is what actually removes the readable file tree.

const ANTI_DEVTOOLS_SCRIPT = `
<script>
document.addEventListener('contextmenu',function(e){e.preventDefault()});
document.addEventListener('keydown',function(e){
  if(e.key==='F12'||(e.ctrlKey&&e.shiftKey&&(e.key==='I'||e.key==='J'||e.key==='C'))||(e.ctrlKey&&e.key==='u')){e.preventDefault()}
});
</script>
`;

// ── Build Steps ──────────────────────────────────────────────────────

async function buildBundle() {
    let combined = '';
    let rawBytes = 0;

    for (const file of APP_SOURCES) {
        const source = fs.readFileSync(file, 'utf-8');
        rawBytes += source.length;
        // JSX is compiled here, once, instead of shipping a 3MB compiler to
        // every visitor and transpiling on each page load.
        const { code } = await transformAsync(source, {
            filename: file,
            presets: [[presetReact, { runtime: 'classic' }]],
            babelrc: false,
            configFile: false,
            sourceMaps: false,
        });
        // Each file gets its own scope: they all declare top-level consts with
        // the same names (Underline, COL, ...) and communicate through window,
        // exactly as separate <script> tags did.
        combined += `\n/* ${file} */\n(function(){\n${code}\n})();\n`;
    }

    const wrapped = combined;

    const minified = await minifyJS(wrapped, {
        compress: { passes: 2, drop_console: true },
        mangle: true,
        format: { comments: false },
        sourceMap: false,
    });

    if (minified.error) throw minified.error;

    ensureDir(path.join(DIST, 'assets'));
    fs.writeFileSync(path.join(DIST, 'assets', BUNDLE_NAME), minified.code);
    return { rawBytes, outBytes: minified.code.length };
}

function rewriteHtml(html) {
    // Replace the nine source <script> tags (and the Babel CDN load) with the
    // single compiled bundle. React stays on the CDN.
    const withoutBabel = html.replace(
        /\s*<script src="https:\/\/unpkg\.com\/@babel\/standalone[^"]*"><\/script>/,
        ''
    );
    const withoutSources = withoutBabel.replace(
        /\s*<script(?: type="text\/babel")? src="notebook\/[^"]*"><\/script>/g,
        ''
    );
    return withoutSources.replace(
        '</body>',
        `<script src="assets/${BUNDLE_NAME}"></script>\n</body>`
    );
}

async function build() {
    console.log('🔨 Building production version...\n');

    if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true });
    ensureDir(DIST);
    console.log('✅ Cleaned public/');

    for (const item of COPY_AS_IS) {
        copyRecursive(item, path.join(DIST, item));
    }
    console.log(`✅ Copied ${COPY_AS_IS.length} static assets (api/ is deliberately not published)`);

    const { rawBytes, outBytes } = await buildBundle();
    console.log(`✅ Compiled + minified ${APP_SOURCES.length} sources into assets/${BUNDLE_NAME} (${kb(rawBytes)} → ${kb(outBytes)})`);

    for (const page of ['index.html', '404.html']) {
        const input = fs.readFileSync(page, 'utf-8');
        const staged = page === 'index.html' ? rewriteHtml(input) : input;
        const withProtection = staged.replace('</body>', ANTI_DEVTOOLS_SCRIPT + '</body>');
        const output = await minifyHTML(withProtection, {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeEmptyAttributes: true,
            minifyCSS: true,
            minifyJS: true,
            removeAttributeQuotes: false,
        });
        fs.writeFileSync(path.join(DIST, page), output);
        console.log(`✅ Minified ${page} (${kb(input.length)} → ${kb(output.length)})`);
    }

    console.log('\n🎉 Build complete — deploy public/');
    console.log('   Source files are compiled into one bundle; none are served individually.');
}

build().catch(err => {
    console.error('❌ Build failed:', err);
    process.exit(1);
});
