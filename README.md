# portfolio-reccos

A stock portfolio optimization application built with React and Vite. This tool helps you analyze investment strategies and optimize stock allocations based on your budget and stock performance projections.

## Features

- **Interactive Stock Input**: Add multiple stocks with customizable names, prices, and 10-year performance projections
- **Investment Budget Configuration**: Set your investment budget dynamically
- **Dual Strategy Analysis**:
  - Pure Performance Strategy (maximizes returns)
  - Diversified Strategy (balances risk and returns)
- **Comprehensive Results**:
  - Stock performance ranking
  - Detailed allocation breakdown
  - ROI calculations and profit projections
  - Strategic recommendations

## Getting Started

### Development

```bash
npm run dev
```

### Testing

```bash
npm test          # Run tests in watch mode
npm run test:run  # Run tests once
npm run test:ui   # Run tests with UI
```

### Build

```bash
npm run build
npm run preview
```

## Usage

1. Set your investment budget in GBP
2. Add stocks with their current price and expected 10-year performance percentage
3. Click "Run Investment Strategies" to analyze optimal allocations
4. Review the results including stock rankings, allocation strategies, and recommendations

## Changelog

### 2025-06-18

- **feat**: initialize Vite project with React support
- **feat**: add Vitest testing framework with jsdom environment
- **feat**: configure testing libraries (@testing-library/react, @testing-library/jest-dom, @testing-library/user-event)
- **feat**: create basic React app structure with counter component
- **feat**: add test setup with global cleanup and jest-dom matchers
- **test**: add sample tests for App component functionality
- **build**: configure Vite and Vitest configurations
- **build**: add npm scripts for development, testing, and building
- **chore**: add .gitignore for Node.js project
- **docs**: create comprehensive README with setup instructions
- **chore**: bump version to 0.1.0 - initial project setup complete
- **feat**: integrate StockPortfolioOptimizer class for investment analysis
- **feat**: create comprehensive UI with stock input forms and budget configuration
- **feat**: add dual investment strategy analysis (Pure Performance vs Diversified)
- **feat**: implement detailed results display with stock rankings and allocation breakdown
- **style**: add modern responsive CSS styling with gradient backgrounds
- **test**: update tests for new portfolio optimizer functionality
- **test**: add comprehensive unit tests for StockPortfolioOptimizer class
- **refactor**: replace placeholder counter app with portfolio optimization tool
- **chore**: bump version to 0.2.0 - portfolio optimizer implementation complete
