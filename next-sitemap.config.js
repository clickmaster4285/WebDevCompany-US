/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://clickmasterswebdevelopmentcompany.com/',
  generateRobotsTxt: false, // Keep using our custom public/robots.txt
  exclude: ['/admin*', '/api*', '/login*'],
  generateIndexSitemap: false, // Prevents creating multiple sitemaps (sitemap-0.xml, etc.) if not needed
}
