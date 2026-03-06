/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom soft warm palette
        'soft': {
          'app': '#faf8f3',      // Warm milky white
          'sidebar': '#fef9f5',  // Very light warm white
          'chat': '#fef3f5',     // Light pink tint
          'header': '#fef9f5',
          'search': '#f0f0f2',   // Light search bar
        },
        'bubble': {
          'in': '#ffffff',       // Pure white for received
          'out': '#ec4899',      // Pink for sent
        },
        'status': {
          'hover': '#f0f0f2',
          'active': '#e8e8ea',
        },
        'text': {
          'primary': '#1f2937',  // Dark text
          'secondary': '#6b7280', // Muted text
          'muted': '#9ca3af',    // More muted
        },
        'accent': {
          'pink': '#ec4899',
          'pink-hover': '#db2777',
          'pink-light': '#f472b6',
          'orange': '#f97316',
        },
        'border': {
          'light': '#e5e5e7',
          'lighter': '#d4d4d8',
        }
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
      },
      transitions: {
        'default': '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(10px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease',
        slideUp: 'slideUp 0.2s ease',
        slideDown: 'slideDown 0.3s ease',
        slideInRight: 'slideInRight 0.3s ease',
      },
    },
  },
  plugins: [],
}
