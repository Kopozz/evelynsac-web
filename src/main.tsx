import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' 
import App from './App.tsx'

console.log("Main.tsx executing...");

const rootEl = document.getElementById('root');
if (!rootEl) {
  console.error("Root element missing!");
} else {
  createRoot(rootEl).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
