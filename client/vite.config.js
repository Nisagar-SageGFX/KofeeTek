import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    },
    watch: {
      // Avoid Windows Defender / AV file-touch events inside node_modules
      // from being seen as changes and re-triggering the dep optimizer.
      ignored: ['**/node_modules/**', '**/.git/**'],
    },
  },
  optimizeDeps: {
    // Pre-bundle the heavy libs up front instead of discovering them
    // lazily mid-render — this is what was causing the 504 / infinite
    // re-optimize loop on @react-three/drei.
    include: [
      'react', 'react-dom', 'react-router-dom',
      'three', '@react-three/fiber', '@react-three/drei',
      'framer-motion', 'gsap',
      '@supabase/supabase-js',
    ],
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          animation: ['framer-motion', 'gsap'],
        }
      }
    }
  }
})
