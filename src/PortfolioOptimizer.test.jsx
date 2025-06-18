import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PortfolioOptimizer from './PortfolioOptimizer'

// Mock the StockPortfolioOptimizer class
vi.mock('./StockPortfolioOptimizer', () => {
  return {
    default: vi.fn().mockImplementation((budget) => ({
      budget,
      stocks: [],
      addStock: vi.fn(function(name, price, performance) {
        this.stocks.push({
          name,
          price,
          performance,
          roi: performance / 100,
          finalValue: price * (1 + performance / 100),
          maxShares: Math.floor(budget / price)
        })
      }),
      getDetailedResults: vi.fn(() => ({
        stockAnalysis: [
          {
            rank: 1,
            name: 'Test Stock',
            price: 100,
            performance: 150,
            roi: 1.5,
            finalValue: 250,
            maxShares: 100
          }
        ],
        strategies: [
          {
            name: 'Pure Performance Strategy',
            allocation: [
              {
                stock: { name: 'Test Stock', price: 100 },
                shares: 10,
                cost: 1000,
                finalValue: 2500
              }
            ],
            performance: {
              cost: 1000,
              finalValue: 2500,
              profit: 1500,
              roi: 150
            },
            remainingBudget: 19000
          }
        ],
        recommendation: 'Pure Performance'
      }))
    }))
  }
})

// Mock window.alert
const mockAlert = vi.fn()
window.alert = mockAlert

describe('PortfolioOptimizer', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the main title', () => {
    render(<PortfolioOptimizer />)
    expect(screen.getByRole('heading', { name: /stock portfolio optimizer/i })).toBeInTheDocument()
  })

  it('renders budget input with default value', () => {
    render(<PortfolioOptimizer />)
    const budgetInput = screen.getByLabelText(/investment budget/i)
    expect(budgetInput).toBeInTheDocument()
    expect(budgetInput).toHaveValue(20000)
  })

  it('updates budget when input changes', async () => {
    const user = userEvent.setup()
    render(<PortfolioOptimizer />)
    
    const budgetInput = screen.getByLabelText(/investment budget/i)
    await user.clear(budgetInput)
    await user.type(budgetInput, '50000')
    
    expect(budgetInput).toHaveValue(50000)
  })

  it('renders initial stocks with default values', () => {
    render(<PortfolioOptimizer />)
    
    // Check that default stocks are rendered
    expect(screen.getByDisplayValue('Stock A')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Stock B')).toBeInTheDocument()
    expect(screen.getByDisplayValue('393')).toBeInTheDocument()
    expect(screen.getByDisplayValue('179')).toBeInTheDocument()
  })

  it('adds a new stock when add button is clicked', async () => {
    const user = userEvent.setup()
    render(<PortfolioOptimizer />)
    
    const addButton = screen.getByRole('button', { name: /add stock/i })
    await user.click(addButton)
    
    // Should have 6 stocks now (5 default + 1 new)
    const stockRows = screen.getAllByPlaceholderText('e.g., AAPL')
    expect(stockRows).toHaveLength(6)
  })

  it('removes a stock when remove button is clicked', async () => {
    const user = userEvent.setup()
    render(<PortfolioOptimizer />)
    
    // Get initial count of remove buttons
    const initialRemoveButtons = screen.getAllByText('Remove')
    const initialCount = initialRemoveButtons.length
    
    // Click the first remove button
    await user.click(initialRemoveButtons[0])
    
    // Should have one less remove button now
    const updatedRemoveButtons = screen.getAllByText('Remove')
    expect(updatedRemoveButtons).toHaveLength(initialCount - 1)
  })

  it('updates stock price when input changes', async () => {
    const user = userEvent.setup()
    render(<PortfolioOptimizer />)
    
    const priceInput = screen.getByDisplayValue('393')
    await user.clear(priceInput)
    await user.type(priceInput, '150')
    
    expect(priceInput).toHaveValue(150)
  })

  it('shows alert when no valid stocks are provided', async () => {
    const user = userEvent.setup()
    render(<PortfolioOptimizer />)
    
    // Clear all stock names to make them invalid
    const stockNameInputs = screen.getAllByPlaceholderText('e.g., AAPL')
    for (const input of stockNameInputs) {
      await user.clear(input)
    }
    
    const runButton = screen.getByRole('button', { name: /run investment strategies/i })
    await user.click(runButton)
    
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('Please add at least one valid stock')
    }, { timeout: 1000 })
  })

  it('handles budget input with invalid values', async () => {
    const user = userEvent.setup()
    render(<PortfolioOptimizer />)
    
    const budgetInput = screen.getByLabelText(/investment budget/i)
    await user.clear(budgetInput)
    await user.type(budgetInput, 'invalid')
    
    expect(budgetInput).toHaveValue(0)
  })
})