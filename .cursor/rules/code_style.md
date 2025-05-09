# Code Style Rules

## General
- All code comments and documentation must be in English
- Use neutral technical language in comments
- Follow explicit over implicit patterns
- Maintain consistency with existing code patterns
- Keep functions small and focused on a single task
- Use meaningful variable and function names

## JavaScript/TypeScript
- Use ES6+ syntax (arrow functions, destructuring, etc.)
- Prefer const over let, avoid var
- Use async/await over Promises where possible
- Add TypeScript types for all functions and components
- Use appropriate TypeScript interfaces and types
- Use JSDoc comments for complex functions

## React Components
- Use functional components with hooks
- Mark client components with 'use client' directive
- Keep components focused on a single responsibility
- Use proper prop typing with TypeScript interfaces
- Follow naming conventions:
  - Component files: PascalCase.js/tsx (e.g., BannerPreview.js)
  - Utility functions: camelCase.js (e.g., fetchSettings.js)
- Extract complex logic to custom hooks

## CSS and Styling
- Use Tailwind CSS for styling
- Follow utility-first approach
- Extract common patterns to custom Tailwind classes when needed
- Use responsive design patterns consistently
- Maintain consistent color scheme following design tokens
- Use CSS variables for theming

## Next.js
- Follow Next.js best practices for routing
- Optimize image loading with next/image
- Implement proper error handling and loading states
- Use Server Components where appropriate

## Error Handling
- Implement proper error boundaries
- Use try/catch blocks for async operations
- Display user-friendly error messages
- Log errors for debugging

## Formatting
- Use consistent indentation (2 spaces)
- Limit line length to 100 characters
- Use semicolons consistently
- Place opening braces on the same line
- Use proper spacing around operators
- Use trailing commas in multiline arrays and objects

## Example
```javascript
// Good
const handleSettingsChange = async (settings) => {
  try {
    // Update local state immediately for responsive UI
    setLocalSettings(settings);
    
    // Persist to server in background
    await saveSettingsToServer(settings);
    
    // Confirm success to user
    showToast('Settings saved successfully');
  } catch (error) {
    // Handle error case
    console.error('Failed to save settings:', error);
    showToast('Failed to save settings', 'error');
  }
};

// Bad
function handle_settings(s) {
  setLocalSettings(s);
  saveSettingsToServer(s).then(() => {
    showToast('Settings saved successfully');
  }).catch((e) => {
    console.log('error', e);
    showToast('Failed to save settings', 'error');
  });
}
``` 