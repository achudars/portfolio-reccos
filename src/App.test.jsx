import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App.jsx'

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /stock portfolio optimizer/i })).toBeInTheDocument()
  })

  it('renders budget input', () => {
    render(<App />)
    expect(screen.getByLabelText(/investment budget/i)).toBeInTheDocument()
  })

  it('renders stock input sections', () => {
    render(<App />)
    expect(screen.getByText(/stocks/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /run investment strategies/i })).toBeInTheDocument()
  })
})
