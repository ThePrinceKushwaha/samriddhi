import React from 'react'
import './styles.css'


const Header = ({props}) => {
  console.log('Props: '+ props);
  // console.log(address)
  return (
    <>
     <div className="header w-full py-5 px-5 bg-gray-light rounded-lg shadow inline-flex flex-col items-center justify-center">
         <h1 className='text-3xl font-bold' >{props.name}</h1>
         <p className='text-lg'>{props.address}</p>
         <p>{props.number}</p>
     </div>
    </>
  )
}

export default Header