const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://clickmasterswebdevelopmentcompany.com';
const DATA_DIR = path.join(__dirname, '..', 'data');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

/**
 * Extract array data from a JS data file.
 */
function extractData(filePath, arrayName) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf-8');

  let marker = `export const ${arrayName}`;
  let start = content.indexOf(marker);
  if (start === -1) {
    marker = `const ${arrayName}`;
    start = content.indexOf(marker);
  }
  if (start === -1) return [];

  const assignIndex = content.indexOf('=', start);
  const arrayStart = content.indexOf('[', assignIndex === -1 ? start : assignIndex);
  if (arrayStart === -1) return [];

  let depth = 0;
  let i = arrayStart;
  for (; i < content.length; i++) {
    if (content[i] === '[') depth++;
    else if (content[i] === ']') {
      depth--;
      if (depth === 0) break;
    }
  }

  const arrayStr = content.slice(arrayStart, i + 1);
  try {
    return JSON.parse(arrayStr);
  } catch {
    try {
      return new Function(`"use strict"; return (${arrayStr})`)();
    } catch (e) {
      console.error(`  ⚠ Could not parse ${filePath}: ${e.message}`);
      return [];
    }
  }
}

/**
 * Extract object data from a JS file.
 */
function extractObject(filePath, objectName) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, 'utf-8');

  let marker = `export const ${objectName}`;
  let start = content.indexOf(marker);
  if (start === -1) {
    marker = `const ${objectName}`;
    start = content.indexOf(marker);
  }
  if (start === -1) return {};

  const assignIndex = content.indexOf('=', start);
  const objectStart = content.indexOf('{', assignIndex === -1 ? start : assignIndex);
  if (objectStart === -1) return {};

  let depth = 0;
  let i = objectStart;
  for (; i < content.length; i++) {
    if (content[i] === '{') depth++;
    else if (content[i] === '}') {
      depth--;
      if (depth === 0) break;
    }
  }

  const objectStr = content.slice(objectStart, i + 1);
  const exportedObjects = extractExportedObjectBodies(filePath);
  const definitions = exportedObjects
    .map(([name, body]) => `const ${name} = ${body};`)
    .join('\n');

  try {
    return new Function(`"use strict"; ${definitions} return (${objectStr});`)();
  } catch (e) {
    console.error(`  ⚠ Could not parse object ${objectName} in ${filePath}: ${e.message}`);
    return {};
  }
}

/**
 * Extract all exported object literal bodies from a TS file, preserving raw source.
 * Used for data sources whose object record references other exported constants.
 */
function extractExportedObjectBodies(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf-8');
  const matches = [];
  const regex = /export const\s+([A-Za-z0-9_]+)\s*(?::\s*[^=]+)?=\s*\{/g;

  let match;
  while ((match = regex.exec(content)) !== null) {
    const name = match[1];
    const objectStart = content.indexOf('{', match.index);
    if (objectStart === -1) continue;

    let depth = 0;
    let i = objectStart;
    for (; i < content.length; i++) {
      if (content[i] === '{') depth++;
      else if (content[i] === '}') {
        depth--;
        if (depth === 0) break;
      }
    }

    const objectStr = content.slice(objectStart, i + 1);
    matches.push([name, objectStr]);
  }

  return matches;
}

/**
 * Helper to build XML templates for sitemaps.
 */
function generateSitemapXml(urls) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const url of urls) {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    if (url.lastmod) xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    if (url.changefreq) xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    if (url.priority) xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
  }
  xml += '</urlset>';
  return xml;
}

/**
 * Helper to build sitemap index XML template.
 */
function generateSitemapIndexXml(sitemapUrls) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const sitemapUrl of sitemapUrls) {
    xml += '  <sitemap>\n';
    xml += `    <loc>${sitemapUrl}</loc>\n`;
    xml += '  </sitemap>\n';
  }
  xml += '</sitemapindex>';
  return xml;
}

const CATEGORIES = [
  {
    key: 'case-studies',
    mainPath: '/case-studies',
    filePath: 'case-studies.ts',
    arrayName: 'caseStudies',
    routeBuilder: (entry) => `/${entry.slug}`,
  },
  {
    key: 'locations',
    mainPath: '/locations',
    filePath: 'locationdata.ts',
    objectName: 'locationData',
    routeBuilder: (entry) => `/${entry.slug}`,
  },
  {
    key: 'comparisons',
    mainPath: '/compare',
    filePath: 'comparisons.ts',
    arrayName: 'comparisons',
    routeBuilder: (entry) => `/${entry.slug}`,
  },
  {
    key: 'blogs',
    mainPath: '/blogs',
    filePath: 'blogs.ts',
    arrayName: 'blogs',
    routeBuilder: (entry) => `/${entry.slug}`,
  },
  {
    key: 'faqs',
    mainPath: '/faqs',
    filePath: 'faq-pages.ts',
    arrayName: 'faqPages',
    routeBuilder: (entry) => `/${entry.slug}`,
  },
  {
    key: 'industries',
    mainPath: '/industries',
    filePath: 'industries.ts',
    objectName: 'industriesData',
    routeBuilder: (entry) => `/${entry.slug}`,
  },
  {
    key: 'technologies',
    mainPath: '/technologies',
    filePath: 'technologies.ts',
    arrayName: 'technologies',
    routeBuilder: (entry) => `/${entry.slug}`,
  },
  {
    key: 'serv-tech-industry',
    mainPath: '',
    filePath: 'tech-serv-industry.ts',
    objectName: 'pages',
    routeBuilder: (entry) => `/${entry.slug}`,
  },
  {
    key: 'costs',
    mainPath: '/costs',
    filePath: 'costdata.ts',
    objectName: 'costData',
    routeBuilder: (entry) => `/${entry.slug}`,
  },
];

