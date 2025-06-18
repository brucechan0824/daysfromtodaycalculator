'use client'

import Link from 'next/link'
import { Calculator, ArrowLeft } from 'lucide-react'

export default function BackToCalculator() {
  return (
    <div className="mt-6 mb-8">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
            <div>
              <p className="text-blue-800 dark:text-blue-200 font-medium text-sm">
                Need to calculate different days? Use our main calculator for any custom date range.
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 group ml-4 flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Calculator
          </Link>
        </div>
      </div>
    </div>
  )
} 