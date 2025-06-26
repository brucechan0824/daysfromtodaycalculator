import Link from 'next/link'
import { ExternalLink, Users, Calendar } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* About Section */}
          <div>
            <div className="flex items-center mb-4">
              <Calendar className="w-6 h-6 text-blue-400 mr-2" />
              <h3 className="text-lg font-semibold">Days From Today</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Professional date calculation tool for planning your future. Calculate any number of days from today with precision and ease.
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Calculator Tools */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Calculator Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/14-days-from-today" className="text-gray-400 hover:text-white transition-colors text-sm">
                  14 Days Calculator
                </Link>
              </li>
              <li>
                <Link href="/30-days-from-today" className="text-gray-400 hover:text-white transition-colors text-sm">
                  30 Days Calculator
                </Link>
              </li>
              <li>
                <Link href="/90-days-from-today" className="text-gray-400 hover:text-white transition-colors text-sm">
                  90 Days Calculator
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="text-gray-400 hover:text-white transition-colors text-sm">
                  2025 Calendar
                </Link>
              </li>
            </ul>
          </div>

          {/* Partner Links */}
          <div>
            <div className="flex items-center mb-4">
              <Users className="w-5 h-5 text-blue-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-200">Partners</h3>
            </div>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://www.qiuyumi.com/whois/?domain=penaltychallenge.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-400 hover:text-white transition-colors text-sm group"
                >
                  <span>Qiuyumi</span>
                  <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <p className="text-xs text-gray-500 mt-1">Domain Tools & WHOIS</p>
              </li>
              <li>
                <a 
                  href="https://namebeta.com/search/daysfromtoday.tools" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-400 hover:text-white transition-colors text-sm group"
                >
                  <span>NameBeta</span>
                  <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <p className="text-xs text-gray-500 mt-1">Domain Search & Price</p>
              </li>
            </ul>
          </div>

          {/* Legal & Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Legal & Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Days From Today Calculator. Made with ❤️ for planning your future.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 