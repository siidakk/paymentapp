import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/PaymentWebsite/',
  plugins: [react()],
  server: {
    host: true, // allows connections from LAN (or use '0.0.0.0')
    port: 5175,
    allowedHosts: [
      '85e3-49-207-222-57.ngrok-free.app',
      // Add any other allowed hosts here
    ]
  }
})
