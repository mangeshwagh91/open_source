import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    // Optimize build output
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
        passes: 3
      },
      mangle: true,
      format: {
        comments: false
      }
    },
    // Enable tree-shaking for unused code
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      tryCatchDeoptimization: false
    },
    // Set appropriate chunk size limit
    chunkSizeWarningLimit: 1000,
    // Source maps only for debugging
    sourcemap: mode === 'development',
    rollupOptions: {
      output: {
        // Manual chunks for better code splitting
        manualChunks: {
          'radix-ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-select', '@radix-ui/react-tabs'],
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['recharts', 'lucide-react', 'sonner'],
          'form-utils': ['@hookform/resolvers', 'react-hook-form', 'zod']
        }
      }
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react', '@tanstack/react-query'],
  }
}));
