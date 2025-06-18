import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import DateCalculatorTool from '@/components/DateCalculatorTool'
import QuickLinks from '@/components/QuickLinks'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <Header />
      
      <main className="container mx-auto px-6 lg:px-8 py-8 max-w-7xl">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[]} />
        
        {/* Main Content Area - 左右分栏布局 */}
        <div className="grid lg:grid-cols-10 gap-6">
          {/* Left Main Content - 占7/10宽度，增加左边距 */}
          <div className="lg:col-span-7 lg:pl-4">
            {/* Calculator Tool */}
            <DateCalculatorTool />
        
            {/* Popular Days Quick Links */}
        <QuickLinks />
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
