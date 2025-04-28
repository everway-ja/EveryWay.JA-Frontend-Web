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
    darkMode: 'class', // Enable class-based dark mode
    theme: {
        extend: {
            // Custom theme extensions can be added here
            // Example: colors, spacing, fonts, etc.
            fontFamily: {
                sans: ['"Funnel Display"', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
                display: ['"Funnel Display"', 'sans-serif'],
            },
            colors: {
                // Light mode colors
                light: {
                    background: '#ffffff',
                    text: '#000000',
                    primary: '#3b82f6',
                    secondary: '#6b7280',
                },
                // Dark mode colors
                dark: {
                    background: '#121212',
                    text: '#f3f4f6',
                    primary: '#60a5fa',
                    secondary: '#9ca3af',
                }
            }
        },
    },
    plugins: [],
}

