/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-color)',
        foreground: 'var(--text-color)',
        muted: 'var(--text-muted)',
        dim: 'var(--text-dim)',
        border: 'var(--border-color)',
        accent: 'var(--accent-color)',
        'accent-muted': 'var(--accent-muted)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"IBM Plex Serif"', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      fontSize: {
        'tiny': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.05em' }],
        'small': ['0.875rem', { lineHeight: '1.25rem' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'heading': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.01em' }],
        'display': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'huge': ['clamp(3rem, 8vw, 8rem)', { lineHeight: '1', letterSpacing: '-0.04em' }],
      }
    },
  },
  plugins: [],
}
