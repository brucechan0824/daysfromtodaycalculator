'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function AutoScrollHandler() {
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const scrollTo = searchParams.get('scrollTo')
    
    if (scrollTo === 'working-days') {
      // 等待页面完全加载后再滚动
      const timer = setTimeout(() => {
        const element = document.getElementById('working-days-section')
        if (element) {
          // 平滑滚动到工作日部分
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
          
          // 如果WorkingDaysSection是折叠状态，触发展开
          const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
          })
          element.dispatchEvent(clickEvent)
        }
      }, 500) // 延迟500ms确保页面元素完全渲染
      
      return () => clearTimeout(timer)
    }
  }, [searchParams])
  
  return null // 这个组件不渲染任何内容
} 