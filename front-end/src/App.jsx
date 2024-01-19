import { useState } from 'react'
import './App.css'
import Homepage from './pages/Homepage'
import About from './pages/About'
import Footer from './pages/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div className="container flex bg-purple">

            <Homepage/>
            <About />
            <Footer />
        </div>
    </>
  )
}

export default App
