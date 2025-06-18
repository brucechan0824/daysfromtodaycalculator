'use client'

import { useEffect, useState } from 'react'
import { addBusinessDays, format } from 'date-fns'
import { Briefcase, Calendar } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

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

interface WorkingDaysSectionProps {
  days: number
}

export default function WorkingDaysSection({ days }: WorkingDaysSectionProps) {
  const [copied, setCopied] = useState('')
  const [dateFormat, setDateFormat] = useState<keyof typeof dateFormats>('us')
  const searchParams = useSearchParams()
  
  const today = new Date()
  const workingDate = addBusinessDays(today, days)
  const dayOfWeek = format(workingDate, 'EEEE')
  const formattedDate = format(workingDate, dateFormats[dateFormat].format)
  const shortFormattedDate = format(workingDate, dateFormats[dateFormat].shortFormat)
  const isoDate = format(workingDate, 'yyyy-MM-dd')
  
  // 检查URL参数，如果需要滚动到工作日部分，自动滚动
  useEffect(() => {
    const scrollTo = searchParams.get('scrollTo')
    if (scrollTo === 'working-days') {
      setTimeout(() => {
        document.getElementById('working-days-section')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }, 500)
    }
  }, [searchParams])

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
    <div id="working-days-section" className="mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-colors">
        {/* 左右分栏布局 */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* 左侧：主要结果 */}
          <div className="text-center">
            {/* 标题 */}
            <div className="flex items-center justify-center mb-4">
              <Briefcase className="w-6 h-6 text-orange-600 dark:text-orange-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {days} working days from today
              </h2>
            </div>

            {/* 主要结果 */}
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-center mb-2">
                <span className="text-lg font-medium text-orange-800 dark:text-orange-300">
                  {dayOfWeek}
                </span>
              </div>
              <div className="text-3xl font-bold text-orange-900 dark:text-orange-200 mb-4">
                {formattedDate}
              </div>
              
              {/* Copy Button */}
              <button
                onClick={() => handleCopy(formattedDate)}
                className="px-3 py-1 text-sm bg-orange-50 text-orange-600 border border-orange-200 rounded hover:bg-orange-100 transition-colors"
              >
                {copied === formattedDate ? 'Copied!' : 'Copy'}
              </button>
            </div>

            {/* 简洁说明 */}
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Business days exclude weekends (Saturday and Sunday)
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
                className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
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
                  <span className="inline-block w-8 h-6 bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 text-xs font-medium rounded px-1 mr-3 text-center leading-6">
                    {dateFormat.toUpperCase()}
                  </span>
                  <span style={{ color: '#000000' }} className="font-medium">
                    {formattedDate}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(formattedDate)}
                  className="px-3 py-1 text-sm bg-orange-50 text-orange-600 border border-orange-200 rounded hover:bg-orange-100 transition-colors"
                >
                  {copied === formattedDate ? 'Copied!' : 'Copy'}
                </button>
              </div>

              {/* 短格式 */}
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <span className="inline-block w-8 h-6 bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 text-xs font-medium rounded px-1 mr-3 text-center leading-6">
                    {dateFormat.toUpperCase()}
                  </span>
                  <span style={{ color: '#000000' }} className="font-medium">
                    {shortFormattedDate}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(shortFormattedDate)}
                  className="px-3 py-1 text-sm bg-orange-50 text-orange-600 border border-orange-200 rounded hover:bg-orange-100 transition-colors"
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
                  className="px-3 py-1 text-sm bg-orange-50 text-orange-600 border border-orange-200 rounded hover:bg-orange-100 transition-colors"
                >
                  {copied === isoDate ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 