import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import DateCalculatorTool from '@/components/DateCalculatorTool'
import MainResult from '@/components/MainResult'
import WorkingDaysSection from '@/components/WorkingDaysSection'
import RelatedDates from '@/components/RelatedDates'
import BackToCalculator from '@/components/BackToCalculator'
import AutoScrollHandler from '@/components/AutoScrollHandler'

interface PageProps {
  params: Promise<{
    days: string
  }>
}

// 生成静态页面 - 基于SEMrush数据优化
export function generateStaticParams() {
  // 基于SEMrush数据的高搜索量关键词 - 优先级排序
  const strategicDays = [
    // 超高搜索量 (>100K)
    30, 90, 60, 45, 
    // 高搜索量 (50K-100K)  
    28, 14,
    // 中高搜索量 (20K-50K)
    180, 21, 120, 75, 10,
    // 中搜索量 (10K-20K)
    7, 35, 100, 20, 40, 50,
    // 有价值搜索量 (>9.9K)
    5, 25, 31, 42, 56, 70, 150,
    // 其他重要天数
    365
  ]
  
  // 去重并排序
  const uniqueDays = [...new Set(strategicDays)].sort((a, b) => a - b)
  
  return uniqueDays.map(days => ({
    days: `${days}-days-from-today`
  }))
}

// SEO metadata - 增强关键词覆盖
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const daysStr = resolvedParams.days.replace('-days-from-today', '')
  const daysCount = parseInt(daysStr) || 14

  // 为14天特别优化
  if (daysCount === 14) {
    return {
      title: `What is 14 Days From Today? | 14 Days From Today Calculator`,
      description: `Calculate what is 14 days from today. Find out what day is 14 days from today with our free calculator. Get the exact date 14 days from now.`,
      keywords: `14 days from today, 14 days from now, what is 14 days from today, what day is 14 days from today, whats 14 days from now, what is the date 14 days from now, 14 days ahead, date calculator`,
      openGraph: {
        title: `What is 14 Days From Today? | 14 Days From Today Calculator`,
        description: `Calculate what is 14 days from today. Find out what day is 14 days from today with our free calculator.`,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `What is 14 Days From Today? | 14 Days From Today Calculator`,
        description: `Calculate what is 14 days from today. Free calculator with instant results.`,
      },
    }
  }

  // 其他天数的通用优化
  return {
    title: `What is ${daysCount} Days From Today? - ${daysCount} Days From Now Calculator`,
    description: `Calculate what is ${daysCount} days from today and ${daysCount} days from now. Free online date calculator with instant results and multiple formats.`,
    keywords: `${daysCount} days from today, ${daysCount} days from now, what is ${daysCount} days from today, what is ${daysCount} days from now, date calculator, ${daysCount} days later, future date calculator`,
    openGraph: {
      title: `What is ${daysCount} Days From Today? - Date Calculator`,
      description: `Calculate what is ${daysCount} days from today and ${daysCount} days from now. Free date calculator with instant results.`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `What is ${daysCount} Days From Today? - Date Calculator`,
      description: `Calculate what is ${daysCount} days from today. Free calculator with instant results.`,
    },
  }
}

export default async function DaysPage({ params }: PageProps) {
  const resolvedParams = await params
  const daysStr = resolvedParams.days.replace('-days-from-today', '')
  const daysCount = parseInt(daysStr) || 14

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <Header />
      
      {/* 自动滚动处理器 */}
      <AutoScrollHandler />
      
      <main className="container mx-auto px-6 lg:px-8 pt-6 pb-12 max-w-7xl">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[
          { label: `${daysCount} Days from Today` }
        ]} />
        
        {/* Main Content Area - 左右分栏布局 */}
        <div className="grid lg:grid-cols-10 gap-6">
          {/* Left Main Content - 占7/10宽度，增加左边距 */}
          <div className="lg:col-span-7 lg:pl-4">
            {/* 🎯 答案优先：Main Result Display - 移到最顶部 */}
            <MainResult days={daysCount} />
            
            {/* 🔧 交互工具：Calculator Tool - 移到答案下方 */}
            <DateCalculatorTool />
            
            {/* Working Days Section (Expandable) */}
            <WorkingDaysSection days={daysCount} />
            
            {/* More Related Links */}
            <RelatedDates currentDays={daysCount} />
            
            {/* Back to Calculator CTA */}
            <BackToCalculator />
          </div>
          
          {/* Right Sidebar - 占3/10宽度 */}
          <div className="lg:col-span-3">
            <div className="sticky top-4 space-y-4">
              {/* 可以在这里放置相关工具或内容推荐 */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-700">
                <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  🔗 Related Tools
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Coming Soon
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 