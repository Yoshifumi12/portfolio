'use client'

import { ChevronDown, Maximize2, Minus, X } from 'lucide-react'
import { motion } from 'motion/react'
import { useState, useRef, useEffect, type PointerEvent } from 'react'
import { useScrollIndicator } from '@/app/hooks/useScrollIndicator'

interface WindowProps {
  children: React.ReactNode
  title?: string
  defaultPosition?: { x: number; y: number }
  size?: { width: number; height: number }
  bgColor?: string
  className?: string
  fixed?: boolean
}

export function Window({
  children,
  title = '--yoshi',
  defaultPosition = { x: 30, y: 40 },
  size = { width: 430, height: 320 },
  bgColor = '',
  className = '',
  fixed = false,
}: WindowProps) {
  const [position, setPosition] = useState(defaultPosition)
  const [isDragging, setIsDragging] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const dragStart = useRef({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const parentRef = useRef<HTMLElement | null>(null)

  const { scrollRef, showScrollIndicator } = useScrollIndicator<HTMLDivElement>({
    threshold: 1,
    deps: [children],
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')
    const update = () => setIsDesktop(mediaQuery.matches)
    update()
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  const constrainPosition = (x: number, y: number) => {
    if (!parentRef.current || !containerRef.current) return { x, y }

    const parentRect = parentRef.current.getBoundingClientRect()

    const maxX = Math.max(0, parentRect.width - size.width)
    const maxY = Math.max(0, parentRect.height - size.height)

    return {
      x: Math.min(Math.max(x, 0), maxX),
      y: Math.min(Math.max(y, 0), maxY),
    }
  }

  const updateConstraints = () => {
    if (containerRef.current) {
      parentRef.current = containerRef.current.closest('.relative.z-10')
    }
    setPosition((p) => constrainPosition(p.x, p.y))
  }

  useEffect(() => {
    const raf = requestAnimationFrame(updateConstraints)
    window.addEventListener('resize', updateConstraints)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', updateConstraints)
    }
  }, [])

  const handlePointerDownMove = (e: PointerEvent<HTMLDivElement>) => {
    if (fixed || !isDesktop) return
    if ((e.target as HTMLElement).closest('button')) return
    updateConstraints()
    setIsDragging(true)
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: globalThis.PointerEvent) => {
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
      window.addEventListener('pointermove', handlePointerMove)
      window.addEventListener('pointerup', handlePointerUp)
      return () => {
        window.removeEventListener('pointermove', handlePointerMove)
        window.removeEventListener('pointerup', handlePointerUp)
      }
    }
  }, [isDragging])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0, transition: { delay: 1, duration: 1.5 } }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={
        isDesktop
          ? {
              position: 'absolute',
              left: position.x,
              top: position.y,
              width: size.width,
              height: size.height,
            }
          : {
              position: 'relative',
              width: '100%',
              maxWidth: size.width,
            }
      }
      className={isDesktop ? 'select-none' : 'select-none mx-auto my-3'}
    >
      <div
        ref={containerRef}
        className={` relative h-full w-full overflow-hidden rounded-xl border border-slate-700/70 ${className} flex flex-col`}
      >
        <div
          onPointerDown={handlePointerDownMove}
          className={`flex h-10 shrink-0 items-center justify-between gap-3 bg-neutral-800 px-3 ${
            isDesktop ? 'cursor-move' : ''
          }`}
        >
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-red-600">
              <X size={15} />
            </span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/90 text-amber-500/90">
              <Minus size={15} />
            </span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-green-600">
              <Maximize2 size={15} />
            </span>
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
              <div className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 animate-bounce">
                <ChevronDown size={24} className="text-slate-400/80" />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
