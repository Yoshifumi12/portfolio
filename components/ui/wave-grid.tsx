'use client'

import { cn } from '@/lib/utils'
import { useEffect, useRef } from 'react'

export interface WaveGridBackgroundProps {
  className?: string
  children?: React.ReactNode
  /** Grid cell size */
  gridSize?: number
  /** Wave height */
  waveHeight?: number
  /** Wave animation speed */
  waveSpeed?: number
  /** Line color (used if gradientStart/gradientEnd not provided) */
  color?: string
  /** Gradient start color */
  gradientStart?: string
  /** Gradient end color */
  gradientEnd?: string
}

export function WaveGridBackground({
  className,
  children,
  gridSize = 30,
  waveHeight = 40,
  waveSpeed = 1,
  color = '#06b6d4',
  gradientStart,
  gradientEnd,
}: WaveGridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = container.getBoundingClientRect()
    let width = rect.width
    let height = rect.height

    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)

    let animationId: number
    let tick = 0

    // Resize handler
    const handleResize = () => {
      const rect = container.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)
    }

    const ro = new ResizeObserver(handleResize)
    ro.observe(container)

    // Parse color
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? {
            r: Number.parseInt(result[1], 16),
            g: Number.parseInt(result[2], 16),
            b: Number.parseInt(result[3], 16),
          }
        : { r: 6, g: 182, b: 212 }
    }

    // Parse gradient colors if provided
    const startRgb = gradientStart ? hexToRgb(gradientStart) : null
    const endRgb = gradientEnd ? hexToRgb(gradientEnd) : null
    const useGradient = startRgb && endRgb

    // Fallback to single color
    const rgb = hexToRgb(color)

    // Get color for a specific row (for gradient)
    const getColorForRow = (row: number, rows: number) => {
      if (!useGradient) return rgb

      const t = row / rows // 0 at top, 1 at bottom
      return {
        r: Math.round(startRgb!.r * (1 - t) + endRgb!.r * t),
        g: Math.round(startRgb!.g * (1 - t) + endRgb!.g * t),
        b: Math.round(startRgb!.b * (1 - t) + endRgb!.b * t),
      }
    }

    // Get wave height at a point
    const getWaveHeight = (x: number, z: number, t: number) => {
      return (
        Math.sin(x * 0.02 + t) * Math.cos(z * 0.02 + t * 0.8) * waveHeight +
        Math.sin(x * 0.01 - t * 0.5 + z * 0.015) * waveHeight * 0.5 +
        Math.sin((x + z) * 0.008 + t * 1.2) * waveHeight * 0.3
      )
    }

    // Project 3D to 2D with perspective
    const project = (x: number, y: number, z: number) => {
      const perspective = 1600
      const cameraY = 200
      const cameraZ = -533.33

      const relZ = z - cameraZ
      const scale = perspective / (perspective + relZ)

      return {
        x: width / 2 + x * scale,
        y: height * 0.6 + (y - cameraY) * scale,
        scale,
      }
    }

    // Animation
    const animate = () => {
      tick += 0.015 * waveSpeed

      ctx.fillStyle = '#030712'
      ctx.fillRect(0, 0, width, height)

      const cols = Math.ceil(width / gridSize) + 10
      const rows = 25
      const startX = (-cols * gridSize) / 2
      const startZ = 0

      // Draw grid from back to front
      for (let row = rows - 1; row >= 0; row--) {
        const z = startZ + row * gridSize

        // Get color for this row (if using gradient)
        const rowRgb = getColorForRow(row, rows)

        // Draw horizontal line
        ctx.beginPath()
        let firstPoint = true

        for (let col = 0; col <= cols; col++) {
          const x = startX + col * gridSize
          const waveY = getWaveHeight(x, z, tick)
          const projected = project(x, waveY, z)

          if (firstPoint) {
            ctx.moveTo(projected.x, projected.y)
            firstPoint = false
          } else {
            ctx.lineTo(projected.x, projected.y)
          }
        }

        const rowBrightness = 0.2 + (1 - row / rows) * 0.6
        ctx.strokeStyle = `rgba(${rowRgb.r}, ${rowRgb.g}, ${rowRgb.b}, ${rowBrightness})`
        ctx.lineWidth = Math.max(0.5, (1 - row / rows) * 1.5)
        ctx.stroke()

        // Draw vertical lines for this row
        if (row < rows - 1) {
          for (let col = 0; col <= cols; col++) {
            const x = startX + col * gridSize

            const z1 = z
            const z2 = z + gridSize
            const waveY1 = getWaveHeight(x, z1, tick)
            const waveY2 = getWaveHeight(x, z2, tick)

            const p1 = project(x, waveY1, z1)
            const p2 = project(x, waveY2, z2)

            // Height-based brightness
            const avgHeight = (waveY1 + waveY2) / 2
            const heightBrightness = 0.3 + (avgHeight / waveHeight + 1) * 0.35
            const distBrightness = 0.2 + (1 - row / rows) * 0.6
            const brightness = heightBrightness * distBrightness

            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(${rowRgb.r}, ${rowRgb.g}, ${rowRgb.b}, ${brightness})`
            ctx.lineWidth = Math.max(0.5, (1 - row / rows) * 1.2)
            ctx.stroke()
          }
        }
      }

      // Glow overlay at peaks (use average of gradient colors if applicable)
      const glowRgb = useGradient
        ? {
            r: Math.round((startRgb!.r + endRgb!.r) / 2),
            g: Math.round((startRgb!.g + endRgb!.g) / 2),
            b: Math.round((startRgb!.b + endRgb!.b) / 2),
          }
        : rgb

      const gradient = ctx.createRadialGradient(
        width / 2,
        height * 0.5,
        0,
        width / 2,
        height * 0.5,
        width * 0.5,
      )
      gradient.addColorStop(0, `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, 0.05)`)
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
      ro.disconnect()
    }
  }, [gridSize, waveHeight, waveSpeed, color, gradientStart, gradientEnd])

  return (
    <div ref={containerRef} className={cn('fixed inset-0 overflow-hidden bg-[#030712]', className)}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Top fade */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1/3"
        style={{
          background: 'linear-gradient(to bottom, #030712 0%, transparent 100%)',
        }}
      />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 70%, transparent 0%, transparent 40%, #030712 100%)',
        }}
      />

      {/* Content layer */}
      {children && <div className="relative z-10 h-full w-full">{children}</div>}
    </div>
  )
}

export default function WaveGridBackgroundDemo() {
  return <WaveGridBackground />
}
