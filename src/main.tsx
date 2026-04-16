import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BlinkUIProvider, Toaster } from '@blinkdotnew/ui'
import App from './App'
import { LanguageProvider } from './i18n/LanguageProvider'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BlinkUIProvider theme="linear" darkMode="light">
        <Toaster />
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </BlinkUIProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
