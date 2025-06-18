import PortfolioOptimizer from './PortfolioOptimizer'
import ErrorBoundary from './ErrorBoundary'
import './App.css'

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <PortfolioOptimizer />
      </ErrorBoundary>
    </div>
  )
}

export default App
