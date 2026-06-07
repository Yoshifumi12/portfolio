import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom/vitest'
import Experience from '../components/Experience'

vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    width,
    height,
    style,
  }: {
    src: string
    alt: string
    width: number
    height: number
    style?: React.CSSProperties
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} style={style} />
  ),
}))

vi.mock('./Section', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

vi.mock('@/components/ui/window', () => ({
  Window: ({
    children,
    title,
    className,
  }: {
    children: React.ReactNode
    title: string
    className: string
  }) => (
    <div data-testid="window" data-title={title} className={className}>
      {children}
    </div>
  ),
}))

vi.mock('@/components/ui/badge', () => ({
  Badge: ({ children, className }: { children: React.ReactNode; className: string }) => (
    <span className={className}>{children}</span>
  ),
}))

const mockExperienceData = [
  {
    windowTitle: 'Senior Developer',
    defaultPosition: { x: 100, y: 100 },
    size: { width: 600, height: 400 },
    title: 'Senior Frontend Developer',
    company: 'Tech Corp',
    badge: 'Full-time',
    description: [
      'Led development of React applications',
      'Mentored junior developers',
      'Improved performance by 40%',
    ],
    techStack: [
      { name: 'React', icon: '/react-icon.png', style: {} },
      { name: 'TypeScript', icon: '/ts-icon.png', style: {} },
    ],
  },
  {
    windowTitle: 'Junior Developer',
    defaultPosition: { x: 200, y: 200 },
    size: { width: 500, height: 300 },
    title: 'Junior Developer',
    company: 'Startup Inc',
    badge: 'Internship',
    description: ['Developed features for web app', 'Fixed bugs and improved UX'],
    techStack: [
      { name: 'Vue', icon: '/vue-icon.png', style: {} },
      { name: 'JavaScript', icon: '/js-icon.png', style: {} },
    ],
  },
]

describe('Experience', () => {
  it('renders all experience items', () => {
    render(<Experience experienceData={mockExperienceData} />)

    const windows = screen.getAllByTestId('window')
    expect(windows).toHaveLength(2)
  })

  it('renders window titles correctly', () => {
    render(<Experience experienceData={mockExperienceData} />)

    const windows = screen.getAllByTestId('window')
    expect(windows[0]).toHaveAttribute('data-title', 'Senior Developer')
    expect(windows[1]).toHaveAttribute('data-title', 'Junior Developer')
  })

  it('renders experience titles', () => {
    render(<Experience experienceData={mockExperienceData} />)

    expect(screen.getAllByText('Senior Frontend Developer')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Junior Developer')[0]).toBeInTheDocument()
  })

  it('renders company names', () => {
    render(<Experience experienceData={mockExperienceData} />)

    expect(screen.getAllByText('Tech Corp')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Startup Inc')[0]).toBeInTheDocument()
  })

  it('renders badges', () => {
    render(<Experience experienceData={mockExperienceData} />)

    expect(screen.getAllByText('Full-time')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Internship')[0]).toBeInTheDocument()
  })

  it('renders description points', () => {
    render(<Experience experienceData={mockExperienceData} />)

    expect(screen.getAllByText('Led development of React applications')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Mentored junior developers')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Improved performance by 40%')[0]).toBeInTheDocument()
  })

  it('renders tech stack badges', () => {
    render(<Experience experienceData={mockExperienceData} />)

    expect(screen.getAllByText('React')[0]).toBeInTheDocument()
    expect(screen.getAllByText('TypeScript')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Vue')[0]).toBeInTheDocument()
    expect(screen.getAllByText('JavaScript')[0]).toBeInTheDocument()
  })

  it('renders tech stack icons', () => {
    render(<Experience experienceData={mockExperienceData} />)

    // Since there are multiple renders, check that React icon exists
    const reactImages = screen.getAllByAltText('React')
    expect(reactImages.length).toBeGreaterThan(0)
    expect(reactImages[0]).toHaveAttribute('src', '/react-icon.png')

    const tsImages = screen.getAllByAltText('TypeScript')
    expect(tsImages.length).toBeGreaterThan(0)
    expect(tsImages[0]).toHaveAttribute('src', '/ts-icon.png')
  })

  it('handles empty tech stack', () => {
    const dataWithoutTechStack = [
      {
        windowTitle: 'No Tech',
        defaultPosition: { x: 100, y: 100 },
        size: { width: 600, height: 400 },
        title: 'No Tech Role',
        company: 'Simple Corp',
        badge: 'Contract',
        description: ['Simple description'],
      },
    ]

    render(<Experience experienceData={dataWithoutTechStack} />)

    // Should still render without errors
    expect(screen.getAllByText('No Tech Role')[0]).toBeInTheDocument()
  })

  it('renders without crashing', () => {
    expect(() => render(<Experience experienceData={mockExperienceData} />)).not.toThrow()
  })
})
