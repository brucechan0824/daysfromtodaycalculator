'use client'

import { addDays, format } from 'date-fns'
import { Calendar } from 'lucide-react'

interface RelatedDatesTableProps {
  currentDays: number
}

export default function RelatedDatesTable({ currentDays }: RelatedDatesTableProps) {
  const today = new Date()
  
  // 生成相关日期数据
  const generateRelatedDates = () => {
    const dates = []
    
    // 生成前后几天的数据
    for (let offset = -3; offset <= 3; offset++) {
      const daysFromToday = currentDays + offset
      if (daysFromToday > 0) {
        const date = addDays(today, daysFromToday)
        const formattedDate = format(date, 'MMMM dd, yyyy')
        
        dates.push({
          startDate: format(addDays(today, offset), 'MMMM dd, yyyy'),
          startLabel: offset === -1 ? 'Yesterday' : 
                     offset === 0 ? 'Today' : 
                     offset === 1 ? 'Tomorrow' : 
                     format(addDays(today, offset), 'MMMM dd, yyyy'),
          daysAdded: `${daysFromToday} days`,
          endDate: formattedDate,
          isHighlighted: offset === 0, // 高亮当前行
          isCurrent: offset === 0
        })
      }
    }
    
    return dates
  }

  const relatedDates = generateRelatedDates()

  return (
    <div className="mb-12">
      {/* 表格标题 */}
      <div className="flex items-center space-x-3 mb-6">
        <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
          Related Date Calculations
        </h3>
      </div>

      {/* 表格 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Start date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Days added
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  End date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {relatedDates.map((row, index) => (
                <tr 
                  key={index}
                  className={`${
                    row.isHighlighted 
                      ? 'bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  } transition-colors`}
                >
                  <td className="px-6 py-4">
                    <span className={`${
                      row.isCurrent 
                        ? 'font-semibold text-blue-600 dark:text-blue-400' 
                        : 'text-gray-900 dark:text-gray-100'
                    }`}>
                      {row.startLabel}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`${
                      row.isCurrent 
                        ? 'font-semibold text-blue-600 dark:text-blue-400' 
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {row.daysAdded}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`${
                      row.isCurrent 
                        ? 'font-semibold text-blue-600 dark:text-blue-400' 
                        : 'text-gray-900 dark:text-gray-100'
                    }`}>
                      {row.endDate}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 表格说明 */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 This table shows what happens when you add {currentDays} days to different starting dates.
          The highlighted row shows the calculation for today.
        </p>
      </div>
    </div>
  )
} 