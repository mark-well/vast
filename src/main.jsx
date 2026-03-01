import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SubjectProvider } from './context/SubjectContext.jsx'
import ThemeProvider from './context/ThemeContext.jsx'
import TextToSpeechProvider from './components/TTSControl/TextToSpeechContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider >
      <SubjectProvider>
        <TextToSpeechProvider>
          <App />
        </TextToSpeechProvider>
      </SubjectProvider>
    </ThemeProvider>
  </StrictMode>,
)
