# Accessibility Rules (WCAG & BITV)

## General Requirements
- Meet WCAG 2.1 Level AA standards
- Fulfill BITV 2.0 requirements (German accessibility law)
- Test with screen readers regularly
- Ensure keyboard navigability throughout the application

## Keyboard Navigation
- All interactive elements must be focusable
- Logical tab order must be maintained
- Visual focus indicators must be clearly visible
- Keyboard traps must be avoided

## Screen Readers
- All content must be accessible to screen readers
- Use semantic HTML elements
- Add ARIA attributes when needed
- Include alternative text for images
- Use descriptive link text

## Color and Contrast
- Color must not be the only means of conveying information
- Text contrast ratio must be at least 4.5:1 (WCAG AA)
- UI components contrast ratio must be at least 3:1
- Provide visual feedback for hover and focus states

## Forms and Controls
- All form elements must have associated labels
- Form error messages must be clear and accessible
- Required fields must be indicated both visually and to screen readers
- Group related form elements using fieldset and legend

## Cookie Banner Specific
- Banner must be keyboard navigable
- All cookie toggle switches must be operable via keyboard
- Toggle states must be announced to screen readers
- Tab panels must use correct ARIA roles and attributes
- Modal dialogs must trap focus appropriately
- Close buttons must be accessible and clearly labeled

## Testing
- Test with keyboard only navigation
- Test with screen readers (NVDA, JAWS, VoiceOver)
- Test with high contrast mode
- Test with text zoom (up to 200%)
- Test for motion sensitivity (reduced motion)

## Implementation Examples
```jsx
// Good toggle switch implementation
<button
  role="switch"
  aria-checked={isOn}
  aria-label="Enable performance cookies"
  onClick={toggle}
  onKeyDown={handleKeyDown}
  className={`switch ${isOn ? 'switch-on' : 'switch-off'}`}
  tabIndex={0}
>
  <span className="switch-thumb" />
</button>

// Good tab implementation
<div role="tablist" aria-label="Cookie settings">
  <button
    id="tab-settings"
    role="tab"
    aria-selected={activeTab === 'settings'}
    aria-controls="panel-settings"
    tabIndex={activeTab === 'settings' ? 0 : -1}
    onClick={() => setActiveTab('settings')}
  >
    Settings
  </button>
  {/* Additional tabs */}
</div>
<div
  id="panel-settings"
  role="tabpanel"
  aria-labelledby="tab-settings"
  tabIndex={0}
  hidden={activeTab !== 'settings'}
>
  {/* Panel content */}
</div>
``` 