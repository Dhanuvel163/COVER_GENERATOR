import fs from 'fs';
import path from 'path';
import { SitemapStream, streamToPromise } from 'sitemap';
import { fileURLToPath } from 'url';

const BASE_URL = 'https://coverai.dhanavel.com/';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/profile', changefreq: 'monthly', priority: 0.7 },
  { url: '/generator', changefreq: 'monthly', priority: 0.7 },
  { url: '/privacy-policy', changefreq: 'monthly', priority: 0.7 },
  { url: '/contact-us', changefreq: 'monthly', priority: 0.7 }
];

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: BASE_URL });
  const writeStream = fs.createWriteStream(path.join(__dirname, '../public/sitemap.xml'));
  sitemap.pipe(writeStream);

  links.forEach(link => sitemap.write(link));
  sitemap.end();

  await streamToPromise(sitemap);
  console.log('Sitemap generated at public/sitemap.xml');
}

generateSitemap().catch(console.error);