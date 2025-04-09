/** @type {import('tailwindcss').Config} */

/**
 * Tailwind CSS Configuration
 * 
 * This configuration defines how Tailwind CSS utility classes are generated
 * for the EveryWay.JA Frontend Web application.
 * 
 * Key features:
 * - Content paths for where Tailwind should look for class usage
 * - Theme extensions for custom design elements
 * - Plugin configurations
 */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all source files for Tailwind class usage
  ],
  theme: {
    extend: {
      // Custom theme extensions can be added here
      // Example: colors, spacing, fonts, etc.
      fontFamily: {
        sans: ['FunnelDisplay', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['FunnelDisplay', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

