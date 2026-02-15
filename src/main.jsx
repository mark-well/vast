import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SubjectProvider } from './context/SubjectContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SubjectProvider>
      <App />
    </SubjectProvider>
  </StrictMode>,
)