const STATIC_PAGES = [
  { loc: `${BASE_URL}/`, changefreq: 'daily', priority: 1.0 },
  { loc: `${BASE_URL}/about`, changefreq: 'monthly', priority: 0.6 },
  { loc: `${BASE_URL}/contact`, changefreq: 'monthly', priority: 0.6 },
  { loc: `${BASE_URL}/testimonials`, changefreq: 'weekly', priority: 0.7 },
];

function run() {
  console.log('🤖 Starting programmatic sitemap splitting by category...');

  // Clean up any old sitemap files first to prevent obsolete sitemaps
  if (fs.existsSync(PUBLIC_DIR)) {
    const files = fs.readdirSync(PUBLIC_DIR);
    for (const file of files) {
      if (file.startsWith('sitemap-') && file.endsWith('.xml')) {
        try {
          fs.unlinkSync(path.join(PUBLIC_DIR, file));
        } catch (e) {
          // ignore
        }
      }
    }
  }

  const activeSitemaps = [];

  // 1. Generate Static/Main Sitemap (1st Position)
  const mainUrls = STATIC_PAGES.map(p => ({
    loc: p.loc,
    changefreq: p.changefreq,
    priority: p.priority,
    lastmod: new Date().toISOString()
  }));
  const mainFilename = 'sitemap-main.xml';
  fs.writeFileSync(path.join(PUBLIC_DIR, mainFilename), generateSitemapXml(mainUrls));
  activeSitemaps.push(`${BASE_URL}/${mainFilename}`);
  console.log(`✅ Generated ${mainFilename} with ${mainUrls.length} static urls.`);

  // 2. Generate Services Sitemap (2nd Position)
  const serviceUrls = [];

  // Use the current route-backed service data source
  const servicesPath = path.join(DATA_DIR, 'services.ts');
  if (fs.existsSync(servicesPath)) {
    const servicesData = extractObject(servicesPath, 'serviceData');
    const serviceEntries = Object.values(servicesData || {}).filter(Boolean);

    for (const service of serviceEntries) {
      if (!service?.slug) continue;
      serviceUrls.push({
        loc: `${BASE_URL}/${service.slug}`,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString()
      });
    }
  }

  if (serviceUrls.length > 0) {
    const servicesFilename = 'sitemap-services.xml';
    fs.writeFileSync(path.join(PUBLIC_DIR, servicesFilename), generateSitemapXml(serviceUrls));
    activeSitemaps.push(`${BASE_URL}/${servicesFilename}`);
    console.log(`✅ Generated ${servicesFilename} with ${serviceUrls.length} service urls.`);
  }

  // 3. Generate Category Sitemaps (Other categories follow)
  for (const cat of CATEGORIES) {
    const filePath = path.join(DATA_DIR, cat.filePath);
    if (!fs.existsSync(filePath)) {
      console.warn(`  ⚠ Skipping: data/${cat.filePath} not found`);
      continue;
    }

    let data;
    if (cat.key === 'locations') {
      const exportedObjects = extractExportedObjectBodies(filePath);
      const locationObjSource = exportedObjects
        .filter(([name]) => name.endsWith('Location'))
        .map(([name, body]) => `const ${name} = ${body};`)
        .join('\n');

      const locationData = new Function(`"use strict"; ${locationObjSource}; return { ${exportedObjects
        .filter(([name]) => name.endsWith('Location'))
        .map(([name]) => `${name}`)
        .join(', ')} };`)();

      data = Object.values(locationData || {}).filter(Boolean);
    } else {
      const rawData = cat.arrayName
        ? extractData(filePath, cat.arrayName)
        : extractObject(filePath, cat.objectName);

      data = Array.isArray(rawData)
        ? rawData
        : Object.values(rawData || {}).filter(Boolean);
    }

    if (!data || data.length === 0) {
      console.warn(`  ⚠ Skipping: data/${cat.filePath} had no data or could not be parsed`);
      continue;
    }

    const urls = [];

    // Add the main listing route when the category has an explicit listing path
    if (cat.mainPath) {
      urls.push({
        loc: `${BASE_URL}${cat.mainPath}`,
        changefreq: 'daily',
        priority: 0.8,
        lastmod: new Date().toISOString()
      });
    }

    // Add all sub-pages
    for (const entry of data) {
      try {
        const subPath = cat.routeBuilder(entry);
        const subUrl = `${BASE_URL}${cat.mainPath}${subPath}`;
        urls.push({
          loc: subUrl,
          changefreq: 'weekly',
          priority: 0.6,
          lastmod: new Date().toISOString()
        });
      } catch (e) {
        // Skip entry if fields are missing
      }
    }

    const catFilename = `sitemap-${cat.key}.xml`;
    fs.writeFileSync(path.join(PUBLIC_DIR, catFilename), generateSitemapXml(urls));
    activeSitemaps.push(`${BASE_URL}/${catFilename}`);
    console.log(`✅ Generated ${catFilename} with ${urls.length} urls.`);
  }

  // 4. Generate Sitemap Index (sitemap.xml)
  const indexXml = generateSitemapIndexXml(activeSitemaps);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), indexXml);
  console.log(`✅ Generated main sitemap index: sitemap.xml listing ${activeSitemaps.length} categories.`);
}

run();
