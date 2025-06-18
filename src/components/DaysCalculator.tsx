'use client'

import { useState } from 'react'
import { addDays, format, addBusinessDays } from 'date-fns'
import { Calendar, Copy, Check, Clock } from 'lucide-react'

// 主要节日数据
const holidays = [
  { date: '12-25', name: 'Christmas Day', emoji: '🎄' },
  { date: '01-01', name: 'New Year\'s Day', emoji: '🎊' },
  { date: '02-14', name: 'Valentine\'s Day', emoji: '💝' },
  { date: '07-04', name: 'Independence Day', emoji: '🇺🇸' },
  { date: '10-31', name: 'Halloween', emoji: '🎃' },
  { date: '11-28', name: 'Thanksgiving', emoji: '🦃' },
]

// 日期格式选项
const dateFormats = {
  us: { label: 'US Format', format: 'MMMM dd, yyyy' },
  eu: { label: 'EU Format', format: 'dd/MM/yyyy' },
  iso: { label: 'ISO Format', format: 'yyyy-MM-dd' }
}

interface DaysCalculatorProps {
  initialDays?: number
}

export default function DaysCalculator({ initialDays = 14 }: DaysCalculatorProps) {
  const [days, setDays] = useState(initialDays)
  const [timeUnit, setTimeUnit] = useState<'days' | 'weeks' | 'quarters' | 'years'>('days')
  const [isBusinessDays, setIsBusinessDays] = useState(false)
  const [dateFormat, setDateFormat] = useState<keyof typeof dateFormats>('us')
  const [copied, setCopied] = useState(false)

  const today = new Date()
  
  // 计算目标日期，根据时间单位
  const calculateTargetDate = () => {
    let daysToAdd = days
    
    switch (timeUnit) {
      case 'weeks':
        daysToAdd = days * 7
        break
      case 'quarters':
        daysToAdd = days * 90 // 约3个月
        break
      case 'years':
        daysToAdd = days * 365
        break
      default:
        daysToAdd = days
    }
    
    return isBusinessDays ? addBusinessDays(today, daysToAdd) : addDays(today, daysToAdd)
  }
  
  const targetDate = calculateTargetDate()
  
  // 检查目标日期附近的节日
  const getHolidayInfo = (date: Date) => {
    const monthDay = format(date, 'MM-dd')
    const holiday = holidays.find(h => h.date === monthDay)
    
    if (holiday) {
      return { ...holiday, daysUntil: 0 }
    }
    
    // 检查前后3天内的节日
    for (let i = 1; i <= 3; i++) {
      const beforeDate = addDays(date, -i)
      const afterDate = addDays(date, i)
      
      const beforeHoliday = holidays.find(h => h.date === format(beforeDate, 'MM-dd'))
      const afterHoliday = holidays.find(h => h.date === format(afterDate, 'MM-dd'))
      
      if (beforeHoliday) return { ...beforeHoliday, daysUntil: -i }
      if (afterHoliday) return { ...afterHoliday, daysUntil: i }
    }
    
    return null
  }

  // const holidayInfo = getHolidayInfo(targetDate) // 未使用，注释掉

  // 复制功能
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // 跳转到专门页面
  const handleGoToPage = () => {
    const unitSuffix = timeUnit === 'days' ? 'days' : 
                       timeUnit === 'weeks' ? (days === 1 ? 'week' : 'weeks') :
                       timeUnit === 'quarters' ? (days === 1 ? 'quarter' : 'quarters') :
                       (days === 1 ? 'year' : 'years')
    
    let url = `/${days}-${unitSuffix}-from-today`
    
    // 如果勾选了business only，添加URL参数以便自动滚动到工作日部分
    if (isBusinessDays) {
      url += '?scrollTo=working-days'
    }
    
    window.location.href = url
  }

  // 生成相对日期表格数据
  const getRelativeDates = () => {
    const dates = []
    for (let i = -2; i <= 2; i++) {
      const relativeDays = days + i
      if (relativeDays > 0) {
        const date = isBusinessDays ? addBusinessDays(today, relativeDays) : addDays(today, relativeDays)
        dates.push({
          days: relativeDays,
          date: format(date, dateFormats[dateFormat].format),
          isToday: relativeDays === days
        })
      }
    }
    return dates
  }

  // 生成内链数据 - 注释掉未使用的变量
  // const formattedDate = format(targetDate, dateFormats[dateFormat].format)
  // const dayOfWeek = format(targetDate, 'EEEE')
  
  // 当前页面的固定结果（不受用户输入影响）
  const currentPageDate = addDays(new Date(), initialDays || 14)
  const currentPageFormattedDate = format(currentPageDate, dateFormats[dateFormat].format)
  const currentPageDayOfWeek = format(currentPageDate, 'EEEE')
  const currentPageHolidayInfo = getHolidayInfo(currentPageDate)

  return (
    <div>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            What is {days} {isBusinessDays ? 'Business ' : ''}{timeUnit === 'days' ? 'Days' : 
              timeUnit === 'weeks' ? (days === 1 ? 'Week' : 'Weeks') :
              timeUnit === 'quarters' ? (days === 1 ? 'Quarter' : 'Quarters') :
              (days === 1 ? 'Year' : 'Years')} From Today?
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Calculate future dates quickly and easily
          </p>
        </div>

        {/* Main Calculator */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 transition-colors">
          {/* Input Controls */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number
              </label>
              <input
                type="number"
                value={days}
                onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                min="1"
                max="3650"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Time Unit
              </label>
              <select
                value={timeUnit}
                onChange={(e) => setTimeUnit(e.target.value as 'days' | 'weeks' | 'quarters' | 'years')}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="quarters">Quarters</option>
                <option value="years">Years</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date Format
              </label>
              <select
                value={dateFormat}
                onChange={(e) => setDateFormat(e.target.value as keyof typeof dateFormats)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                {Object.entries(dateFormats).map(([key, format]) => (
                  <option key={key} value={key}>{format.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isBusinessDays}
                  onChange={(e) => setIsBusinessDays(e.target.checked)}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Business days only
                </span>
              </label>
            </div>
          </div>

          {/* Always show current page result */}
          <div className="text-center mb-6">
            <div className="bg-blue-50 rounded-xl p-6 mb-4">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="w-6 h-6 text-blue-600 mr-2" />
                <span className="text-lg font-medium text-blue-800">
                  {currentPageDayOfWeek}
                </span>
              </div>
              <div className="text-3xl font-bold text-blue-900 mb-4">
                {currentPageFormattedDate}
              </div>
              
              {/* Copy Button */}
              <button
                onClick={() => handleCopy(currentPageFormattedDate)}
                className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Date
                  </>
                )}
              </button>

              {/* Holiday Information for current page */}
              {currentPageHolidayInfo && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                  <div className="flex items-center justify-center">
                    <span className="text-2xl mr-2">{currentPageHolidayInfo.emoji}</span>
                    <div className="text-center">
                      {currentPageHolidayInfo.daysUntil === 0 ? (
                        <p className="text-yellow-800 font-medium">
                          {initialDays || 14} days from today is <strong>{currentPageHolidayInfo.name}</strong>! 🎉
                        </p>
                      ) : currentPageHolidayInfo.daysUntil > 0 ? (
                        <p className="text-yellow-800">
                          <strong>{currentPageHolidayInfo.name}</strong> is {currentPageHolidayInfo.daysUntil} day{currentPageHolidayInfo.daysUntil > 1 ? 's' : ''} after that
                        </p>
                      ) : (
                        <p className="text-yellow-800">
                          <strong>{currentPageHolidayInfo.name}</strong> is {Math.abs(currentPageHolidayInfo.daysUntil)} day{Math.abs(currentPageHolidayInfo.daysUntil) > 1 ? 's' : ''} before that
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Show calculate button if user changed the input */}
            {(days !== (initialDays || 14) || timeUnit !== 'days') && (
              <>
                <button
                  onClick={handleGoToPage}
                  className="inline-flex items-center px-8 py-4 bg-blue-600 dark:bg-blue-600 text-white dark:text-white text-lg font-semibold rounded-xl hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  <Calendar className="w-6 h-6 mr-3" />
                  Calculate {days} {timeUnit === 'days' ? (days === 1 ? 'Day' : 'Days') : 
                    timeUnit === 'weeks' ? (days === 1 ? 'Week' : 'Weeks') :
                    timeUnit === 'quarters' ? (days === 1 ? 'Quarter' : 'Quarters') :
                    (days === 1 ? 'Year' : 'Years')} From Today
                </button>
                
                <p className="text-gray-600 dark:text-gray-400 mt-4">
                  Click the button above to see the exact date and get detailed information
                </p>
              </>
            )}
          </div>
        </div>

        {/* Relative Dates Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 transition-colors">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
            Related Dates
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-600">
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Days</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Date</th>
                </tr>
              </thead>
              <tbody>
                {getRelativeDates().map((item, index) => (
                  <tr 
                    key={index} 
                    className={`border-b border-gray-100 dark:border-gray-700 ${item.isToday ? 'bg-blue-50 dark:bg-blue-900/30' : 'hover:bg-gray-50 dark:hover:bg-gray-700'} transition-colors`}
                  >
                    <td className="py-3 px-4">
                      <span className={`font-medium ${item.isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-gray-200'}`}>
                        {item.days} days from today
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={item.isToday ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-600 dark:text-gray-400'}>
                        {item.date}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
} 