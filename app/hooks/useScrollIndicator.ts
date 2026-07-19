'use client'

import { useEffect, useRef, useState } from 'react'

export function useScrollIndicator<T extends HTMLElement>({
  threshold = 1,
  deps = [],
}: { threshold?: number; deps?: unknown[] } = {}) {
  const scrollRef = useRef<T>(null)
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const check = () =>
      setShowScrollIndicator(el.scrollTop + el.clientHeight < el.scrollHeight - threshold)

    check()
    el.addEventListener('scroll', check)
    window.addEventListener('resize', check)
    const timer = setTimeout(check, 300)

    return () => {
      el.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
      clearTimeout(timer)
    }
  }, deps)

  return { scrollRef, showScrollIndicator }
}
