import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import './index.css'
import Producer from './pages/Producer.jsx'
import WholeSeller from './pages/Wholeseller.jsx'
import Retailer from './pages/Retailer.jsx'
import SaleForm from './components/SaleForm.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/producer",
    element: <Producer /> 
  },
  {
    path: "/wholeseller",
    element: <WholeSeller />
  },
  {
    path: "/retailer",
    element: <Retailer />
  },
  {
    path: "/SaleForm",
    element: <SaleForm />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
