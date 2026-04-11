import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    allowedHosts: true,
  },
  build: {
    // Increase warning threshold slightly — we're actively splitting chunks
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Split vendor libraries into stable, long-cacheable chunks
        manualChunks: {
          // Core React runtime — never changes between deploys
          'vendor-react': ['react', 'react-dom'],
          // Router — rarely changes
          'vendor-router': ['@tanstack/react-router'],
          // Animation library — heavy but shared across all sections
          'vendor-motion': ['framer-motion'],
          // Icon library
          'vendor-icons': ['lucide-react'],
        },
      },
    },
    // Use esbuild minification (default, fastest)
    minify: 'esbuild',
    // Enable CSS code splitting so each chunk only loads its own styles
    cssCodeSplit: true,
    // Generate source maps only for production debugging (omit for fastest build)
    sourcemap: false,
    // Target modern browsers — smaller output, no polyfills
    target: 'es2020',
  },
});