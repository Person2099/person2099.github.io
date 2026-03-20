const fs = require("fs");
const path = require("path");

const sitemapPath = path.join(__dirname, "..", "sitemap.xml");

if (!fs.existsSync(sitemapPath)) {
  console.error("sitemap.xml was not found at project root.");
  process.exit(1);
}

const now = new Date();
const today = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, "0"),
  String(now.getDate()).padStart(2, "0")
].join("-");
const sitemap = fs.readFileSync(sitemapPath, "utf8");
const lastmodPattern = /<lastmod>[^<]*<\/lastmod>/;

if (!lastmodPattern.test(sitemap)) {
  console.error("No <lastmod> tag found in sitemap.xml.");
  process.exit(1);
}

const updated = sitemap.replace(lastmodPattern, `<lastmod>${today}</lastmod>`);

fs.writeFileSync(sitemapPath, updated);
