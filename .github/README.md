# GitHub Actions Configuration

This directory contains the GitHub Actions workflows for the Portfolio Reccos project.

## Workflows

### 🔄 CI/CD Pipeline (`ci-cd.yml`)

- **Triggers**: Push to main/develop, Pull requests to main
- **Jobs**:
  - **Test**: Runs on Node.js 18.x and 20.x
    - Installs dependencies
    - Runs linting
    - Executes tests
    - Builds the project
    - Uploads build artifacts
  - **Deploy**: Deploys to GitHub Pages (main branch only)

### 🔒 Security & Dependencies (`security.yml`)

- **Triggers**: Weekly schedule (Mondays), Push/PR to main
- **Jobs**:
  - **Security Audit**: Checks for vulnerabilities
  - **Dependency Review**: Reviews new dependencies in PRs
  - **CodeQL Analysis**: Static code analysis for security issues

### 📦 Update Dependencies (`update-deps.yml`)

- **Triggers**: Weekly schedule (Sundays), Manual trigger
- **Jobs**:
  - **Update Dependencies**: Automatically updates dependencies and creates PRs

### 🚀 Release (`release.yml`)

- **Triggers**: Git tags matching `v*.*.*`
- **Jobs**:
  - **Create Release**: Builds, tests, and creates GitHub releases

## Status Badges

Add these badges to your README.md:

```markdown
[![CI/CD](https://github.com/achudars/portfolio-reccos/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/achudars/portfolio-reccos/actions/workflows/ci-cd.yml)
[![Security](https://github.com/achudars/portfolio-reccos/actions/workflows/security.yml/badge.svg)](https://github.com/achudars/portfolio-reccos/actions/workflows/security.yml)
```

## Setup Instructions

1. **GitHub Pages**: Enable GitHub Pages in repository settings, set source to "GitHub Actions"
2. **Secrets**: No additional secrets required for basic setup
3. **Permissions**: Ensure Actions have read/write permissions for repository

## Manual Triggers

- **Update Dependencies**: Go to Actions → Update Dependencies → Run workflow
- **Security Scan**: Runs automatically but can be triggered manually
