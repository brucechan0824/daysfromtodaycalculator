import Link from 'next/link'
import { Calculator, ArrowLeft } from 'lucide-react'

interface CalculatorPromotionProps {
  days: number
}

export default function CalculatorPromotion({ days }: CalculatorPromotionProps) {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 shadow-sm border border-blue-200 dark:border-blue-800 mt-6 mb-8">
      <div className="flex items-center justify-between">
        {/* Left: Text Content */}
        <div className="flex items-center">
          <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0" />
          <p className="text-gray-700 dark:text-gray-300">
            Need to verify this {days} days calculation or calculate different dates? Use our main <strong>Days From Today Calculator</strong> for any custom date range.
          </p>
        </div>
        
        {/* Right: CTA Button */}
        <Link
          href="/"
          className="ml-4 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex-shrink-0"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Calculator
        </Link>
      </div>
    </div>
  )
} 