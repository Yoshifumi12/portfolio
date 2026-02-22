'use client'
import Section from './Section'
import { Window } from '@/components/ui/window'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { experienceData } from '../constants/experienceData'

export default function Experience() {
  return (
    <Section>
      {experienceData.map((experience, index) => (
        <Window
          key={index}
          title={experience.windowTitle}
          defaultPosition={experience.defaultPosition}
          size={experience.size}
          className="shadow-2xl backdrop-blur-sm"
        >
          <div className="flex flex-col px-2">
            <div className="flex flex-col space-y-1.5 p-2">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-1">
                  <h1 className="text-xl font-bold">{experience.title}</h1>
                  <div className="text-slate-300 font-medium">{experience.company}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-gray-700">{experience.badge}</Badge>
                </div>
              </div>
              <div className="p-6 pt-0 space-y-6">
                <ul className="list-disc text-slate-300">
                  {experience.description.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
                {experience.techStack && (
                  <div className="flex flex-wrap gap-2">
                    {experience.techStack.map((tech, index) => (
                      <Badge key={index} className="text-white">
                        <Image src={tech.icon} alt={tech.name} width={24} height={24} />
                        {tech.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Window>
      ))}
    </Section>
  )
}
