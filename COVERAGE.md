# Coverage Report Documentation

## Overview

This project now includes comprehensive test coverage reporting using Vitest and the V8 coverage provider. Coverage reports help ensure code quality and identify untested code paths.

## Current Coverage Status

- **Overall Coverage**: 76.78%
- **Branch Coverage**: 87.71%
- **Function Coverage**: 86.36%

### File-by-File Coverage:

- `App.jsx`: 100% coverage ✅
- `ErrorBoundary.jsx`: 100% coverage ✅
- `StockPortfolioOptimizer.js`: 100% statements, 94.73% branches ✅
- `PortfolioOptimizer.jsx`: 59.45% coverage (room for improvement)
- `main.jsx`: 0% coverage (excluded from CI thresholds)

## Available Coverage Commands

### Run Tests with Coverage

```bash
npm run test:coverage
# or
npm run coverage
```

This runs all tests and displays a text-based coverage report in the terminal.

### Open Coverage Report in Browser

```bash
npm run coverage:open
```

This generates an HTML coverage report and opens it in your default browser for detailed analysis.

### Verbose Coverage Summary

```bash
npm run coverage:summary
```

Shows detailed test results along with coverage information.

## Coverage Configuration

Coverage is configured in `vite.config.js` with:

- **Provider**: V8 (fast and accurate)
- **Reporters**: text, json, html, lcov
- **Thresholds**: 80% for branches, functions, lines, and statements
- **Exclusions**: node_modules, test files, config files, dist, main.jsx

## Coverage in CI/CD

The CI/CD pipeline automatically:

1. Runs tests with coverage on every push/PR
2. Uploads coverage reports to Codecov
3. Stores coverage artifacts for 1 day
4. Comments coverage changes on pull requests

## Interpreting Coverage Reports

### HTML Report (Recommended)

- Open `coverage/index.html` in browser
- Navigate through files to see uncovered lines highlighted in red
- Green lines are covered, red lines need tests

### Terminal Report

- **% Stmts**: Percentage of statements executed
- **% Branch**: Percentage of branches taken
- **% Funcs**: Percentage of functions called
- **% Lines**: Percentage of lines executed
- **Uncovered Line #s**: Specific lines that need coverage

## Improving Coverage

To improve coverage for `PortfolioOptimizer.jsx`:

1. Add tests for error scenarios
2. Test edge cases in form validation
3. Test all user interaction paths
4. Test async loading states and results display

## Coverage Best Practices

1. **Aim for 80%+ overall coverage** (current threshold)
2. **Focus on critical business logic** first
3. **Test error handling** and edge cases
4. **Don't chase 100%** - some code may not need testing
5. **Review uncovered lines** to ensure they're not critical paths

## Troubleshooting

### Common Issues:

- **Low coverage**: Add more comprehensive tests
- **Coverage not updating**: Clear coverage cache with `rm -rf coverage`
- **HTML report not opening**: Check if `coverage/index.html` exists

### Coverage Exclusions:

Files excluded from coverage (see `vite.config.js`):

- `main.jsx` (app entry point)
- Test files (`*.test.*`, `*.spec.*`)
- Configuration files (`*.config.*`)
- Type definitions (`*.d.ts`)
- Build outputs (`dist/`, `coverage/`)

## Next Steps

1. **Increase PortfolioOptimizer coverage** to 70%+
2. **Add integration tests** for full user workflows
3. **Set up coverage trending** to track improvements over time
4. **Add coverage badges** to README for visibility
