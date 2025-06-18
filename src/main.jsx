import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

console.log('main.jsx is loading')

const rootElement = document.getElementById('root')
console.log('Root element:', rootElement)

if (rootElement) {
  const root = createRoot(rootElement)
  console.log('Root created, rendering App')
  root.render(<App />)
} else {
  console.error('Root element not found!')
}
