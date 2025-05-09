# Code Comment Rules

## Language
- All code comments must be written in English
- Use clear, concise technical language

## Style
- Comments should be neutral and focused on technical information
- Avoid colloquial language and keep a professional tone
- Begin comments with a capital letter and use proper punctuation
- Use present tense when describing code functionality

## Documentation
- Include comments for:
  - Function purpose and parameters
  - Complex logic explanations
  - Public API documentation
  - Non-obvious implementation details
- Avoid redundant comments that simply repeat what the code does

## Format
- Use `//` for single line comments
- Use `/* */` for multi-line comments
- JSDoc style (`/** */`) should be used for function and class documentation

## Example
```javascript
// Good comment: Calculate user permissions based on role and access level
calculatePermissions(role, accessLevel);

// Bad comment: This function does some calculations
doSomething();

/**
 * Validates user input and returns normalized data
 * 
 * @param {string} input - Raw user input
 * @returns {Object} Validated and normalized data object
 */
function validateUserInput(input) {
  // Check for empty input values
  if (!input.trim()) {
    return null;
  }
  
  // Apply input normalization rules
  return normalizeData(input);
}
``` 