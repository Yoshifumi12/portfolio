'use client'
import { WaveGridBackground } from '@/components/ui/wave-grid'
import { motion } from 'framer-motion'

const backgroundVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.5, duration: 1 } },
}

export default function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <motion.div initial="hidden" animate="visible" variants={backgroundVariants}>
        <WaveGridBackground
          className="absolute inset-0 z-0"
          gridSize={10}
          waveHeight={150}
          waveSpeed={0.5}
          gradientStart="#2563eb"
          gradientEnd="#4f46e5"
        />
      </motion.div>
      <div className="relative z-10 px-5 sm:px-12">
        <div className="flex min-h-[calc(100vh-74px)] flex-col justify-center">{children}</div>
      </div>
    </div>
  )
}
