'use client'

import { Maximize2, Minus, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useRef, useEffect, type PointerEvent } from 'react'

interface WindowProps {
  children: React.ReactNode
  title?: string
  defaultPosition?: { x: number; y: number }
  size?: { width: number; height: number }
  bgColor?: string
  className?: string
  fixed?: boolean
  onClose?: () => void
  onMinimize?: () => void
}

export function Window({
  children,
  title = '--yoshi',
  defaultPosition = { x: 30, y: 40 },
  size = { width: 430, height: 320 },
  bgColor = '',
  className = '',
  fixed = false,
  onClose,
  onMinimize,
}: WindowProps) {
  const [position, setPosition] = useState(defaultPosition)
  const [isDragging, setIsDragging] = useState(false)
  const [hidden, setHidden] = useState(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const parentRef = useRef<HTMLElement | null>(null)

  const [showScrollIndicator, setShowScrollIndicator] = useState(false)

  const updateConstraints = () => {
    if (containerRef.current) {
      parentRef.current = containerRef.current.closest('.relative.z-10')
    }
  }

  const checkScrollPosition = () => {
    if (!scrollRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
    setShowScrollIndicator(scrollTop + clientHeight < scrollHeight - 1)
  }

  useEffect(() => {
    updateConstraints()
    window.addEventListener('resize', updateConstraints)
    return () => window.removeEventListener('resize', updateConstraints)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    checkScrollPosition()
    el.addEventListener('scroll', checkScrollPosition)
    window.addEventListener('resize', checkScrollPosition)

    return () => {
      el.removeEventListener('scroll', checkScrollPosition)
      window.removeEventListener('resize', checkScrollPosition)
    }
  }, [children])

  const constrainPosition = (x: number, y: number) => {
    if (!parentRef.current || !containerRef.current) return { x, y }

    const parentRect = parentRef.current.getBoundingClientRect()

    const minX = 0
    const maxX = parentRect.width - size.width
    const minY = 0
    const maxY = parentRect.height - size.height

    return {
      x: Math.min(Math.max(x, minX), maxX),
      y: Math.min(Math.max(y, minY), maxY),
    }
  }

  const handlePointerDownMove = (e: PointerEvent<HTMLDivElement>) => {
    if (fixed) return
    if ((e.target as HTMLElement).closest('button')) return
    updateConstraints()
    setIsDragging(true)
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return

    e.preventDefault()

    const newX = e.clientX - dragStart.current.x
    const newY = e.clientY - dragStart.current.y

    const constrained = constrainPosition(newX, newY)
    setPosition(constrained)
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove as any)
      window.addEventListener('pointerup', handlePointerUp)
      return () => {
        window.removeEventListener('pointermove', handlePointerMove as any)
        window.removeEventListener('pointerup', handlePointerUp)
      }
    }
  }, [isDragging])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0, transition: { delay: 1, duration: 1.5 } }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
      }}
      className="select-none"
    >
      <div
        ref={containerRef}
        className={`${hidden ? 'hidden' : ''} relative h-full w-full overflow-hidden rounded-xl border border-slate-700/70 ${className} flex flex-col`}
      >
        <div
          onPointerDown={handlePointerDownMove}
          className="flex h-10 shrink-0 cursor-move items-center justify-between gap-3 bg-neutral-800 px-3"
        >
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setHidden(true)
              }}
              className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-red-600 hover:text-red-800 cursor-pointer"
            >
              <X size={15} />
            </button>
            <button
              onClick={() => setHidden(true)}
              className="flex h-5 w-5 rounded-full bg-amber-500/90 text-amber-500/9 hover:text-amber-700 justify-center items-center cursor-pointer"
            >
              <Minus size={15} />
            </button>
            <button className="flex h-5 w-5 rounded-full bg-green-600 text-green-600 hover:text-green-800 justify-center items-center cursor-pointer">
              <Maximize2 size={15} />
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-slate-300 pointer-events-none">
            {title}
          </div>

          <div className="w-17" />
        </div>

        <div className={`relative flex-1 overflow-hidden ${bgColor}`}>
          <div
            ref={scrollRef}
            className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-900/50 hover:scrollbar-thumb-slate-500"
          >
            {children}

            {showScrollIndicator && (
              <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce">
                <svg
                  className="h-6 w-6 text-slate-400/80"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
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
