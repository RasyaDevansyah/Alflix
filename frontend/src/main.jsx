import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import {BrowserRouter} from 'react-router-dom'
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './components/Context/AuthContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HashRouter>
  </StrictMode>,
)
