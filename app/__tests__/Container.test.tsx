import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import '@testing-library/jest-dom/vitest'
import Container from '../components/Container'

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
      <div {...props}>{children}</div>
    ),
  },
}))

vi.mock('lucide-react', () => ({
  ChevronDown: () => <div data-testid="chevron-down">ChevronDown</div>,
  House: () => <div data-testid="house">House</div>,
  Minimize2: () => <div data-testid="minimize2">Minimize2</div>,
  X: () => <div data-testid="x">X</div>,
}))

describe('Container', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders children', () => {
    render(
      <Container>
        <div>Test Child</div>
      </Container>,
    )

    expect(screen.getByText('Test Child')).toBeInTheDocument()
  })

  it('renders the title', () => {
    render(
      <Container>
        <div>Child</div>
      </Container>,
    )
    expect(screen.getAllByText('--yoshi')[0]).toBeInTheDocument()
  })

  it('renders window buttons', () => {
    render(
      <Container>
        <div>Child</div>
      </Container>,
    )

    expect(screen.getAllByTestId('x')[0]).toBeInTheDocument()
    expect(screen.getAllByTestId('minimize2')[0]).toBeInTheDocument()
    expect(screen.getAllByTestId('house')[0]).toBeInTheDocument()
  })
})
