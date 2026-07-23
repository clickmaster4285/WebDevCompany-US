const fs = require('fs');

// ── Helper: extract simple string field from a block of text ──────────────
function extractField(block, fieldName) {
  const escaped = fieldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`${escaped}:\\s*['"]([\\s\\S]*?)['"]`, '');
  const m = re.exec(block);
  if (!m) return '';
  let val = m[1].trim();
  if (val.endsWith(',')) val = val.slice(0, -1).trim();
  return val;
}

// ── Helper: extract numeric field ─────────────────────────────────────────
function extractNum(block, fieldName) {
  const escaped = fieldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`${escaped}:\\s*(\\d+)`);
  const m = re.exec(block);
  return m ? parseInt(m[1], 10) : undefined;
}

// ── Helper: find the real opening bracket of an array (skip type annotations) ──
// Looks for = [ pattern (the assignment bracket, not type annotation brackets)
function findArrayBracket(content, startIdx) {
  const eqBracket = content.indexOf('= [', startIdx);
  if (eqBracket >= 0) return eqBracket + 2;
  // Fallback: find the last [ after startIdx (simple heuristic)
  let lastBracket = -1;
  let idx = startIdx;
  while (true) {
    const b = content.indexOf('[', idx);
    if (b === -1) break;
    lastBracket = b;
    idx = b + 1;
  }
  // The last [ in a type annotation like `: Foo[]` would be followed by `] = [`
  // So find one followed by `] =`
  idx = startIdx;
  while (true) {
    const b = content.indexOf('[', idx);
    if (b === -1) break;
    if (content.substring(b - 3, b + 5).includes('= [')) {
      return b;
    }
    idx = b + 1;
  }
  return -1;
}

// ── Helper: find matching closing bracket with bracket tracking ───────────
// Only counts the bracket type we're looking for (square for arrays, curly for objects)
function findMatchingBracket(content, startIdx, openChar, closeChar) {
  let depth = 1;
  let i = startIdx + 1;
  while (i < content.length && depth > 0) {
    if (content[i] === openChar) depth++;
    if (content[i] === closeChar) depth--;
    i++;
  }
  return i - 1; // position of matching close bracket
}

// ── Helper: find all top-level objects via bracket-matching ────────────────
// NOTE: This tracks ONLY curly braces, making it suitable for finding
// top-level objects within an array's content
function findTopLevelObjects(content) {
  const objects = [];
  let i = 0;
  while (i < content.length) {
    const start = content.indexOf('{', i);
    if (start === -1) break;

    let depth = 1;
    let j = start + 1;
    while (j < content.length && depth > 0) {
      if (content[j] === '{') depth++;
      if (content[j] === '}') depth--;
      j++;
    }

    const objStr = content.slice(start + 1, j - 1);
    objects.push(objStr);
    i = j;
  }
  return objects;
}

// ── Helper: get top-level fields only (before first nested object) ────────
function getSimpleFields(objStr) {
  let inString = false;
  let stringChar = null;
  for (let k = 0; k < objStr.length; k++) {
    const ch = objStr[k];
    if (inString) {
      if (ch === '\\') { k++; continue; }
      if (ch === stringChar) inString = false;
      continue;
    }
    if (ch === '"' || ch === "'") { inString = true; stringChar = ch; continue; }
    if (ch === '{') return objStr.slice(0, k);
  }
  return objStr;
}

// ───────────────────────────────────────────────────────────────────────────
// SERVICES
// ───────────────────────────────────────────────────────────────────────────
const sContent = fs.readFileSync('data/services.ts', 'utf8');
const services = [];

const sdStart = sContent.indexOf('export const serviceData');
let sdOpenBrace = -1;
if (sdStart >= 0) {
  sdOpenBrace = sContent.indexOf('{', sdStart);
}

