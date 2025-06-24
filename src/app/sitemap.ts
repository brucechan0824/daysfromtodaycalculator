import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // 网站基础URL
  const baseUrl = 'https://daysfromtoday.tools'
  
  // 基于SEMrush数据的高搜索量关键词 - 优先级排序
  const strategicDays = [
    // 超高搜索量 (>100K)
    30, 90, 60, 45, 
    // 高搜索量 (50K-100K)  
    28, 14,
    // 中高搜索量 (20K-50K)
    180, 21, 120, 75, 10,
    // 中搜索量 (10K-20K)
    7, 35, 100, 20, 40, 50,
    // 有价值搜索量 (>9.9K)
    5, 25, 31, 42, 56, 70, 150,
    // 其他重要天数
    365,
    // 其他有搜索量的天数
    1, 2, 3, 15, 18, 24, 27, 36, 48, 55, 63, 72, 81, 95, 105, 110, 125, 135, 160, 200, 250, 300
  ]
  
  // 去重并排序
  const uniqueDays = [...new Set(strategicDays)].sort((a, b) => a - b)
  
  // 生成动态页面的sitemap条目
  const dynamicPages = uniqueDays.map(days => ({
    url: `${baseUrl}/${days}-days-from-today`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: days <= 30 ? 0.9 : days <= 90 ? 0.8 : 0.7,
  }))

  return [
    // 首页
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    // 日历页面
    {
      url: `${baseUrl}/calendar`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // 动态生成的页面
    ...dynamicPages,
  ]
} 