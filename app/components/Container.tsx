'use client'

import { House, Minimize2, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const containerVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 2 } },
}

export default function Container({ children }: { children: React.ReactNode }) {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const checkScrollPosition = () => {
    if (!scrollRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
    setShowScrollIndicator(scrollTop + clientHeight < scrollHeight - 3)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    checkScrollPosition()

    el.addEventListener('scroll', checkScrollPosition)
    window.addEventListener('resize', checkScrollPosition)

    const timer = setTimeout(checkScrollPosition, 300)

    return () => {
      el.removeEventListener('scroll', checkScrollPosition)
      window.removeEventListener('resize', checkScrollPosition)
      clearTimeout(timer)
    }
  }, [children])

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <div className="relative flex h-dvh overflow-hidden p-4">
        <div className="relative overflow-hidden rounded-lg border border-slate-600 transition-all duration-700 size-full bg-neutral-800 flex flex-col">
          <div className="flex gap-2 p-2 shrink-0 items-center relative">
            <div className="flex gap-2 z-10">
              <div className="bg-red-600 text-red-600 hover:text-red-800 rounded-full w-5 h-5 cursor-pointer flex items-center justify-center">
                <X size={15} />
              </div>
              <div className="bg-slate-700 rounded-full w-5 h-5" />
              <div className="bg-green-600 text-green-600 hover:text-green-800 rounded-full w-5 h-5 cursor-pointer overflow-hidden flex items-center justify-center">
                <Minimize2 size={15} className="rotate-90" />
              </div>
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-x-2 text-white font-medium pointer-events-none">
              <House />
              --yoshi
            </div>
          </div>

          <div className="relative flex-1 bg-black overflow-hidden">
            <div
              ref={scrollRef}
              className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-600 hover:scrollbar-thumb-gray-300"
            >
              {children}
            </div>

            {showScrollIndicator && (
              <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 animate-bounce z-10">
                <svg
                  className="h-7 w-7 text-slate-300/90 drop-shadow-md"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
