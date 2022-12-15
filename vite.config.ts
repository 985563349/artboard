import { defineConfig } from 'vite';

import { join } from 'path';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
});
