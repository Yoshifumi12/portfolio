import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom/vitest'
import Hero from '../components/Hero'
import { MouseEventHandler } from 'react'

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    target,
  }: {
    children: React.ReactNode
    href: string
    target: string
  }) => (
    <a href={href} target={target}>
      {children}
    </a>
  ),
}))

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
      <div {...props}>{children}</div>
    ),
  },
}))

vi.mock('lucide-react', () => ({
  FileUser: () => <div data-testid="file-user">FileUser</div>,
}))

vi.mock('react-social-icons', () => ({
  SocialIcon: ({ url }: { url: string }) => (
    <div data-testid={`social-icon-${url}`}>SocialIcon</div>
  ),
}))

vi.mock('./Section', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

vi.mock('@/components/ui/window', () => ({
  Window: ({ children, title }: { children: React.ReactNode; title: string }) => (
    <div data-testid="window" data-title={title}>
      {children}
    </div>
  ),
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({
    children,
    onClick,
    className,
  }: {
    children: React.ReactNode
    onClick: MouseEventHandler<HTMLButtonElement> | undefined
    className: string
  }) => (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  ),
}))

vi.mock('../constants/heroData', () => ({
  heroData: {
    name: 'John Doe',
    description: 'Test description',
    socialUrls: ['https://github.com/test', 'https://twitter.com/test'],
    resumeUrl: '/resume.pdf',
  },
}))

describe('Hero', () => {
  it('renders the name', () => {
    render(<Hero />)
    expect(screen.getAllByText('John Doe')[0]).toBeInTheDocument()
  })

  it('renders the greeting', () => {
    render(<Hero />)
    expect(screen.getAllByText('Hi, I am')[0]).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<Hero />)
    expect(screen.getAllByText('Test description')[0]).toBeInTheDocument()
  })

  it('renders social buttons', () => {
    render(<Hero />)
    expect(screen.getAllByTestId('social-icon-https://github.com/test')[0]).toBeInTheDocument()
    expect(screen.getAllByTestId('social-icon-https://twitter.com/test')[0]).toBeInTheDocument()
  })

  it('renders resume button with link', () => {
    render(<Hero />)
    const resumeButtons = screen.getAllByText('Resume')
    const resumeLink = resumeButtons[0].closest('a')
    expect(resumeLink).toHaveAttribute('href', '/resume.pdf')
    expect(resumeLink).toHaveAttribute('target', '_blank')
  })

  it('renders the window with correct title', () => {
    render(<Hero />)
    const windows = screen.getAllByTestId('window')
    expect(windows[0]).toHaveAttribute('data-title', 'profile')
  })
})
