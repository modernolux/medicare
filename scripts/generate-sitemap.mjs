import { mkdir, writeFile } from 'node:fs/promises';

const SITE_URL = process.env.VITE_SITE_URL || 'https://medicaredurres.al';
const lastmod = new Date().toISOString().slice(0, 10);
const doctorSlugs = ['indrit-kellici','ornela-kalaja','edlira-ndreu','edi-vafeklliu','sotir-xhunga','arlind-maliqati','erenato-bushi','taulant-bita','megi-legbello','ira-xhemollari','arjeta-cyrbja','elona-kodra','shkelqim-ferko','gent-kavaja','besmir-muca','selami-balla','isid-xhura','endri-shehu','dorina-qerimi','silvana-kau','malbora-jani','ermira-demiraj','elton-ceka','armando-mersini','blerim-bucpapaj','ivirt-shkreli'];
const serviceSlugs = ['tomografi-kompjuterizuar','radiografi-digitale','ekografi','elektrofiziologji','endoskopi','sherbime-infermierore','vizita-ne-shtepi','laborator','transport-me-ambulance','paisje-ortopedike'];
const specialtySlugs = ['neurologji','pneumologji','kardiologji','reumatologji','ortopedi','gastrohepatologji','urologji','gjinekologji','endokrinologji','hematologji','orl','alergologji','pediatri','dermatologji'];
const paths = ['/', '/rreth-nesh', '/mjeket-tane', '/sherbimet', '/kontakti', '/rregullat-dhe-kushtet', '/politikat-e-privatesise', ...doctorSlugs.map((slug) => `/mjeket-tane/${slug}`), ...serviceSlugs.map((slug) => `/sherbimet/${slug}`), ...specialtySlugs.map((slug) => `/sherbimet/konsulta/${slug}`)];
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((path) => `  <url><loc>${SITE_URL}${path}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n')}\n</urlset>\n`;
await mkdir('dist', { recursive: true });
await writeFile('dist/sitemap.xml', xml);
console.log(`Generated ${paths.length} sitemap URLs.`);
