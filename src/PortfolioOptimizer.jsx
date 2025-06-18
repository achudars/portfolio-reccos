import { useState } from 'react'
import StockPortfolioOptimizer from './StockPortfolioOptimizer'
import './PortfolioOptimizer.css'

const PortfolioOptimizer = () => {
  console.log('PortfolioOptimizer component is rendering')
  
  const [budget, setBudget] = useState(20000)
  const [stocks, setStocks] = useState([
    { name: 'Stock A', price: 393, performance: 179 },
    { name: 'Stock B', price: 4421, performance: 284 },
    { name: 'Stock C', price: 225, performance: 239 },
    { name: 'Stock D', price: 10837, performance: 188 },
    { name: 'Stock E', price: 8413, performance: 285 }
  ])
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const addStock = () => {
    setStocks([...stocks, { name: '', price: 0, performance: 0 }])
  }

  const removeStock = (index) => {
    setStocks(stocks.filter((_, i) => i !== index))
  }

  const updateStock = (index, field, value) => {
    const updatedStocks = [...stocks]
    updatedStocks[index][field] = field === 'name' ? value : parseFloat(value) || 0
    setStocks(updatedStocks)
  }

  const runOptimization = () => {
    setLoading(true)
    
    // Simulate async operation for better UX
    setTimeout(() => {
      const optimizer = new StockPortfolioOptimizer(budget)
      
      stocks.forEach(stock => {
        if (stock.name && stock.price > 0 && stock.performance >= 0) {
          optimizer.addStock(stock.name, stock.price, stock.performance)
        }
      })

      if (optimizer.stocks.length === 0) {
        alert('Please add at least one valid stock')
        setLoading(false)
        return
      }

      const detailedResults = optimizer.getDetailedResults()
      setResults(detailedResults)
      setLoading(false)
    }, 500)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount)
  }

  return (
    <div className="portfolio-optimizer">
      <h1>Stock Portfolio Optimizer</h1>
      
      <div className="budget-section">
        <label htmlFor="budget">Investment Budget:</label>
        <input
          id="budget"
          type="number"
          value={budget}
          onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
          min="0"
          step="100"
        />
        <span className="currency">GBP</span>
      </div>

      <div className="stocks-section">
        <h2>Stocks</h2>
        <div className="stocks-header">
          <span>Stock Name</span>
          <span>Price (£)</span>
          <span>10-Year Performance (%)</span>
          <span>Actions</span>
        </div>
          {stocks.map((stock, index) => (
          <div key={`stock-${index}-${stock.name || 'empty'}`} className="stock-row">
            <input
              type="text"
              placeholder="e.g., AAPL"
              value={stock.name}
              onChange={(e) => updateStock(index, 'name', e.target.value)}
            />
            <input
              type="number"
              placeholder="0"
              value={stock.price || ''}
              onChange={(e) => updateStock(index, 'price', e.target.value)}
              min="0"
              step="0.01"
            />
            <input
              type="number"
              placeholder="0"
              value={stock.performance || ''}
              onChange={(e) => updateStock(index, 'performance', e.target.value)}
              min="0"
              step="0.1"
            />
            <button
              onClick={() => removeStock(index)}
              className="remove-btn"
              disabled={stocks.length <= 1}
            >
              Remove
            </button>
          </div>
        ))}
        
        <button onClick={addStock} className="add-stock-btn">
          Add Stock
        </button>
      </div>

      <div className="optimize-section">
        <button
          onClick={runOptimization}
          className="optimize-btn"
          disabled={loading || stocks.length === 0}
        >
          {loading ? 'Optimizing...' : 'Run Investment Strategies'}
        </button>
      </div>

      {results && (
        <div className="results-section">
          <h2>Investment Analysis Results</h2>
          
          {/* Stock Analysis */}
          <div className="stock-analysis">
            <h3>Stock Performance Ranking</h3>
            <div className="stock-analysis-grid">
              {results.stockAnalysis.map((stock) => (
                <div key={stock.name} className="stock-card">
                  <div className="stock-rank">#{stock.rank}</div>
                  <div className="stock-info">
                    <h4>{stock.name}</h4>
                    <p>Price: {formatCurrency(stock.price)}</p>
                    <p>Performance: {stock.performance}%</p>
                    <p>Max Shares: {stock.maxShares}</p>
                    <p>Future Value: {formatCurrency(stock.finalValue)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategy Results */}
          <div className="strategies-section">
            <h3>Investment Strategies</h3>            {results.strategies.map((strategy, index) => (
              <div key={`strategy-${strategy.name}`} className="strategy-card">
                <h4>{strategy.name}</h4>
                
                <div className="allocation-section">
                  <h5>Stock Allocation:</h5>                  {strategy.allocation.map((item, i) => (
                    <div key={`${strategy.name}-${item.stock.name}-${i}`} className="allocation-item">
                      <span className="stock-name">{item.stock.name}</span>
                      <span className="shares">{item.shares} shares</span>
                      <span className="cost">{formatCurrency(item.cost)}</span>
                      <span className="future-value">→ {formatCurrency(item.finalValue)}</span>
                    </div>
                  ))}
                </div>

                <div className="strategy-summary">
                  <div className="summary-item">
                    <span>Total Investment:</span>
                    <span>{formatCurrency(strategy.performance.cost)}</span>
                  </div>
                  <div className="summary-item">
                    <span>Remaining Budget:</span>
                    <span>{formatCurrency(strategy.remainingBudget)}</span>
                  </div>
                  <div className="summary-item">
                    <span>Future Value (10 years):</span>
                    <span>{formatCurrency(strategy.performance.finalValue)}</span>
                  </div>
                  <div className="summary-item profit">
                    <span>Total Profit:</span>
                    <span>{formatCurrency(strategy.performance.profit)}</span>
                  </div>
                  <div className="summary-item roi">
                    <span>Overall ROI:</span>
                    <span>{strategy.performance.roi.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recommendation */}
          <div className="recommendation-section">
            <h3>🎯 Recommendation</h3>
            <p>
              Based on maximum returns, the <strong>{results.recommendation}</strong> strategy is optimal.
              However, consider diversification for risk management.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default PortfolioOptimizer
