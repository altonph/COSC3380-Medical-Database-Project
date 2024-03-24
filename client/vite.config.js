// import path from "path"
// import react from "@vitejs/plugin-react"
// import { defineConfig } from "vite"

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// })

import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        page1: './src/pages/LandingPage.jsx',
        page2: './src/pages/ContactPage.jsx',
        page3: './src/pages/AboutPage.jsx'
        // Add more entry points as needed
      },
    },
  },
});


