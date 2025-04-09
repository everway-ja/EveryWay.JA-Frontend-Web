import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

/**
 * Vite Configuration
 * 
 * This configuration defines the build process for the EveryWay.JA Frontend Web application.
 * 
 * Key features:
 * - React plugin for JSX support
 * - Path aliases for cleaner imports across the project
 * - Optimization for development and production builds
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Path aliases to simplify imports throughout the application
    // Instead of relative paths like '../../../features', use '@features/...'
    alias: {
      '@': resolve(__dirname, './src'),            // Root source folder
      '@ui': resolve(__dirname, './src/ui'),       // UI components
      '@features': resolve(__dirname, './src/features'), // Feature components
      '@layout': resolve(__dirname, './src/layout'),     // Layout components
      '@pages': resolve(__dirname, './src/pages'),       // Page components
      '@contexts': resolve(__dirname, './src/contexts'), // React contexts
      '@redux': resolve(__dirname, './src/redux'),       // Redux store, slices, etc.
    }
  }
})

