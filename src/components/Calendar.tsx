'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CalendarProps {
  highlightDate?: Date
  onDateSelect?: (date: Date) => void
  showHighlight?: boolean
}

export default function Calendar({ highlightDate, onDateSelect, showHighlight = true }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // 设置当前日期为今天
  useEffect(() => {
    const today = new Date()
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1))
  }, [])

  // 获取月份信息
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()
  const startingDayOfWeek = firstDayOfMonth.getDay()

  // 月份名称
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  // 星期名称
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  // 生成日历天数数组
  const calendarDays = []
  
  // 添加空白天数（月初的空白）
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null)
  }
  
  // 添加当月天数
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  // 导航函数
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  // 检查是否为今天
  const isToday = (day: number) => {
    const today = new Date()
    return today.getFullYear() === year && 
           today.getMonth() === month && 
           today.getDate() === day
  }

  // 检查是否为高亮日期
  const isHighlightDate = (day: number) => {
    if (!highlightDate || !showHighlight) return false
    return highlightDate.getFullYear() === year && 
           highlightDate.getMonth() === month && 
           highlightDate.getDate() === day
  }

  // 检查是否为选中日期
  const isSelectedDate = (day: number) => {
    if (!selectedDate) return false
    return selectedDate.getFullYear() === year && 
           selectedDate.getMonth() === month && 
           selectedDate.getDate() === day
  }

  // 处理日期点击
  const handleDateClick = (day: number) => {
    const clickedDate = new Date(year, month, day)
    setSelectedDate(clickedDate)
    onDateSelect?.(clickedDate)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {monthNames[month]} {year}
        </h2>
        
        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Day Names Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((dayName) => (
          <div
            key={dayName}
            className="text-center text-sm font-medium text-gray-600 dark:text-gray-400 py-2"
          >
            {dayName}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          if (day === null) {
            return <div key={index} className="h-10" />
          }

          const isTodayDate = isToday(day)
          const isHighlight = isHighlightDate(day)
          const isSelected = isSelectedDate(day)

          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              className={`
                h-10 w-full rounded-lg text-sm font-medium transition-all duration-200
                hover:bg-gray-100 dark:hover:bg-gray-700
                ${isTodayDate 
                  ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 ring-2 ring-blue-200 dark:ring-blue-800' 
                  : ''
                }
                ${isHighlight && !isTodayDate
                  ? 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 ring-2 ring-green-200 dark:ring-green-800' 
                  : ''
                }
                ${isSelected && !isTodayDate && !isHighlight
                  ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400' 
                  : ''
                }
                ${!isTodayDate && !isHighlight && !isSelected
                  ? 'text-gray-700 dark:text-gray-300' 
                  : ''
                }
              `}
            >
              {day}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-100 dark:bg-blue-900/50 rounded border-2 border-blue-200 dark:border-blue-800"></div>
            <span className="text-gray-600 dark:text-gray-400">Today</span>
          </div>
          {showHighlight && highlightDate && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-100 dark:bg-green-900/50 rounded border-2 border-green-200 dark:border-green-800"></div>
              <span className="text-gray-600 dark:text-gray-400">Target Date</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-100 dark:bg-purple-900/50 rounded"></div>
            <span className="text-gray-600 dark:text-gray-400">Selected</span>
          </div>
        </div>
      </div>
    </div>
  )
} 