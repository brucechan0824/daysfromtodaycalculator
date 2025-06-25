import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import CalculatorPromotion from '@/components/CalculatorPromotion'
import MainResult from '@/components/MainResult'
import BusinessDaysSection from '@/components/BusinessDaysSection'
import RelatedDates from '@/components/RelatedDates'
import BackToCalculator from '@/components/BackToCalculator'
import AutoScrollHandler from '@/components/AutoScrollHandler'
import ManualVerification from '@/components/ManualVerification'


interface PageProps {
  params: Promise<{
    days: string
  }>
}

// 生成静态页面 - 基于用户需求优化的49个重要页面
export function generateStaticParams() {
  // 用户指定的完整天数列表 - 按时间长度分类
  const strategicDays = [
    // 短期(1-10天) - 日常规划常用
    3, 5, 6, 7, 8, 9, 10,
    // 中短期(11-30天) - 项目规划和月度计划
    11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 24, 25, 27, 28, 29, 30,
    // 中期(31-60天) - 季度规划和中期目标
    31, 35, 40, 41, 42, 45, 50, 55, 56, 60,
    // 长期(61-120天) - 长期规划和年度目标
    63, 65, 70, 75, 80, 84, 90, 91, 100, 120,
    // 超长期(>120天) - 年度和多年规划
    150, 180, 200, 270
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
      description: `Calculate what is 14 days from today. Find out what day is 14 days from today with our free calculator. Also includes 14 business days from today calculation. Get the exact date 14 days from now.`,
      keywords: `14 days from today, 14 days from now, what is 14 days from today, what day is 14 days from today, 14 business days from today, what is 14 business days from today, whats 14 days from now, what is the date 14 days from now, 14 days ahead, date calculator`,
      openGraph: {
        title: `What is 14 Days From Today? | 14 Days From Today Calculator`,
        description: `Calculate what is 14 days from today and 14 business days from today. Find out what day is 14 days from today with our free calculator.`,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `What is 14 Days From Today? | 14 Days From Today Calculator`,
        description: `Calculate what is 14 days from today and 14 business days from today. Free calculator with instant results.`,
      },
    }
  }

  // 其他天数的通用优化
  return {
    title: `What is ${daysCount} Days From Today? - ${daysCount} Days From Now Calculator`,
    description: `Calculate what is ${daysCount} days from today and ${daysCount} days from now. Also includes ${daysCount} business days from today calculation. Free online date calculator with instant results and multiple formats.`,
    keywords: `${daysCount} days from today, ${daysCount} days from now, what is ${daysCount} days from today, what day is ${daysCount} days from today, ${daysCount} business days from today, what is ${daysCount} business days from today, what is the date ${daysCount} days from now, ${daysCount} days ahead, date calculator`,
    openGraph: {
      title: `What is ${daysCount} Days From Today? - Date Calculator`,
      description: `Calculate what is ${daysCount} days from today and ${daysCount} business days from today. Free date calculator with instant results.`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `What is ${daysCount} Days From Today? - Date Calculator`,
      description: `Calculate what is ${daysCount} days from today and ${daysCount} business days from today. Free calculator with instant results.`,
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
            
            {/* 🔧 推广组件：Calculator Promotion - 引导用户回到首页 */}
            <CalculatorPromotion days={daysCount} />
            
            {/* 验证方法和日历 - 包含周末的日期计算 */}
            <ManualVerification days={daysCount} />
            
            {/* Business Days Section (Expandable) - 不包含周末的日期计算 */}
            <BusinessDaysSection days={daysCount} />
            
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