const fs = require("fs");
const path = require("path");

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".next" || name === "public") continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, acc);
    else if (/\.(tsx?|jsx?|json)$/.test(name)) acc.push(full);
  }
  return acc;
}

const known = new Set([
  "/",
  "/about",
  "/contact",
  "/services",
  "/industries",
  "/locations",
  "/faqs",
  "/blogs",
  "/technologies",
  "/compare",
  "/case-studies",
  "/costs",
  "/testimonials",
]);

function collect(file, regex, prefix) {
  regex.lastIndex = 0;
  if (!fs.existsSync(file)) return;
  const text = fs.readFileSync(file, "utf8");
  let match;
  while ((match = regex.exec(text))) {
    const value = match[1].replace(/\/$/, "");
    known.add(prefix ? `${prefix}${value}` : value.startsWith("/") ? value : `/${value}`);
    known.add(value);
  }
}

const slugRe = /["']?slug["']?\s*:\s*['"]([a-z0-9-]+)['"]/g;
collect("data/services.ts", slugRe, "/");
collect("data/industries.ts", slugRe, "/industries/");
collect("data/locationdata.ts", slugRe, "/locations/");
collect("data/technologies.ts", slugRe, "/technologies/");
collect("data/blogs.ts", slugRe, "/blogs/");
collect("data/faq-pages.ts", slugRe, "/faqs/");
collect("data/costdata.ts", slugRe, "/costs/");
collect("data/comparisons.ts", slugRe, "/compare/");
collect("data/case-studies.ts", slugRe, "/case-studies/");
collect("data/tech-serv-industry.ts", /['"]([a-z0-9-]+\/[a-z0-9-]+)['"]\s*:/g, "/");

const files = walk(".");
const found = new Map();
const re = /["'`](\/[a-z0-9][a-z0-9\-/]*)\/?["'`]/gi;
for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  let match;
  while ((match = re.exec(text))) {
    const url = match[1].replace(/\/$/, "") || "/";
    if (
      url.startsWith("/_") ||
      url.startsWith("/assets") ||
      url.startsWith("/logos") ||
      url.startsWith("/hero") ||
      url.startsWith("/image") ||
      url.includes(".")
    ) {
      continue;
    }
    if (!found.has(url)) found.set(url, new Set());
    found.get(url).add(file.replace(/\\/g, "/"));
  }
}

const bad = [];
for (const [url, sources] of found) {
  if (known.has(url)) continue;
  const parts = url.split("/").filter(Boolean);
  if (parts.length === 2 && known.has(`/${parts.join("/")}`)) continue;
  bad.push(`${url}  <=  ${[...sources].slice(0, 3).join(", ")}`);
}

console.log(bad.sort().join("\n"));
console.log(`BAD ${bad.length}`);
