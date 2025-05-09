/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
        'primary-light': 'var(--primary-light)',
        accent: 'var(--accent)',
        'accent-light': 'var(--accent-light)',
        background: 'var(--background)',
        'card-background': 'var(--card-background)',
        'card-hover': 'var(--card-hover)',
        text: 'var(--text)',
        'text-light': 'var(--text-light)',
        border: 'var(--border)',
        error: 'var(--error)',
        success: 'var(--success)',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow)',
        'md': 'var(--shadow-md)',
        'glow': '0 0 15px 2px rgba(99, 102, 241, 0.3)',
        'glow-lg': '0 0 25px 5px rgba(99, 102, 241, 0.4)',
      },
      backgroundImage: {
        'gradient-purple': 'var(--gradient-purple)',
        'gradient-blue': 'var(--gradient-blue)',
      },
      transitionProperty: {
        'all': 'var(--transition)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)' },
          '50%': { transform: 'translateY(-15px) rotate(5deg)', boxShadow: '0 15px 25px rgba(0, 0, 0, 0.3)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}; 