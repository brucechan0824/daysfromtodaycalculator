import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/_next/static/',  // 屏蔽Next.js静态资源
          '/_next/',         // 屏蔽所有Next.js内部路径
          '/api/',           // 屏蔽API路由（如果有的话）
          '*.woff',          // 屏蔽字体文件
          '*.woff2',         // 屏蔽字体文件
          '*.ttf',           // 屏蔽字体文件
          '*.eot',           // 屏蔽字体文件
          '*.map',           // 屏蔽source map文件
        ],
      },
    ],
    sitemap: 'https://daysfromtoday.tools/sitemap.xml',
  }
} 