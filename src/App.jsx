import PortfolioOptimizer from './PortfolioOptimizer'
import ErrorBoundary from './ErrorBoundary'
import './App.css'

function App() {
  console.log('App component is rendering')
  
  return (
    <div className="App">
      <h1 style={{ color: 'white', textAlign: 'center', padding: '20px' }}>
        Debug: App is loading...
      </h1>
      <ErrorBoundary>
        <PortfolioOptimizer />
      </ErrorBoundary>
    </div>
  )
}

export default App
