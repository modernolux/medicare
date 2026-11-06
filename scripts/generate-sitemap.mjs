import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { pages, SITE_URL, fullTitle, safeDescription, jsonLd } from './seo-pages.mjs';

const lastmod = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((page) => `  <url><loc>${SITE_URL}${page.path}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n')}\n</urlset>\n`;
await mkdir('dist', { recursive: true });
await writeFile('dist/sitemap.xml', xml);
const template = await readFile('dist/index.html', 'utf8');
for (const page of pages) {
  const canonical = `${SITE_URL}${page.path}`;
  const description = safeDescription(page.description);
  const head = `<title>${fullTitle(page.title)}</title><meta name="description" content="${description.replaceAll('"', '&quot;')}"><meta name="robots" content="index,follow"><link rel="canonical" href="${canonical}"><meta property="og:title" content="${fullTitle(page.title)}"><meta property="og:description" content="${description.replaceAll('"', '&quot;')}"><meta property="og:url" content="${canonical}"><meta property="og:type" content="website"><meta property="og:site_name" content="Medicare Qendër Diagnostike Durrës"><meta property="og:locale" content="sq_AL"><meta property="og:image" content="${SITE_URL}/Medicare_Diagnostic_Clinic_Entrance.png"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${SITE_URL}/Medicare_Diagnostic_Clinic_Entrance.png"><script type="application/ld+json">${JSON.stringify(jsonLd(page))}</script>`;
  const html = template.replace(/<title>[\s\S]*?<\/title>/, '').replace(/<meta name="description"[\s\S]*?>/, '').replace('</head>', `${head}</head>`);
  const directory = page.path === '/' ? 'dist' : `dist${page.path}`;
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}/index.html`, html);
}
console.log(`Generated ${pages.length} sitemap URLs and pre-rendered heads.`);
