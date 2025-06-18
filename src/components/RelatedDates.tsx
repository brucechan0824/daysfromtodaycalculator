'use client'

import { ArrowRight, TrendingUp, Calendar } from 'lucide-react'
import React from 'react'

interface DateLink {
  value: number
  label: string
  href: string
  category: string
  color: string
}

interface DateSection {
  title: string
  icon: React.ComponentType<{ className?: string }>
  items: DateLink[]
}

interface RelatedDatesProps {
  currentDays?: number
}

export default function RelatedDates({ currentDays = 14 }: RelatedDatesProps) {
  // 基于SEMrush数据的热门天数 - 与首页完全一致的分类逻辑
  const allDays = [
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

  // 分类标签 - 与首页完全一致
  const categoryLabels = {
    featured: { label: 'Short Term', icon: TrendingUp },
    medium: { label: 'Medium Term', icon: Calendar },
    long: { label: 'Long Term', icon: TrendingUp },
    extended: { label: 'Extended Planning', icon: TrendingUp }
  }

  // 颜色映射 - 与首页保持一致
  const colorMap = {
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

  // 按分类组织数据，排除当前页面
  const sections: DateSection[] = Object.entries(categoryLabels).map(([category, { label, icon }]) => {
    const categoryDays = allDays
      .filter(day => day.category === category && day.days !== currentDays)
      .map(day => ({
        value: day.days,
        label: day.label,
        href: `/${day.days}-days-from-today`,
        category: day.category,
        color: day.color
      }))
    
    return {
      title: label,
      icon: icon,
      items: categoryDays
    }
  }).filter(section => section.items.length > 0) // 只显示有内容的分类

  return (
    <div className="space-y-12 mb-6">
      {/* 总标题 - 参考Widgetly的设计 */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          More Days From Today Calculator
        </h2>
      </div>
      
      {sections.map((section, index) => (
        <div key={section.title}>
          <div>
            <div className="flex items-center mb-6">
              <section.icon className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {section.title}
              </h2>
              <div className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                {section.items.length} options
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {section.items.map((item) => {
                const colors = colorMap[item.color as keyof typeof colorMap]
                
                return (
                  <a
                    key={item.value}
                    href={item.href}
                    className={`
                      ${colors.bg} ${colors.border} ${colors.hover}
                      border rounded-xl p-4 transition-all duration-200 
                      hover:shadow-md hover:scale-105 group flex items-center justify-between min-h-[60px]
                    `}
                  >
                    {/* 左侧：数字 + Days */}
                    <div className={`text-lg font-semibold ${colors.text}`}>
                      {item.value} {item.value === 1 ? 'Day' : 'Days'}
                    </div>
                    
                    {/* 右侧：箭头 */}
                    <ArrowRight className={`w-5 h-5 ${colors.text} opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300`} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 