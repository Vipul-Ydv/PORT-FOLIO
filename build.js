/**
 * Build Script - Minifies & Obfuscates portfolio for production
 * 
 * Your SOURCE CODE (index.html, css/, js/) stays UNTOUCHED.
 * This creates a `dist/` folder with minified versions for deployment.
 * 
 * Usage: npm run build
 */

import fs from 'fs';
import path from 'path';
import { minify as minifyHTML } from 'html-minifier-terser';
import CleanCSS from 'clean-css';
import { minify as minifyJS } from 'terser';
import JavaScriptObfuscator from 'javascript-obfuscator';

const DIST = './public';
const ROOT = '.';

// Files/folders to copy as-is (images, PDFs, etc.)
const COPY_AS_IS = ['img', 'api', 'vipul_res.pdf', 'IMG_20260125_124427.jpg'];

// ── Helpers ──────────────────────────────────────────────────────────

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function copyRecursive(src, dest) {
    if (!fs.existsSync(src)) return;
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

// ── Anti-DevTools Script (injected into HTML) ────────────────────────

const ANTI_DEVTOOLS_SCRIPT = `
<script>
// Disable right-click context menu
document.addEventListener('contextmenu',function(e){e.preventDefault()});
// Disable common DevTools shortcuts
document.addEventListener('keydown',function(e){
  if(e.key==='F12'||(e.ctrlKey&&e.shiftKey&&(e.key==='I'||e.key==='J'||e.key==='C'))||(e.ctrlKey&&e.key==='u')){e.preventDefault()}
});
</script>
`;

// ── Build Steps ──────────────────────────────────────────────────────

async function build() {
    console.log('🔨 Building production version...\n');

    // 1. Clean dist folder
    if (fs.existsSync(DIST)) {
        fs.rmSync(DIST, { recursive: true });
    }
    ensureDir(DIST);
    console.log('✅ Cleaned dist/ folder');

    // 2. Copy static assets
    for (const item of COPY_AS_IS) {
        const src = path.join(ROOT, item);
        const dest = path.join(DIST, item);
        copyRecursive(src, dest);
    }
    console.log('✅ Copied static assets (images, PDFs, API)');

    // 3. Minify CSS
    ensureDir(path.join(DIST, 'css'));
    const cssFiles = fs.readdirSync('./css').filter(f => f.endsWith('.css'));
    for (const file of cssFiles) {
        const input = fs.readFileSync(path.join('./css', file), 'utf-8');
        const output = new CleanCSS({
            level: 2,  // Aggressive optimization
            sourceMap: false
        }).minify(input);
        fs.writeFileSync(path.join(DIST, 'css', file), output.styles);
        const savings = ((1 - output.styles.length / input.length) * 100).toFixed(1);
        console.log(`✅ Minified css/${file} (${savings}% smaller)`);
    }

    // 4. Obfuscate & Minify JS
    ensureDir(path.join(DIST, 'js'));
    const jsFiles = fs.readdirSync('./js').filter(f => f.endsWith('.js'));
    for (const file of jsFiles) {
        const input = fs.readFileSync(path.join('./js', file), 'utf-8');

        // Step 1: Obfuscate (renames variables, adds dead code)
        const obfuscated = JavaScriptObfuscator.obfuscate(input, {
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 0.5,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 0.2,
            stringArray: true,
            stringArrayEncoding: ['base64'],
            stringArrayThreshold: 0.75,
            renameGlobals: false,        // Keep global names to avoid breaking HTML references
            selfDefending: false,        // Avoid issues with formatting
            identifierNamesGenerator: 'hexadecimal',
            sourceMap: false
        }).getObfuscatedCode();

        // Step 2: Minify the obfuscated code (compress further)
        const minified = await minifyJS(obfuscated, {
            compress: true,
            mangle: true,
            sourceMap: false
        });

        fs.writeFileSync(path.join(DIST, 'js', file), minified.code);
        const savings = ((1 - minified.code.length / input.length) * 100).toFixed(1);
        console.log(`✅ Obfuscated & minified js/${file} (${savings > 0 ? savings + '% smaller' : 'obfuscated'})`);
    }

    // 5. Minify HTML + inject anti-DevTools script
    const htmlInput = fs.readFileSync('./index.html', 'utf-8');

    // Inject anti-devtools script before closing </body>
    const htmlWithProtection = htmlInput.replace('</body>', ANTI_DEVTOOLS_SCRIPT + '</body>');

    const htmlOutput = await minifyHTML(htmlWithProtection, {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        minifyCSS: true,
        minifyJS: true,
        removeAttributeQuotes: false
    });

    fs.writeFileSync(path.join(DIST, 'index.html'), htmlOutput);
    const htmlSavings = ((1 - htmlOutput.length / htmlInput.length) * 100).toFixed(1);
    console.log(`✅ Minified index.html (${htmlSavings}% smaller)`);
    console.log('✅ Injected anti-DevTools protection');

    // 6. Summary
    console.log('\n🎉 Build complete! Production files are in dist/');
    console.log('   Deploy the dist/ folder to your hosting provider.');
    console.log('\n📁 Your original source code is UNTOUCHED.');
}

build().catch(err => {
    console.error('❌ Build failed:', err);
    process.exit(1);
});
