// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import pluginRewriteAll from 'vite-plugin-rewrite-all';
import react from '@vitejs/plugin-react'

export default {
  plugins: [pluginRewriteAll(), react()]
}