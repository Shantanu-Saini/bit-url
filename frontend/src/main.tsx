import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import UrlShortner from './components/UrlShortner.tsx';
import QRGenerator from './components/QRGenerator.tsx'
import About from './components/About.tsx'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '',
          element: <UrlShortner />
        },
        {
          path: 'qrgenerator',
          element: <QRGenerator />
        },
        {
          path: 'about',
          element: <About />
        }
      ]
    },
  ]
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
