import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom/vitest'
import Home from '../page'
import { experienceDataType } from '../types/experienceData'

vi.mock('../components/Hero', () => ({
  default: () => <div data-testid="hero">Hero Component</div>,
}))

vi.mock('../components/Experience', () => ({
  default: ({ experienceData }: { experienceData: experienceDataType[] }) => (
    <div data-testid="experience" data-items={experienceData.length}>
      Experience Component ({experienceData.length} items)
    </div>
  ),
}))

vi.mock('@/components/ui/wave-grid', () => ({
  WaveGridBackground: ({ className }: { className: string }) => (
    <div data-testid="wave-grid" className={className}>
      Wave Grid Background
    </div>
  ),
}))

vi.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      initial,
      animate,
    }: {
      children: React.ReactNode
      initial: string
      animate: string
    }) => (
      <div data-testid="motion-div" data-initial={initial} data-animate={animate}>
        {children}
      </div>
    ),
  },
}))

vi.mock('../constants/experienceData', () => ({
  experienceData: [
    { id: 1, title: 'Experience 1' },
    { id: 2, title: 'Experience 2' },
  ],
}))

vi.mock('../constants/projectsData', () => ({
  projectsData: [
    { id: 1, title: 'Project 1' },
    { id: 2, title: 'Project 2' },
    { id: 3, title: 'Project 3' },
  ],
}))

describe('Home', () => {
  it('renders without crashing', () => {
    expect(() => render(<Home />)).not.toThrow()
  })

  it('renders Hero component', () => {
    render(<Home />)
    expect(screen.getAllByTestId('hero')[0]).toBeInTheDocument()
  })

  it('renders Experience component for experience data', () => {
    render(<Home />)
    const experienceComponents = screen.getAllByTestId('experience')
    const hasTwoItems = experienceComponents.some((el) => el.getAttribute('data-items') === '2')
    expect(hasTwoItems).toBe(true)
  })

  it('renders Experience component for projects data', () => {
    render(<Home />)
    const experienceComponents = screen.getAllByTestId('experience')
    const hasThreeItems = experienceComponents.some((el) => el.getAttribute('data-items') === '3')
    expect(hasThreeItems).toBe(true)
  })

  it('renders both types of Experience instances', () => {
    render(<Home />)
    const experienceComponents = screen.getAllByTestId('experience')
    const itemsCounts = experienceComponents.map((el) => el.getAttribute('data-items'))

    expect(itemsCounts).toContain('2')
    expect(itemsCounts).toContain('3')
  })

  it('renders WaveGridBackground', () => {
    render(<Home />)
    expect(screen.getAllByTestId('wave-grid')[0]).toBeInTheDocument()
  })

  it('renders motion div with correct props', () => {
    render(<Home />)
    const motionDivs = screen.getAllByTestId('motion-div')
    expect(motionDivs[0]).toHaveAttribute('data-initial', 'hidden')
    expect(motionDivs[0]).toHaveAttribute('data-animate', 'visible')
  })

  it('applies correct container classes', () => {
    const { container } = render(<Home />)
    const mainDiv = container.firstChild
    expect(mainDiv).toHaveClass('overflow-hidden', 'w-full', 'tracking-wide', 'transition-all')
  })
})
