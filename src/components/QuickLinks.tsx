'use client'

import Link from 'next/link'
import { Calendar, TrendingUp, Clock, ArrowRight } from 'lucide-react'

export default function QuickLinks() {
  // 基于SEMrush数据的热门天数 - 按搜索量优化分类
  const popularDays = [
    // Short Term - 高搜索量短期关键词
    { days: 5, label: '5 Days', category: 'featured', color: 'green' },
    { days: 7, label: '1 Week', category: 'featured', color: 'green' },
    { days: 10, label: '10 Days', category: 'featured', color: 'green' },
    { days: 14, label: '2 Weeks', category: 'featured', color: 'green' },
    { days: 20, label: '20 Days', category: 'featured', color: 'green' },
    
    // Medium Term - 中期高搜索量关键词
    { days: 21, label: '3 Weeks', category: 'medium', color: 'orange' },
    { days: 25, label: '25 Days', category: 'medium', color: 'orange' },
    { days: 28, label: '4 Weeks', category: 'medium', color: 'orange' },
    { days: 30, label: '1 Month', category: 'medium', color: 'orange' },
    { days: 31, label: '31 Days', category: 'medium', color: 'orange' },
    { days: 35, label: '35 Days', category: 'medium', color: 'orange' },
    { days: 40, label: '40 Days', category: 'medium', color: 'orange' },
    { days: 42, label: '42 Days', category: 'medium', color: 'orange' },
    { days: 45, label: '45 Days', category: 'medium', color: 'orange' },
    { days: 50, label: '50 Days', category: 'medium', color: 'orange' },
    
    // Long Term - 长期高搜索量关键词
    { days: 56, label: '56 Days', category: 'long', color: 'purple' },
    { days: 60, label: '2 Months', category: 'long', color: 'purple' },
    { days: 70, label: '70 Days', category: 'long', color: 'purple' },
    { days: 75, label: '75 Days', category: 'long', color: 'purple' },
    { days: 90, label: '3 Months', category: 'long', color: 'purple' },
    { days: 100, label: '100 Days', category: 'long', color: 'purple' },
    { days: 120, label: '4 Months', category: 'long', color: 'purple' },
    
    // Extended Planning - 超长期规划
    { days: 150, label: '5 Months', category: 'extended', color: 'red' },
    { days: 180, label: '6 Months', category: 'extended', color: 'red' },
    { days: 365, label: '1 Year', category: 'extended', color: 'red' }
  ]

  // 颜色映射
  const colorMap = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-700 dark:text-blue-300',
      hover: 'hover:bg-blue-100 dark:hover:bg-blue-900/40'
    },
    green: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-700 dark:text-green-300',
      hover: 'hover:bg-green-100 dark:hover:bg-green-900/40'
    },
    orange: {
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      border: 'border-orange-200 dark:border-orange-800',
      text: 'text-orange-700 dark:text-orange-300',
      hover: 'hover:bg-orange-100 dark:hover:bg-orange-900/40'
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-200 dark:border-purple-800',
      text: 'text-purple-700 dark:text-purple-300',
      hover: 'hover:bg-purple-100 dark:hover:bg-purple-900/40'
    },
    red: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-700 dark:text-red-300',
      hover: 'hover:bg-red-100 dark:hover:bg-red-900/40'
    }
  }

  // 分类标签 - 更新featured为首屏显示
  const categoryLabels = {
    featured: { label: 'Short Term', icon: TrendingUp },
    medium: { label: 'Medium Term', icon: Calendar },
    long: { label: 'Long Term', icon: TrendingUp },
    extended: { label: 'Extended Planning', icon: TrendingUp }
  }

  return (
    <section className="mb-12">
      {/* 总标题 - 与子页面RelatedDates保持一致 */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Popular Days From Today
          </h2>
      </div>
      
      {/* 按分类显示 */}
      {Object.entries(categoryLabels).map(([category, { label, icon: Icon }]) => {
        const categoryDays = popularDays.filter(day => day.category === category)
        
        return (
          <div key={category} className="mb-8">
            <div className="flex items-center mb-4">
              <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                {label}
              </h3>
              <div className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                {categoryDays.length} options
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {categoryDays.map((item) => {
                const colors = colorMap[item.color as keyof typeof colorMap]
                
                return (
                  <Link
                    key={item.days}
                    href={`/${item.days}-days-from-today`}
                    className={`
                      ${colors.bg} ${colors.border} ${colors.hover}
                      border rounded-xl p-4 transition-all duration-200 
                      hover:shadow-md hover:scale-105 group flex items-center justify-between min-h-[60px]
                    `}
                  >
                    {/* 左侧：数字 + Days */}
                    <div className={`text-lg font-semibold ${colors.text}`}>
                      {item.days} {item.days === 1 ? 'Day' : 'Days'}
                  </div>
                    
                    {/* 右侧：箭头 */}
                    <ArrowRight className={`w-5 h-5 ${colors.text} opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300`} />
                  </Link>
                )
              })}
            </div>
          </div>
        )
      })}

      {/* 底部说明 */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mt-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Need a different calculation?
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Use our calculator above to find any number of days from today, 
            including business days and weekend calculations.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span>✓ Any custom date</span>
            <span>✓ Business days only</span>
            <span>✓ Multiple formats</span>
            <span>✓ Holiday detection</span>
          </div>
        </div>
    </div>
    </section>
  )
} 