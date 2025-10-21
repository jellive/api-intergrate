# API Integration App

Modern React TypeScript application for user management with comprehensive testing.

## Tech Stack

- **React 18.3** - Latest React with concurrent features
- **TypeScript 5.7** - Strict type checking with latest features
- **Vite 6** - Lightning fast build tool
- **Vitest 3** - Modern unit testing framework
- **Playwright 1** - Reliable E2E testing
- **Axios 1.7** - HTTP client

## Features

- Type-safe API integration with JSONPlaceholder
- Modern React patterns (Hooks, Context API)
- Comprehensive unit and E2E tests
- Strict TypeScript configuration
- TDD-ready development environment

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens the app at [http://localhost:3000](http://localhost:3000)

### Building

```bash
npm run build
```

Builds the app for production to the `build` folder with optimized bundle.

### Preview Production Build

```bash
npm run preview
```

## Testing

### Unit Tests

```bash
# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### E2E Tests

```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui
```

## Code Quality

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── api.ts              # API client functions
├── types.ts            # TypeScript type definitions
├── asyncActionUtils.ts # Async action helpers
├── useAsync.ts         # Custom async hook
├── UsersContext.tsx    # Global state management
├── Users.tsx           # Users list component
├── User.tsx            # User detail component
├── App.tsx             # Root component
└── **/*.test.tsx       # Unit tests

e2e/
└── app.spec.ts         # E2E tests
```

## Migration Notes

This project has been modernized from Create React App to Vite with the following improvements:

- Upgraded from TypeScript 3.7 → 5.7
- Upgraded from React 16 → 18
- Replaced Jest with Vitest
- Added Playwright for E2E testing
- Improved type safety (removed `any` types)
- Modern ES2022 target
- Strict TypeScript configuration

## Learn More

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vite Documentation](https://vite.dev/)
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
