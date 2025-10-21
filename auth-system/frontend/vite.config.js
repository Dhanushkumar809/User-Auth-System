import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // <-- FIX: Must import the 'path' module

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // --- Path Aliases ---
  resolve: {
    alias: {
      // Allows you to use '@' to reference your 'src' directory
      '@': path.resolve(__dirname, './src'), 
    },
  },
  // --------------------
});