export type experienceDataType = {
  windowTitle: string
  defaultPosition: { x: number; y: number }
  size: { width: number; height: number }
  title: string
  company: string
  description: string[]
  badge: string
  techStack?: {
    name: string
    icon: string
    style?: React.CSSProperties
  }[]
  links?: {
    label: string
    url: string
    icon?: string
    style?: React.CSSProperties
  }[]
}
