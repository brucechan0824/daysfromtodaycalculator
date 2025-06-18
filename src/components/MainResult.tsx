'use client'

import { useState } from 'react'
import { addDays, format } from 'date-fns'
import { Calendar, Copy, Check, Info } from 'lucide-react'

interface MainResultProps {
  days: number
  title?: string
}

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
  us: { label: 'United States', format: 'MMMM dd, yyyy', shortFormat: 'M/d/yy' },
  uk: { label: 'United Kingdom', format: 'dd MMMM yyyy', shortFormat: 'dd/MM/yy' },
  de: { label: 'Germany', format: 'dd.MM.yyyy', shortFormat: 'dd.MM.yy' },
  fr: { label: 'France', format: 'dd/MM/yyyy', shortFormat: 'dd/MM/yy' },
  jp: { label: 'Japan', format: 'yyyy年MM月dd日', shortFormat: 'yy/MM/dd' },
  cn: { label: 'China', format: 'yyyy年MM月dd日', shortFormat: 'yy/MM/dd' },
  in: { label: 'India', format: 'dd-MM-yyyy', shortFormat: 'dd-MM-yy' },
  au: { label: 'Australia', format: 'dd/MM/yyyy', shortFormat: 'dd/MM/yy' },
  ca: { label: 'Canada', format: 'yyyy-MM-dd', shortFormat: 'yy-MM-dd' },
  iso: { label: 'ISO', format: 'yyyy-MM-dd', shortFormat: 'yyyy-MM-dd' }
}

export default function MainResult({ days, title }: MainResultProps) {
  const [copied, setCopied] = useState('')
  const [dateFormat, setDateFormat] = useState<keyof typeof dateFormats>('us')
  
  const today = new Date()
  const targetDate = addDays(today, days)
  const dayOfWeek = format(targetDate, 'EEEE')
  const formattedDate = format(targetDate, dateFormats[dateFormat].format)
  const shortFormattedDate = format(targetDate, dateFormats[dateFormat].shortFormat)
  const isoDate = format(targetDate, 'yyyy-MM-dd')
  
  // 检查节假日
  const getHolidayInfo = (date: Date) => {
    const monthDay = format(date, 'MM-dd')
    const holiday = holidays.find(h => h.date === monthDay)
    
    if (holiday) return { ...holiday, daysUntil: 0 }
    
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

  const holidayInfo = getHolidayInfo(targetDate)

  // 复制功能
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(text)
      setTimeout(() => setCopied(''), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="mb-8">
      {/* 页面标题 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          {title || `What is ${days} Days From Today?`}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Calculate future dates quickly and easily
        </p>
      </div>

      {/* 主要结果区域 - 统一设计 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-colors mb-8">
        {/* 左右分栏布局 */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* 左侧：主要结果 */}
          <div className="text-center">
            {/* 标题 */}
            <div className="flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {days} days from today
              </h2>
            </div>

            {/* 主要结果 */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-center mb-2">
                <span className="text-lg font-medium text-blue-800 dark:text-blue-300">
                  {dayOfWeek}
                </span>
              </div>
              <div className="text-3xl font-bold text-blue-900 dark:text-blue-200 mb-4">
                {formattedDate}
              </div>
              
              {/* Copy Button */}
              <button
                onClick={() => handleCopy(formattedDate)}
                className="px-3 py-1 text-sm bg-blue-50 text-blue-600 border border-blue-200 rounded hover:bg-blue-100 transition-colors"
              >
                {copied === formattedDate ? 'Copied!' : 'Copy'}
              </button>
            </div>

            {/* 简洁说明 */}
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Calculation based on today: {format(today, 'MMMM dd, yyyy')}
            </p>
          </div>

          {/* 右侧：日期格式 */}
          <div>
            <div className="flex items-center mb-4">
              <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-2" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Date Formats
              </h3>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Country Format
              </label>
              <select
                value={dateFormat}
                onChange={(e) => setDateFormat(e.target.value as keyof typeof dateFormats)}
                style={{
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  border: '1px solid #d1d5db'
                }}
                className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                {Object.entries(dateFormats).map(([key, format]) => (
                  <option key={key} value={key} style={{ backgroundColor: '#ffffff', color: '#000000' }}>
                    {format.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 格式化日期列表 */}
            <div className="space-y-3">
              {/* 完整格式 */}
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <span className="inline-block w-8 h-6 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-medium rounded px-1 mr-3 text-center leading-6">
                    {dateFormat.toUpperCase()}
                  </span>
                  <span style={{ color: '#000000' }} className="font-medium">
                    {formattedDate}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(formattedDate)}
                  className="px-3 py-1 text-sm bg-blue-50 text-blue-600 border border-blue-200 rounded hover:bg-blue-100 transition-colors"
                >
                  {copied === formattedDate ? 'Copied!' : 'Copy'}
                </button>
              </div>

              {/* 短格式 */}
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <span className="inline-block w-8 h-6 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-medium rounded px-1 mr-3 text-center leading-6">
                    {dateFormat.toUpperCase()}
                  </span>
                  <span style={{ color: '#000000' }} className="font-medium">
                    {shortFormattedDate}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(shortFormattedDate)}
                  className="px-3 py-1 text-sm bg-blue-50 text-blue-600 border border-blue-200 rounded hover:bg-blue-100 transition-colors"
                >
                  {copied === shortFormattedDate ? 'Copied!' : 'Copy'}
                </button>
              </div>

              {/* ISO格式 */}
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <span className="inline-block w-8 h-6 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 text-xs font-medium rounded px-1 mr-3 text-center leading-6">
                    ISO
                  </span>
                  <span style={{ color: '#000000' }} className="font-medium">
                    {isoDate}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(isoDate)}
                  className="px-3 py-1 text-sm bg-blue-50 text-blue-600 border border-blue-200 rounded hover:bg-blue-100 transition-colors"
                >
                  {copied === isoDate ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      

      {/* 节假日信息 */}
      {holidayInfo && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
          <div className="flex items-center justify-center">
            <span className="text-2xl mr-3">{holidayInfo.emoji}</span>
            <div className="text-center">
              {holidayInfo.daysUntil === 0 ? (
                <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                  {days} days from today is <strong>{holidayInfo.name}</strong>! 🎉
                </p>
              ) : holidayInfo.daysUntil > 0 ? (
                <p className="text-yellow-800 dark:text-yellow-200">
                  <strong>{holidayInfo.name}</strong> is {holidayInfo.daysUntil} day{holidayInfo.daysUntil > 1 ? 's' : ''} after that
                </p>
              ) : (
                <p className="text-yellow-800 dark:text-yellow-200">
                  <strong>{holidayInfo.name}</strong> is {Math.abs(holidayInfo.daysUntil)} day{Math.abs(holidayInfo.daysUntil) > 1 ? 's' : ''} before that
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 