import { useState } from 'react'
import './App.css'
import Homepage from './pages/Homepage.jsx'
import About from './pages/About.jsx'
import Footer from './pages/Footer.jsx'

function App() {      

  return (
    <>
        <div className="container">
            <Homepage/>
            <About />
            <Footer />
        </div>
    </>
  )
}

export default App
