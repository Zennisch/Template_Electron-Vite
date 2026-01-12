import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  main: {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src/main'),
        '@preload': resolve(__dirname, 'src/preload'),
        '@shared': resolve(__dirname, 'src/shared')
      }
    }
  },
  preload: {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src/preload'),
        '@main': resolve(__dirname, 'src/main'),
        '@shared': resolve(__dirname, 'src/shared')
      }
    }
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src/renderer/src'),
        '@assets': resolve(__dirname, 'src/renderer/src/assets'),
        '@components': resolve(__dirname, 'src/renderer/src/components'),
        '@hooks': resolve(__dirname, 'src/renderer/src/hooks'),
        '@pages': resolve(__dirname, 'src/renderer/src/pages'),
        '@utils': resolve(__dirname, 'src/renderer/src/utils'),
        '@preload': resolve(__dirname, 'src/preload'),
        '@shared': resolve(__dirname, 'src/shared')
      }
    },
    plugins: [react(), tailwindcss()]
  }
})
