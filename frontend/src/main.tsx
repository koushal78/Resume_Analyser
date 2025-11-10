import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AUthProvider } from './context/AuthContext.tsx'
import { ResumeProvider } from './context/resumeContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AUthProvider>
    <BrowserRouter>
    <ResumeProvider>


    <App  />

    </ResumeProvider>



    
    </BrowserRouter>
    </AUthProvider>
  </StrictMode>,
)
