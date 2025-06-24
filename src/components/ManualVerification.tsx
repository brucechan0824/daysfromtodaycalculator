'use client'

import Calendar from './Calendar'
import { addDays } from 'date-fns'

interface ManualVerificationProps {
  days: number
}

export default function ManualVerification({ days }: ManualVerificationProps) {
  const today = new Date()
  const targetDate = addDays(today, days)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 mt-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        How to Calculate the Date {days} Days From Today
      </h2>
      
      {/* 4个步骤的手动验证方法 */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: 4 Steps */}
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-4">
            📋 Manual Calculation Steps
          </h3>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                1
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white text-sm">
                  figure out the date
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  {days} days from now manually by using a
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                2
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white text-sm">
                  calendar
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  Look at today's date on the calendar and count forward one day at a time until you've counted {days} total days.
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                3
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white text-sm">
                  Instead of counting up
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  you can move forward one day at a time while subtracting 1 from {days} for each day you move forward. You can also move forward one week at a time while subtracting seven from {days} for each week you move forward.
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                4
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white text-sm">
                  Continue this process
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  of subtracting the days your original number has reached zero. This is the date {days} days from now.
                </div>
              </div>
            </div>
          </div>

          {/* 快速提示 */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-blue-900 dark:text-blue-200 text-sm">
              <strong>💡 Quick Tip:</strong> Use the calendar on the right to manually count and verify our calculation. Today is highlighted in blue, and your target date ({days} days from today) is highlighted in green.
            </div>
          </div>
        </div>

        {/* Right: Calendar */}
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-4">
            📅 Interactive Calendar
          </h3>
          <Calendar 
            highlightDate={targetDate}
            showHighlight={true}
            onDateSelect={(date) => {
              // 可以在这里处理日期选择逻辑
              console.log('Selected date:', date)
            }}
          />
        </div>
      </div>
    </div>
  )
} 