if (sdOpenBrace > 0) {
  const sdClose = findMatchingBracket(sContent, sdOpenBrace, '{', '}');
  const sdBlock = sContent.slice(sdOpenBrace + 1, sdClose);

  const keyRe = /'([^']+)'\s*:\s*\{/g;
  let m;
  while ((m = keyRe.exec(sdBlock)) !== null) {
    const key = m[1];
    const valStart = m.index + m[0].length - 1;
    const valEnd = findMatchingBracket(sdBlock, valStart, '{', '}');
    const valBlock = sdBlock.slice(valStart + 1, valEnd);
    const title = extractField(valBlock, 'title');
    if (key && title) services.push({ slug: key, title });
  }
}

// ───────────────────────────────────────────────────────────────────────────
// INDUSTRIES
// ───────────────────────────────────────────────────────────────────────────
const iContent = fs.readFileSync('data/industries.ts', 'utf8');
const industries = [];

const indStart = iContent.indexOf('export const industriesData');
let indOpenBrace = -1;
if (indStart >= 0) {
  indOpenBrace = iContent.indexOf('{', indStart);
}

if (indOpenBrace > 0) {
  const indClose = findMatchingBracket(iContent, indOpenBrace, '{', '}');
  const indBlock = iContent.slice(indOpenBrace + 1, indClose);

  const keyRe = /'([^']+)'\s*:\s*\{/g;
  let m;
  while ((m = keyRe.exec(indBlock)) !== null) {
    const key = m[1];
    const valStart = m.index + m[0].length - 1;
    const valEnd = findMatchingBracket(indBlock, valStart, '{', '}');
    const valBlock = indBlock.slice(valStart + 1, valEnd);
    const title = extractField(valBlock, 'title');
    if (key && title) industries.push({ slug: key, title });
  }
}

// ───────────────────────────────────────────────────────────────────────────
// TECHNOLOGIES
// ───────────────────────────────────────────────────────────────────────────
const tContent = fs.readFileSync('data/technologies.ts', 'utf8');
const technologies = [];

const techStart = tContent.indexOf('export const technologies');
let techOpenBracket = findArrayBracket(tContent, techStart);

if (techOpenBracket > 0) {
  const techClose = findMatchingBracket(tContent, techOpenBracket, '[', ']');
  const techArray = tContent.slice(techOpenBracket + 1, techClose);
  const objects = findTopLevelObjects(techArray);

  for (const obj of objects) {
    const simplePart = getSimpleFields(obj);
    const id = extractNum(simplePart, 'id');
    const parentIdMatch = simplePart.match(/parentId:\s*(\d+|null)/);
    const parentId = parentIdMatch ? (parentIdMatch[1] === 'null' ? null : parseInt(parentIdMatch[1], 10)) : null;
    const title = extractField(simplePart, 'title');
    const slug = extractField(simplePart, 'slug');
    const excerpt = extractField(simplePart, 'excerpt');
    const category = extractField(simplePart, 'category');
    const icon = extractField(simplePart, 'icon');
    if (id && title) technologies.push({ id, parentId, title, slug, excerpt, category, icon });
  }
}

// ───────────────────────────────────────────────────────────────────────────
// CASE STUDIES (first 2)
// ───────────────────────────────────────────────────────────────────────────
const csContent = fs.readFileSync('data/case-studies.ts', 'utf8');
const caseStudies = [];

const csStart = csContent.indexOf('export const caseStudies');
let csOpenBracket = findArrayBracket(csContent, csStart);

if (csOpenBracket > 0) {
  const csClose = findMatchingBracket(csContent, csOpenBracket, '[', ']');
  const csArray = csContent.slice(csOpenBracket + 1, csClose);
  const csObjects = findTopLevelObjects(csArray);

  for (const obj of csObjects.slice(0, 2)) {
    const simplePart = getSimpleFields(obj);
    caseStudies.push({
      title: extractField(simplePart, 'title'),
      slug: extractField(simplePart, 'slug'),
      category: extractField(simplePart, 'category'),
      icon: extractField(simplePart, 'icon'),
      description: extractField(simplePart, 'description'),
    });
  }
}

