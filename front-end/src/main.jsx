import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import './index.css'
import Producer from './pages/Producer.jsx'
import WholeSeller from './pages/Wholeseller.jsx'
import Retailer from './pages/Retailer.jsx'
import SaleForm from './components/SaleForm.jsx'
import BuyHistory from './components/BuyHistory.jsx'
import SaleHistory from './components/SaleHistory.jsx'
import AdminPage from './pages/admin.jsx'
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />
  },
  {
    path: "/producer",
    element: <Producer />
  },
  {
    path: "/producer/saleform",
    element: <SaleForm />
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
    path: "/retailer/buyhistory",
    element: <BuyHistory />
  },
  {
    path: "/retailer/salehistory",
    element: <SaleHistory />
  },
  {
    path: "/retailer/saleform",
    element: <SaleForm />
  },
  {
    path: "/wholeseller/saleform",
    element: <SaleForm />
  },
  {
    path: "/admin",
    element: <AdminPage />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  }
  /* <Routes>
  <Route path="/" element= {<Homepage />}></Route>
  <Route path="/signup" element= {<Signup />}></Route>
  <Route path="/login" element={<Login />}> </Route>
  <Route path="/contact" element={<Contact />}></Route>
  <Route path="/about" element={<About />}></Route>
  <Route path="/*" element={<Error />}></Route>
</Routes> */
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
