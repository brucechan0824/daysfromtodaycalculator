'use client'

import { useState } from 'react'
import { addDays, format, differenceInWeeks, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'
import { Calendar, Copy, Check, Clock, Info } from 'lucide-react'

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

// 国家格式选项 - 带国旗的下拉框
const countryFormats = [
  { code: 'US', flag: '🇺🇸', name: 'United States', 
    formats: [
      { format: 'MMMM dd, yyyy', label: 'Full format' },
      { format: 'M/d/yy', label: 'Short format' },
      { format: 'yyyy-MM-dd', label: 'ISO format', badge: 'ISO' }
    ]
  },
  { code: 'CA', flag: '🇨🇦', name: 'Canada',
    formats: [
      { format: 'MMMM dd, yyyy', label: 'Full format' },
      { format: 'M/d/yy', label: 'Short format' },
      { format: 'yyyy-MM-dd', label: 'ISO format', badge: 'ISO' }
    ]
  },
  { code: 'UK', flag: '🇬🇧', name: 'United Kingdom',
    formats: [
      { format: 'dd MMMM yyyy', label: 'Full format' },
      { format: 'd/M/yy', label: 'Short format' },
      { format: 'yyyy-MM-dd', label: 'ISO format', badge: 'ISO' }
    ]
  },
  { code: 'DE', flag: '🇩🇪', name: 'Germany',
    formats: [
      { format: 'dd MMMM yyyy', label: 'Full format' },
      { format: 'dd.MM.yy', label: 'Short format' },
      { format: 'yyyy-MM-dd', label: 'ISO format', badge: 'ISO' }
    ]
  },
  { code: 'FR', flag: '🇫🇷', name: 'France',
    formats: [
      { format: 'dd MMMM yyyy', label: 'Full format' },
      { format: 'dd/MM/yy', label: 'Short format' },
      { format: 'yyyy-MM-dd', label: 'ISO format', badge: 'ISO' }
    ]
  },
  { code: 'JP', flag: '🇯🇵', name: 'Japan',
    formats: [
      { format: 'yyyy年MM月dd日', label: 'Full format' },
      { format: 'yyyy/MM/dd', label: 'Short format' },
      { format: 'yyyy-MM-dd', label: 'ISO format', badge: 'ISO' }
    ]
  },
  { code: 'CN', flag: '🇨🇳', name: 'China',
    formats: [
      { format: 'yyyy年MM月dd日', label: 'Full format' },
      { format: 'yyyy/MM/dd', label: 'Short format' },
      { format: 'yyyy-MM-dd', label: 'ISO format', badge: 'ISO' }
    ]
  },
  { code: 'KR', flag: '🇰🇷', name: 'South Korea',
    formats: [
      { format: 'yyyy년 MM월 dd일', label: 'Full format' },
      { format: 'yyyy.MM.dd', label: 'Short format' },
      { format: 'yyyy-MM-dd', label: 'ISO format', badge: 'ISO' }
    ]
  },
  { code: 'IN', flag: '🇮🇳', name: 'India',
    formats: [
      { format: 'dd MMMM yyyy', label: 'Full format' },
      { format: 'dd/MM/yy', label: 'Short format' },
      { format: 'yyyy-MM-dd', label: 'ISO format', badge: 'ISO' }
    ]
  }
]

export default function MainResult({ days, title }: MainResultProps) {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null)
  const [selectedCountry, setSelectedCountry] = useState('US')
  
  const today = new Date()
  const targetDate = addDays(today, days)
  const dayOfWeek = format(targetDate, 'EEEE')
  
  // 获取选中国家的格式
  const selectedCountryData = countryFormats.find(country => country.code === selectedCountry) || countryFormats[0]
  
  // 时间单位转换 - 基于竞品inchcalculator.com的功能
  const timeUnits = {
    weeks: Math.floor(days / 7),
    hours: differenceInHours(targetDate, today),
    minutes: differenceInMinutes(targetDate, today),
    seconds: differenceInSeconds(targetDate, today)
  }
  
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

  // 改进的复制功能 - 支持不同格式
  const handleCopy = async (text: string, formatKey: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedFormat(formatKey)
      setTimeout(() => setCopiedFormat(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="mb-12">
      {/* 页面标题 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          {title || `What is ${days} Days From Today?`}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Calculate future dates quickly and easily
        </p>
      </div>

      {/* 主要结果区域 - 优化布局 */}
      <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-8">
        {/* 左侧：核心答案显示 */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 md:p-8 text-center border border-blue-200 dark:border-blue-800">
          {/* 日历图标 */}
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 p-4 rounded-2xl shadow-lg">
              <Calendar className="w-12 h-12 md:w-16 md:h-16 text-white" />
            </div>
          </div>
          
          {/* 主要日期显示 - 更突出 */}
          <div className="mb-6">
            <div className="text-xl md:text-2xl font-medium text-blue-600 dark:text-blue-400 mb-2">
              {dayOfWeek}
            </div>
            <div className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              {format(targetDate, 'MMMM dd, yyyy')}
            </div>
            
            {/* 主要复制按钮 */}
            <button
              onClick={() => handleCopy(`${dayOfWeek}, ${format(targetDate, 'MMMM dd, yyyy')}`, 'main')}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {copiedFormat === 'main' ? (
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
          </div>

          {/* 时间单位显示 - 基于竞品功能 */}
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              {days} days is equal to:
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {timeUnits.weeks}
                </span>
                <span className="text-gray-600 dark:text-gray-400 ml-1">
                  {timeUnits.weeks === 1 ? 'week' : 'weeks'}
                </span>
              </div>
              <div>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {timeUnits.hours.toLocaleString()}
                </span>
                <span className="text-gray-600 dark:text-gray-400 ml-1">hours</span>
              </div>
              <div>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {timeUnits.minutes.toLocaleString()}
                </span>
                <span className="text-gray-600 dark:text-gray-400 ml-1">minutes</span>
              </div>
              <div>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {timeUnits.seconds.toLocaleString()}
                </span>
                <span className="text-gray-600 dark:text-gray-400 ml-1">seconds</span>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：多种格式显示 - 优化为移动端友好 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Date Formats
            </h3>
          </div>
          
          <div className="space-y-4">
            {/* 国家选择下拉框 - 带国旗显示 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Country Format
              </label>
              <div className="relative">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none cursor-pointer text-base"
                  style={{ paddingLeft: '3rem' }}
                >
                  {countryFormats.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.name}
                    </option>
                  ))}
                </select>
                {/* 显示选中国家的国旗 */}
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-xl">
                  {selectedCountryData.flag}
                </div>
                {/* 下拉箭头 */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* 显示选中国家的3个格式 */}
            <div className="space-y-3">
              {selectedCountryData.formats.map((fmt, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    {fmt.badge ? (
                      <span className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-xs font-mono rounded">
                        {fmt.badge}
                      </span>
                    ) : (
                      <span className="text-xl">{selectedCountryData.flag}</span>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 dark:text-gray-100 truncate">
                        {format(targetDate, fmt.format)}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleCopy(format(targetDate, fmt.format), fmt.format)}
                    className="ml-3 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors flex-shrink-0"
                  >
                    {copiedFormat === fmt.format ? (
                      <span className="flex items-center">
                        <Check className="w-3 h-3 mr-1" />
                        Copied
                      </span>
                    ) : (
                      'Copy'
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 详细信息 - 优化信息层次 */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 mb-6">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-green-600 dark:text-green-400 mr-3 mt-0.5 flex-shrink-0" />
          <div className="text-gray-700 dark:text-gray-300">
            <p className="mb-2">
              Adding <strong className="text-green-700 dark:text-green-300">{days} days</strong> to today's date takes you to{' '}
              <strong className="text-green-700 dark:text-green-300">{dayOfWeek}, {format(targetDate, 'MMMM dd, yyyy')}</strong>.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Day of year:</span>
                <span className="ml-1 font-medium">{format(targetDate, 'DDD')}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Week of year:</span>
                <span className="ml-1 font-medium">{format(targetDate, 'w')}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Quarter:</span>
                <span className="ml-1 font-medium">Q{Math.ceil(parseInt(format(targetDate, 'M')) / 3)}</span>
              </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-3">
              Calculation based on today: <strong>{format(today, 'EEEE, MMMM dd, yyyy')}</strong>
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