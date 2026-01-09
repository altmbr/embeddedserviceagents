import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Light, energetic palette
        base: {
          DEFAULT: '#ffffff',
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
        },
        surface: {
          DEFAULT: '#ffffff',
          muted: '#fafafa',
          elevated: '#f0f0f0',
        },
        // Punchy electric blue accent
        accent: {
          DEFAULT: '#2563eb',
          light: '#3b82f6',
          dark: '#1d4ed8',
          muted: '#dbeafe',
        },
        // Energetic coral/orange CTA
        cta: {
          DEFAULT: '#f97316',
          hover: '#ea580c',
          light: '#fb923c',
          muted: '#ffedd5',
        },
        // High contrast text
        text: {
          primary: '#0f172a',
          secondary: '#475569',
          muted: '#94a3b8',
        },
        // Semantic colors
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
      },
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        body: ['Satoshi', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-in': 'slideIn 0.5s ease-out forwards',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 30px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 50px -15px rgba(0, 0, 0, 0.1)',
        'cta': '0 4px 14px 0 rgba(249, 115, 22, 0.35)',
        'cta-hover': '0 6px 20px 0 rgba(249, 115, 22, 0.45)',
        'accent': '0 4px 14px 0 rgba(37, 99, 235, 0.25)',
      },
    },
  },
  plugins: [],
}

export default config
