import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { BookProvider } from './context/BookContext.jsx'
import AuthModal from './components/AuthModal.jsx'
import './components/AuthModal.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <BookProvider>
        <App />
        <AuthModal />
      </BookProvider>
    </BrowserRouter>
  </StrictMode>,
)
