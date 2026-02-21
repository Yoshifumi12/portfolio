'use client'
import { Button } from '@/components/ui/button'
import { WaveGridBackground } from '@/components/ui/wave-grid'
import { FileUser } from 'lucide-react'
import Link from 'next/link'
import { SocialIcon } from 'react-social-icons'
import { motion } from 'framer-motion'

const textVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 1.5 } },
}

const socialUrls = [
  'https://github.com/Yoshifumi12',
  'https://www.linkedin.com/in/yoshifumi-suzuki-780310264/',
  'mailto:yoshifumisuzuki.ys@gmail.com',
]

export default function Hero() {
  return (
    <div className="relative">
      <WaveGridBackground
        className="absolute inset-0 z-0"
        gridSize={15}
        waveHeight={150}
        waveSpeed={0.5}
        gradientStart="#2563eb"
        gradientEnd="#4f46e5"
      />
      <div className="relative z-10 px-5 sm:px-12">
        <motion.div initial="hidden" animate="visible" variants={textVariants}>
          <div className="flex min-h-[calc(100vh-4rem)] flex-col justify-center">
            <div className="text-lg text-slate-300 font-medium tracking-tight">Hi, I am</div>
            <div className="text-7xl font-medium tracking-tight">Yoshifumi Suzuki</div>
            <div className="mt-4 max-w-xl leading-relaxed text-slate-300">
              I am a curious and dedicated problem-solver who enjoys continuous learning, thriving
              in the JavaScript ecosystem while staying open and enthusiastic about other
              technologies.
            </div>
            <div className="flex flex-wrap mt-4 gap-2 sm:gap-x-4 max-w-xl">
              {socialUrls.map((url) => (
                <Button
                  className="cursor-pointer border  hover:bg-white hover:text-black"
                  key={url}
                >
                  <SocialIcon
                    fgColor="currentColor"
                    url={url}
                    borderRadius="0"
                    bgColor="transparent"
                    target="_blank"
                  />
                </Button>
              ))}
              <Link
                href="https://drive.google.com/file/d/12jmZ48P1xITUnbGQqG1SWlHasqqFldJj/view?usp=sharing"
                target="_blank"
              >
                <Button
                  className="sm:min-w-40 cursor-pointer border hover:bg-white hover:text-black"
                  variant="ghost"
                >
                  <FileUser width={24} height={24} className="size-6!" />
                  Resume
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
