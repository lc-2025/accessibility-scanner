import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import './css/index.css'
import App from './components/App.tsx'
import './i18n.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback="loading">
        <App />
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
