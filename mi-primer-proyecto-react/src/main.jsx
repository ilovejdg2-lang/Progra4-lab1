import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "@tanstack/react-router";
import { router } from './routes.jsx';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
