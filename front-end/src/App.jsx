import { useState } from 'react'
import './App.css'

import Homepage from './pages/Homepage'
import About from './pages/About'
// import Footer from './pages/Footer'
import Signup from './pages/Signup'
import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login'
import Contact from './pages/Contact';
import Error from './pages/Error';

function App() {      

  return (
    <>
{/* <Routes>
  <Route path="/" element= {<Homepage />}></Route>
  <Route path="/signup" element= {<Signup />}></Route>
  <Route path="/login" element={<Login />}> </Route>
  <Route path="/contact" element={<Contact />}></Route>
  <Route path="/about" element={<About />}></Route>
  <Route path="/*" element={<Error />}></Route>
</Routes> */}


    {/* <Signup /> */}
    {/* <Login /> */}
        {/* <div className="container flex bg-purple">

            <Homepage/>
            <About />
            <Signup />
            <Footer />

        </div> */}
    </>
  )
}

export default App
