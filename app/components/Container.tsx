'use client'

import { House, Minimize2, X } from 'lucide-react'
import { motion } from 'framer-motion'
const containerVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 2 } },
}

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <div className="relative flex h-dvh overflow-hidden p-4">
        <div className="relative overflow-hidden rounded-lg border border-slate-600 transition-all duration-700 size-full bg-neutral-800 flex flex-col">
          <div className="flex gap-2 p-2 shrink-0 items-center relative">
            <div className="flex gap-2 z-10">
              <div className="bg-red-600 text-red-600 hover:text-red-800 rounded-full w-5 h-5 cursor-pointer">
                <X width={20} height={20} />
              </div>
              <div className="bg-slate-700 rounded-full w-5 h-5" />
              <div className="bg-green-600 text-green-600 hover:text-green-800 rounded-full w-5 h-5 cursor-pointer overflow-hidden">
                <Minimize2 width={20} height={20} className="rotate-90" />
              </div>
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-x-2 text-white font-medium pointer-events-none">
              <House />
              --yoshi
            </div>
          </div>
          <div className="bg-black flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-600 hover:scrollbar-thumb-gray-300">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
