import React from 'react'
import './styles.css'

const producer = [
  {
    name: "Jumla Apple Producer",
    address: "jumla, jumla",
    contact: "01-456789"
  },
  {
    name: "Siraha Sugar Producer",
    address: "Siraha, Siraha",
    contact: "01-456789"
  },
  {
    name: "Janakpur Biscuit Producer",
    address: "Janakpur, janakpur",
    contact: "01-456789"
  },
  {
    name: "Sunsari Rice Producer",
    address: "Dharan, Sunsari",
    contact: "01-456789"
  }
]

const Header = () => {
  return (
    <>
     <div className="header w-full py-3 px-3 bg-gray-light rounded-lg shadow inline-flex flex-col items-center justify-center">
         <h1 className='text-3xl font-bold' >{producer[0].name}</h1>
         <p className='text-lg'>{producer[0].address}</p>
         <p>{producer[0].contact}</p>
     </div>
    </>
  )
}

export default Header