export class Logger {
  constructor({ debugMode = false, silentMode = true }) {
    this.debugMode = debugMode;
    this.silentMode = silentMode;
  }

  info(...args) {
    if (!this.silentMode) {
      console.info('[CF] [core]', ...args);
    }
  }

  debug(...args) {
    if (this.debugMode && !this.silentMode) {
      console.debug('[CF] [core]', ...args);
    }
  }

  warn(...args) {
    if (!this.silentMode) {
      console.warn('[CF] [core]', ...args);
    }
  }

  error(...args) {
    if (!this.silentMode) {
      console.error('[CF] [core]', ...args);
    }
  }
}
