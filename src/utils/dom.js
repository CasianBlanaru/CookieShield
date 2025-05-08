import { Logger } from './logger.js';

const logger = new Logger({ debugMode: false, silentMode: true });

export function createElement(tag, attributes = {}, textContent = '') {
  try {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'style' && typeof value === 'object') {
        Object.assign(element.style, value);
      } else if (key === 'className') {
        element.className = value;
      } else if (key === 'htmlFor') {
        element.setAttribute('for', value);
      } else {
        element.setAttribute(key, value);
      }
    });
    if (textContent) {
      element.textContent = textContent;
    }
    return element;
  } catch (error) {
    logger.error(`Failed to create element ${tag}:`, error);
    throw error;
  }
}

export function appendChild(parent, child) {
  try {
    parent.appendChild(child);
  } catch (error) {
    logger.error('Failed to append child:', error);
    throw error;
  }
}

export function addEventListener(element, event, handler) {
  try {
    element.addEventListener(event, handler);
  } catch (error) {
    logger.error(`Failed to add event listener for ${event}:`, error);
    throw error;
  }
}
