'use client'

import { useState } from 'react'
import { addBusinessDays, format } from 'date-fns'
import { Briefcase, ChevronDown, ChevronUp } from 'lucide-react'

interface WorkingDaysSectionProps {
  days: number
}

export default function WorkingDaysSection({ days }: WorkingDaysSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const today = new Date()
  const workingDate = addBusinessDays(today, days)
  const dayOfWeek = format(workingDate, 'EEEE')
  const formattedDate = format(workingDate, 'MMMM dd, yyyy')
  
  // 计算实际的日历天数
  const calendarDays = Math.ceil(days * 7 / 5) // 粗略估算，实际需要更复杂的计算
  
  const handleToggle = () => {
    setIsExpanded(!isExpanded)
    
    // 如果展开，平滑滚动到这个section
    if (!isExpanded) {
      setTimeout(() => {
        document.getElementById('working-days-section')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }, 100)
    }
  }

  return (
    <div id="working-days-section" className="mb-12">
      {/* 可点击的标题栏 */}
      <div 
        onClick={handleToggle}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 cursor-pointer hover:shadow-2xl transition-all duration-300"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Briefcase className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {days} working days from today
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">Quick Answer:</div>
              <div className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                {formattedDate}
              </div>
            </div>
            {isExpanded ? (
              <ChevronUp className="w-6 h-6 text-gray-400" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {/* 展开的详细内容 */}
      {isExpanded && (
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all duration-300 animate-in slide-in-from-top-4">
          <div className="space-y-6">
            {/* 工作日说明 */}
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                If you want to include only business/working days, and exclude weekends, adding{' '}
                <strong>{days} working days</strong> to today's date takes you to a future date of{' '}
                <strong>{dayOfWeek}, {formattedDate}</strong>. This is approximately{' '}
                <strong>{calendarDays} full calendar days</strong> from today.
              </p>
            </div>

            {/* 工作日结果展示 */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-100 dark:bg-orange-900/40 p-4 rounded-xl">
                  <Briefcase className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <div className="text-lg font-medium text-orange-600 dark:text-orange-400 mb-1">
                    {days} working days:
                  </div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {dayOfWeek}, {formattedDate}
                  </div>
                </div>
              </div>
            </div>

            {/* 说明信息 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                  What are Working Days?
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  Working days (business days) typically exclude weekends (Saturday and Sunday) 
                  and may exclude public holidays depending on your location.
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                  Need More Precision?
                </h4>
                <p className="text-sm text-green-700 dark:text-green-400">
                  For calculations that include specific holidays or different working week patterns, 
                  consider your local business calendar.
                </p>
              </div>
            </div>

            {/* 工具提示 */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                💡 Tip: Use our{' '}
                <a href="#calculator" className="text-blue-600 dark:text-blue-400 hover:underline">
                  calculator above
                </a>{' '}
                to include or exclude weekends for any date calculation.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 