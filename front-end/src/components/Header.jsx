import React from 'react'
import './styles.css'

const Header = () => {
  return (
    <>
     <div className="header w-full py-3 px-3 bg-white border border-gray-100 rounded-lg shadow inline-flex flex-col items-center justify-center">
         <h1>Jumla Apple Producer</h1>
         <p>Address, City</p>
         <p>Contact: 9800000000</p>
     </div>
    </>
  )
}

export default Header