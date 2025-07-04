'use client'

import { useState } from 'react'
import { Calendar, Calculator, ArrowRight, Clock } from 'lucide-react'

export default function DateCalculatorTool() {
  const [days, setDays] = useState(14)
  const [isBusinessDays, setIsBusinessDays] = useState(false)
  const [initialLoad, setInitialLoad] = useState(true)

  // 快捷天数选项 - 基于竞品分析的热门天数
  const quickDays = [7, 14, 21, 30, 60, 90]

  // const calculateTargetDate = () => {
  //   const today = new Date()
  //   const finalDays = days <= 0 ? 1 : days // 确保至少为1
  //   return isBusinessDays ? addBusinessDays(today, finalDays) : addDays(today, finalDays)
  // }

  // const targetDate = calculateTargetDate() // 未使用，注释掉

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '') {
      setDays(0)
    } else {
      const numValue = Math.max(1, Math.min(3650, parseInt(value) || 1))
      setDays(numValue)
    }
    setInitialLoad(false)
  }

  const handleInputBlur = () => {
    if (days === 0) {
      setDays(1)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCalculate()
    }
  }

  const handleQuickSelect = (selectedDays: number) => {
    setDays(selectedDays)
    setInitialLoad(false)
  }

  const handleCalculate = () => {
    if (days > 0) {
      let url = `/${days}-days-from-today`
      if (isBusinessDays) {
        url += '?scrollTo=working-days'
      }
      window.location.href = url
    }
  }

  return (
    <div className="mb-8">
      {/* 计算器工具区域 - 超紧凑设计 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center mb-4">
          <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
            Days From Today Calculator
          </h3>
        </div>

        {/* 快捷天数按钮 - 超紧凑布局 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Quick Selection:
          </label>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5">
            {quickDays.map((quickDay) => (
              <button
                key={quickDay}
                onClick={() => handleQuickSelect(quickDay)}
                className="px-2 py-1 rounded-md font-medium transition-all duration-200 text-sm"
                style={{
                  backgroundColor: (!initialLoad && days === quickDay) ? '#2563eb' : '#f3f4f6',
                  color: (!initialLoad && days === quickDay) ? 'white' : '#000000',
                  fontWeight: 'normal'
                }}
              >
                {quickDay}
              </button>
            ))}
          </div>
        </div>

        {/* 自定义输入区域 - 超紧凑布局 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-3">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Custom Days
            </label>
            <input
              type="number"
              value={initialLoad || days === 0 ? '' : days}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
              style={{
                backgroundColor: '#ffffff',
                color: '#000000',
                borderColor: '#d1d5db'
              }}
              min="1"
              max="3650"
              placeholder="Enter days"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Type
            </label>
            <div className="flex items-center h-8">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isBusinessDays}
                  onChange={(e) => setIsBusinessDays(e.target.checked)}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded"
                />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Business only
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Calculate
            </label>
            <button
              onClick={handleCalculate}
              className="w-full px-3 py-2 bg-blue-600 dark:bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 dark:hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center group text-sm"
            >
              <Calendar className="w-4 h-4 mr-1" />
              Calculate
              <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 工作日计算提示 - 超紧凑显示 */}
        {isBusinessDays && (
          <div className="bg-green-100 dark:bg-green-900/30 rounded-md p-2 border border-green-300 dark:border-green-700">
            <div className="flex items-center justify-center">
              <Clock className="w-4 h-4 text-green-600 dark:text-green-400 mr-2" />
              <span className="text-xs font-semibold text-green-800 dark:text-green-300">
                Business days (excluding weekends)
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 