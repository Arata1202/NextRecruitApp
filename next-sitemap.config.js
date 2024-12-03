module.exports = {
  siteUrl: 'https://rikuvision.realunivlog.com/',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/service/*', '/service'],
  additionalPaths: async (config) => [
    {
      loc: '/service/auth/signup',
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/service/auth/login',
      lastmod: new Date().toISOString(),
    },
  ],
};
