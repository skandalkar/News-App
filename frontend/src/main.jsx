import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ScrollToTop from "react-scroll-to-top";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ScrollToTop smooth color='white' style={{ backgroundClip: '#3882F6', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0096c7', borderRadius: '15%', padding: '10px' }} />
  </StrictMode>,
)
