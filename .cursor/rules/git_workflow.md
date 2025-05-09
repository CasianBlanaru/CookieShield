# Git Workflow Rules

## Commit Messages
- All commit messages must be in English
- Follow the conventional commits format: `type(scope): message`
- Available types:
  - `feat`: New feature
  - `fix`: Bug fix
  - `docs`: Documentation changes
  - `style`: Formatting, missing semicolons, etc.
  - `refactor`: Code change that neither fixes a bug nor adds a feature
  - `perf`: Performance improvements
  - `test`: Adding or updating tests
  - `chore`: Updating build tasks, package manager configs, etc.
- Keep the message clear and concise (max 72 characters)
- Use present tense, imperative mood ("Add feature" not "Added feature")
- First letter capitalized

## Branching Strategy
- Main branches:
  - `main`: Production-ready code
  - `develop`: Integration branch for features
- Feature branches:
  - Format: `feature/descriptive-name`
  - Branch from: `develop`
  - Merge to: `develop` (via pull request)
- Bugfix branches:
  - Format: `bugfix/issue-description`
  - Branch from: `develop` (or `main` for hotfixes)
  - Merge to: Branch it came from

## Pull Requests
- Should reference related issues
- Include a clear description of changes
- Must pass all automated checks
- Require at least one code review

## Example Commit Messages
```
feat(banner): add sticky scroll animation
fix(authentication): resolve token expiration issue
docs(readme): update installation instructions
style(components): apply consistent formatting
refactor(api): simplify data fetching logic
perf(images): optimize banner preview loading
test(validation): add tests for form validation
chore(deps): update dependencies
``` 