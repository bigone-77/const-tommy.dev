/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://const-tommy.dev',
  generateRobotsTxt: true,
  // 💡 동적 사이트맵(server-sitemap)을 포함하기 위해 인덱스 설정을 true로 권장합니다.
  generateIndexSitemap: true,
  sourceDir: '.next',

  // 💡 레이아웃에서 headers() 사용으로 인해 누락되는 주요 페이지들을 수동으로 추가합니다.
  additionalPaths: async (config) => {
    const result = [];
    const mainPaths = ['/', '/about-me', '/blog', '/project', '/til'];

    for (const path of mainPaths) {
      result.push(await config.transform(config, path));
    }
    return result;
  },

  // 검색 엔진에 노출되지 않아야 할 경로들입니다.
  exclude: [
    '/api/auth/signin',
    '/blog/write',
    '/blog/edit',
    '/til/write',
    '/til/edit',
    '/server-sitemap.xml',
  ],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/auth/signin',
          '/blog/write',
          '/blog/edit',
          '/til/write',
          '/til/edit',
        ],
      },
    ],
    // 💡 아래에서 만들 동적 사이트맵 주소를 검색 로봇에게 알려줍니다.
    additionalSitemaps: ['https://const-tommy.dev/server-sitemap.xml'],
  },
};

export default config;
