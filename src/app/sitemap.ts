import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // 网站基础URL
  const baseUrl = 'https://daysfromtoday.tools'
  
  // 用户指定的完整天数列表 - 与generateStaticParams完全一致
  const strategicDays = [
    // 短期(1-10天) - 日常规划常用
    3, 5, 6, 7, 8, 9, 10,
    // 中短期(11-30天) - 项目规划和月度计划
    11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 24, 25, 27, 28, 29, 30,
    // 中期(31-60天) - 季度规划和中期目标
    31, 35, 40, 41, 42, 45, 50, 55, 56, 60,
    // 长期(61-120天) - 长期规划和年度目标
    63, 65, 70, 75, 80, 84, 90, 91, 100, 120,
    // 超长期(>120天) - 年度和多年规划
    150, 180, 200, 270
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