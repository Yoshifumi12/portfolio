'use client'
import Experience from './components/Experience'
import Hero from './components/Hero'
import { WaveGridBackground } from '@/components/ui/wave-grid'
import { motion } from 'framer-motion'
import { experienceData } from './constants/experienceData'
import { projectsData } from './constants/projectsData'

const backgroundVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.5, duration: 1 } },
}

export default function Home() {
  return (
    <div className="overflow-hidden w-full tracking-wide transition-all">
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
      <Hero />
      <Experience experienceData={experienceData} />
      <Experience experienceData={projectsData} />
    </div>
  )
}
