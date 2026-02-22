'use client'
import { Button } from '@/components/ui/button'
import { FileUser } from 'lucide-react'
import Link from 'next/link'
import { SocialIcon } from 'react-social-icons'
import { motion } from 'framer-motion'
import Section from './Section'
import { Window } from '@/components/ui/window'
import { socialUrls } from '../constants/socialUrls'

const textVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { delay: 1.5, duration: 1.5 } },
}

export default function Hero() {
  return (
    <Section>
      <Window
        title="profile"
        size={{ width: 510, height: 380 }}
        defaultPosition={{ x: 30, y: 200 }}
      >
        <motion.div initial="hidden" animate="visible" variants={textVariants}>
          <div className="flex flex-col px-5 pt-1">
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
                  tabIndex={-1}
                >
                  <SocialIcon
                    fgColor="currentColor"
                    url={url}
                    borderRadius="0"
                    bgColor="transparent"
                    target="_blank"
                    tabIndex={-1}
                  />
                </Button>
              ))}
              <Link
                href="https://drive.google.com/file/d/12jmZ48P1xITUnbGQqG1SWlHasqqFldJj/view?usp=sharing"
                target="_blank"
                tabIndex={-1}
              >
                <Button
                  className="sm:min-w-40 min-w-67 cursor-pointer border hover:bg-white hover:text-black"
                  variant="ghost"
                  tabIndex={-1}
                >
                  <FileUser width={24} height={24} className="size-6!" />
                  Resume
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </Window>
    </Section>
  )
}
