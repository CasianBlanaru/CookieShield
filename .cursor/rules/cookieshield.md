# CookieShield Project Rules

## Code Style
- All code comments must be in English
- Use neutral technical language in comments
- Follow the existing component structure
- Follow TypeScript and React best practices

## UI Components
- Cookie banner must be fully customizable
- Support mandatory UI elements for GDPR compliance:
  - Accept All / Reject All buttons
  - Category-based consent options
  - Detailed settings view
  - Privacy policy links
- Ensure accessibility (ARIA attributes, keyboard navigation)
- Animation effects should be subtle and professional

## Localization
- Support multilingual content (EN, DE, FR)
- Store all UI text in translation files
- Text content should be neutral and professional
- Allow for text expansion in layouts

## State Management
- Use React state for local component state
- Store settings in localStorage for persistence
- Implement API synchronization for server persistence
- Clear separation between UI state and settings

## GDPR Compliance
- Required cookie categories:
  - Necessary (always enabled)
  - Performance (optional)
  - Functional (optional)
  - Advertising (optional)
- Store consent with timestamp
- Provide access to update/revoke consent
- Include data subject rights information

## Performance
- Optimize animation effects
- Lazy load non-critical components
- Minimize unnecessary re-renders
- Optimize sticky scroll behavior

## Dashboard
- Clean, professional design
- Intuitive settings organization
- Real-time preview of banner changes
- Proper validation for all inputs

## Git Workflow
- Commit messages in English
- Follow conventional commits format
- Feature branches from develop
- Pull requests require review

## File Structure
- React components in `/components`
- Styles in global.css or component files
- API functions in `/lib/api.js`
- Types in appropriate files with interfaces 