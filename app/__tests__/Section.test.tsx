import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'
import Section from '../components/Section'

describe('Section', () => {
  it('renders children correctly', () => {
    render(
      <Section>
        <div>Test Child Content</div>
      </Section>,
    )

    expect(screen.getByText('Test Child Content')).toBeInTheDocument()
  })

  it('renders with the correct structure', () => {
    const { container } = render(
      <Section>
        <div>Content</div>
      </Section>,
    )

    // Check for the outer div with relative class
    const outerDiv = container.firstChild
    expect(outerDiv).toHaveClass('relative')

    // Check for the nested div structure
    const innerDiv = outerDiv?.firstChild
    expect(innerDiv).toHaveClass('relative z-10 px-5 sm:px-12')

    const flexDiv = innerDiv?.firstChild
    expect(flexDiv).toHaveClass('flex min-h-[calc(100vh-74px)] flex-col justify-center')
  })

  it('renders multiple children', () => {
    render(
      <Section>
        <div>First Child</div>
        <div>Second Child</div>
        <div>Third Child</div>
      </Section>,
    )

    expect(screen.getByText('First Child')).toBeInTheDocument()
    expect(screen.getByText('Second Child')).toBeInTheDocument()
    expect(screen.getByText('Third Child')).toBeInTheDocument()
  })

  it('applies responsive padding classes', () => {
    const { container } = render(
      <Section>
        <div>Content</div>
      </Section>,
    )

    const innerDiv = container.firstChild?.firstChild
    expect(innerDiv).toHaveClass('px-5', 'sm:px-12')
  })
})
