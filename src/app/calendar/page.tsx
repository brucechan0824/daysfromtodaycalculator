'use client'

import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import Calendar from '@/components/Calendar'

// 注意：使用了'use client'指令后，metadata需要移动到单独的文件中
// 这里我们暂时注释掉，稍后会创建一个单独的metadata文件
/*
export const metadata: Metadata = {
  title: '2025 Calendar | Days From Today Calculator',
  description: 'Free printable 2025 calendar with holidays. Use our calendar to manually verify date calculations or plan ahead.',
  keywords: 'calendar, 2025 calendar, printable calendar, online calendar, date calculator, days from today',
  openGraph: {
    title: '2025 Calendar | Days From Today Calculator',
    description: 'Free printable 2025 calendar with holidays. Use our calendar to manually verify date calculations.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '2025 Calendar | Days From Today Calculator',
    description: 'Free printable 2025 calendar with holidays. Use our calendar to manually verify date calculations.',
  },
}
*/

export default function CalendarPage() {
  // 生成2024-2026年的数据
  const years = [2024, 2025, 2026]
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <Header />
      
      <main className="container mx-auto px-6 lg:px-8 pt-6 pb-12 max-w-7xl">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[
          { label: 'Calendar', href: '/calendar' }
        ]} />
        
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            2025 Calendar
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Use our calendar to manually verify date calculations or plan ahead. Select any year below to view the full calendar.
          </p>
        </div>
        
        {/* Year Navigation */}
        <div className="flex justify-center gap-4 mb-8">
          {years.map(year => (
            <a 
              key={year}
              href={`#year-${year}`}
              className={`
                px-6 py-2 rounded-lg font-medium transition-colors
                ${year === 2025 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }
              `}
            >
              {year}
            </a>
          ))}
        </div>
        
        {/* Current Year Section */}
        <div id="year-2025" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            2025 Calendar
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {months.map((month, index) => (
              <div key={month} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 text-center">
                  {month} 2025
                </h3>
                
                <div className="grid grid-cols-7 gap-1 text-center">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day} className="text-xs font-medium text-gray-600 dark:text-gray-400 py-1">
                      {day}
                    </div>
                  ))}
                  
                  {/* 这里只是示例，实际日历需要根据月份动态生成 */}
                  {Array.from({ length: 35 }).map((_, i) => {
                    const day = i - (new Date(2025, index, 1).getDay()) + 1
                    const isValidDay = day > 0 && day <= new Date(2025, index + 1, 0).getDate()
                    
                    return (
                      <div 
                        key={i}
                        className={`
                          text-xs py-1 rounded-sm
                          ${isValidDay 
                            ? 'text-gray-800 dark:text-gray-200' 
                            : 'text-gray-300 dark:text-gray-600'
                          }
                        `}
                      >
                        {isValidDay ? day : ''}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Interactive Calendar Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Interactive Calendar
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Use our interactive calendar to navigate through months and years. Click on any date to select it.
          </p>
          
          <div className="max-w-md mx-auto">
            <Calendar />
          </div>
        </div>
        
        {/* Calendar Usage Guide */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            How to Use Our Calendar
          </h2>
          
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              Our calendar is a useful tool for manually verifying date calculations or planning ahead. Here's how you can use it:
            </p>
            
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Date Verification</strong>: Use the calendar to manually count days from today to verify our calculator's results.
              </li>
              <li>
                <strong>Planning Ahead</strong>: Look up future dates for planning events, deadlines, or important milestones.
              </li>
              <li>
                <strong>Counting Days</strong>: Count the number of days between two dates by selecting them on the calendar.
              </li>
              <li>
                <strong>Reference</strong>: Use as a quick reference for day of week, month length, or year planning.
              </li>
            </ol>
            
            <p className="mt-4">
              For more precise date calculations, we recommend using our <a href="/" className="text-blue-600 dark:text-blue-400 hover:underline">Days From Today Calculator</a> which automatically handles leap years, different month lengths, and provides additional formats.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 