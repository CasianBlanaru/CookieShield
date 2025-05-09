# Localization Rules

## Structure
- All user-facing text must be structured for easy localization
- Use translation keys in JSON format
- Keep strings externalized from code

## Naming Conventions
- Use hierarchical keys: `section.subsection.element`
- Example: `cookie_banner.privacy.accept_button`
- Keep key names in snake_case for consistency

## Default Language
- English is the source language
- English text must be neutral and clear

## Supported Languages
- English (en)
- German (de)
- French (fr)

## Translation Process
- New text should be added to the English translation file first
- Maintain the same structure across all language files
- Avoid hardcoding text directly in components

## Special Considerations
- Allow for text expansion in layouts (some languages require more space)
- Ensure date formats, numbers, and currencies follow local conventions
- RTL (Right-to-Left) languages should be supported in the layout

## Example Structure
```json
{
  "cookie_banner": {
    "main": {
      "title": "We use cookies",
      "description": "We use cookies to enhance your experience."
    },
    "buttons": {
      "accept": "Accept All",
      "deny": "Deny All",
      "settings": "Cookie Settings",
      "save": "Save Settings"
    },
    "categories": {
      "necessary": {
        "title": "Necessary",
        "description": "These cookies are essential for the website to function properly."
      },
      "performance": {
        "title": "Performance",
        "description": "These cookies help us improve website performance and user experience."
      }
    }
  }
}
``` 