// ───────────────────────────────────────────────────────────────────────────
// BLOGS (first 2)
// ───────────────────────────────────────────────────────────────────────────
const bContent = fs.readFileSync('data/blogs.ts', 'utf8');
const blogs = [];

const blogStart = bContent.indexOf('export const blogs');
let blogOpenBracket = findArrayBracket(bContent, blogStart);

if (blogOpenBracket > 0) {
  const blogClose = findMatchingBracket(bContent, blogOpenBracket, '[', ']');
  const blogArray = bContent.slice(blogOpenBracket + 1, blogClose);
  const blogObjects = findTopLevelObjects(blogArray);

  for (const obj of blogObjects.slice(0, 2)) {
    const simplePart = getSimpleFields(obj);
    blogs.push({
      title: extractField(simplePart, 'title'),
      slug: extractField(simplePart, 'slug'),
      category: extractField(simplePart, 'category'),
      excerpt: extractField(simplePart, 'excerpt'),
    });
  }
}

// ───────────────────────────────────────────────────────────────────────────
// FAQS (first 2)
// ───────────────────────────────────────────────────────────────────────────
const fContent = fs.readFileSync('data/faq-pages.ts', 'utf8');
const faqs = [];

const faqStart = fContent.indexOf('export const faqPages');
let faqOpenBracket = findArrayBracket(fContent, faqStart);

if (faqOpenBracket > 0) {
  const faqClose = findMatchingBracket(fContent, faqOpenBracket, '[', ']');
  const faqArray = fContent.slice(faqOpenBracket + 1, faqClose);
  const faqObjects = findTopLevelObjects(faqArray);

  for (const obj of faqObjects.slice(0, 2)) {
    const slug = extractField(obj, 'slug');
    const pageMatch = obj.match(/page:\s*\{([\s\S]*?)\s*\}/);
    let title = '';
    if (pageMatch) title = extractField(pageMatch[1], 'title');
    const atfMatch = obj.match(/aboveTheFold:\s*\{([\s\S]*?)\s*\}/);
    let directAnswer = '';
    if (atfMatch) directAnswer = extractField(atfMatch[1], 'directAnswer');
    faqs.push({ slug, title, directAnswer });
  }
}

// ───────────────────────────────────────────────────────────────────────────
// TESTIMONIALS (first 2)
// ───────────────────────────────────────────────────────────────────────────
const testContent = fs.readFileSync('data/testimonials.ts', 'utf8');
const testimonials = [];

const testStart = testContent.indexOf('export const testimonials');
let testOpenBracket = findArrayBracket(testContent, testStart);

if (testOpenBracket > 0) {
  const testClose = findMatchingBracket(testContent, testOpenBracket, '[', ']');
  const testArray = testContent.slice(testOpenBracket + 1, testClose);
  const testObjects = findTopLevelObjects(testArray);

  for (const obj of testObjects.slice(0, 2)) {
    const simplePart = getSimpleFields(obj);
    testimonials.push({
      name: extractField(simplePart, 'name'),
      industry: extractField(simplePart, 'industry'),
      description: extractField(simplePart, 'description'),
    });
  }
}

// ───────────────────────────────────────────────────────────────────────────
// WRITE OUTPUT
// ───────────────────────────────────────────────────────────────────────────
const result = { services, industries, caseStudies, blogs, faqs, technologies, testimonials };

fs.writeFileSync('data/nav-data.json', JSON.stringify(result, null, 2));
console.log(`✅ nav-data.json generated:`);
console.log(`   Services: ${services.length}`);
console.log(`   Industries: ${industries.length}`);
console.log(`   Case Studies: ${caseStudies.length}`);
console.log(`   Blogs: ${blogs.length}`);
console.log(`   FAQs: ${faqs.length}`);
console.log(`   Technologies: ${technologies.length}`);
console.log(`   Testimonials: ${testimonials.length}`);
if (technologies.length > 0) console.log('   First tech:', technologies[0].id, technologies[0].slug, technologies[0].title);
if (testimonials.length > 0) console.log('   First testimonial:', testimonials[0].name);
