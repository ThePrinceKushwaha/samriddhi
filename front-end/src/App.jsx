import { useState } from 'react'
import './App.css'
import Homepage from './pages/Homepage.js'
import About from './pages/About.js'
import Footer from './pages/Footer.js'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div className="cotainer">

            <Homepage/>
            <About />
            <Footer />
        </div>
    </>
  )
}

export default App
