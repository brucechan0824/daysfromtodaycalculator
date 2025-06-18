import { ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-12 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            {/* X (Twitter) Link */}
            <a 
              href="https://x.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span className="text-sm">Follow us on X</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          
          <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors">
            © 2025 Days From Today Calculator. Made with ❤️ for planning your future.
          </p>
        </div>
      </div>
    </footer>
  )
} 