# 🤝 Contributing to SeismoSphere

Thank you for your interest in contributing to SeismoSphere! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Code Style](#code-style)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [Feature Requests](#feature-requests)

## 📜 Code of Conduct

This project adheres to the Contributor Covenant Code of Conduct. By participating, you are expected to uphold this code.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Git

### Development Setup

1. **Fork the repository**
   ```bash
   # Clone your fork
   git clone https://github.com/yourusername/seismosphere.git
   cd seismosphere
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Development Setup

### Environment Configuration

Create a `.env.local` file for local development:

```env
# Optional: Custom USGS API endpoint
NEXT_PUBLIC_USGS_API_URL=https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson

# Optional: Custom refresh interval (in milliseconds)
NEXT_PUBLIC_REFRESH_INTERVAL=300000
```

### Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript type checking
```

## 📝 Code Style

### TypeScript

- Use TypeScript for all new code
- Provide proper type definitions
- Use interfaces for object shapes
- Prefer `const` over `let` when possible

### React Components

```typescript
// ✅ Good
interface EarthquakeProps {
  magnitude: number;
  depth: number;
  location: string;
}

const EarthquakeMarker: React.FC<EarthquakeProps> = ({
  magnitude,
  depth,
  location
}) => {
  // Component logic
};

// ❌ Avoid
const EarthquakeMarker = (props: any) => {
  // Component logic
};
```

### CSS/Styling

- Use Tailwind CSS for styling
- Follow utility-first approach
- Use CSS custom properties for theming
- Keep animations performant

### File Naming

- Use kebab-case for file names
- Use PascalCase for component names
- Use camelCase for variables and functions

## 🧪 Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Writing Tests

```typescript
// Example test structure
describe('EarthquakeMarker', () => {
  it('should render with correct magnitude', () => {
    // Test implementation
  });

  it('should handle click events', () => {
    // Test implementation
  });
});
```

## 🔄 Pull Request Process

### Before Submitting

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Run linting** and fix issues
4. **Test locally** to ensure everything works

### PR Guidelines

1. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes**
   - Write clear, descriptive commit messages
   - Use conventional commits format

3. **Test your changes**
   ```bash
   pnpm lint
   pnpm type-check
   pnpm test
   ```

4. **Submit your PR**
   - Use the PR template
   - Describe your changes clearly
   - Link related issues

### Commit Message Format

Use conventional commits:

```
type(scope): description

feat(globe): add earthquake depth visualization
fix(api): resolve data fetching timeout
docs(readme): update installation instructions
style(ui): improve button hover states
refactor(utils): simplify data processing logic
test(components): add unit tests for EarthquakeMarker
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test additions/changes
- `chore`: Build/tooling changes

## 🐛 Reporting Issues

### Bug Reports

When reporting bugs, please include:

1. **Clear description** of the issue
2. **Steps to reproduce**
3. **Expected vs actual behavior**
4. **Environment details** (OS, browser, version)
5. **Screenshots** if applicable

### Issue Template

```markdown
## Bug Description
Brief description of the issue

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Environment
- OS: [e.g. Windows 10, macOS 12]
- Browser: [e.g. Chrome 120, Firefox 115]
- Version: [e.g. 1.0.0]

## Additional Context
Any other context about the problem
```

## 💡 Feature Requests

### Suggesting Features

When suggesting features:

1. **Describe the feature** clearly
2. **Explain the use case** and benefits
3. **Consider implementation** complexity
4. **Check existing issues** for duplicates

### Feature Request Template

```markdown
## Feature Description
Brief description of the feature

## Use Case
How this feature would be used

## Benefits
Why this feature would be valuable

## Implementation Ideas
Any thoughts on how to implement

## Additional Context
Any other relevant information
```

## 🏷️ Labels

We use labels to categorize issues and PRs:

- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements to documentation
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed
- `priority: high`: High priority items
- `priority: low`: Low priority items

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: support@seismosphere.com

## 🙏 Recognition

Contributors will be recognized in:

- Project README
- Release notes
- Contributor hall of fame

## 📄 License

By contributing to SeismoSphere, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to SeismoSphere! 🌍✨ 