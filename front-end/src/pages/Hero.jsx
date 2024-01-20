import React from 'react'
import styled from 'styled-components'

const Hero = () => {
  return (
    <>
    <LeftContainer className="bg-purple py-5">
            <h1 className="text-white text-3xl">
                Welcome back

            </h1>
            <h2 className="text-white">
                Samriddhi
            </h2>

    </LeftContainer>

    </>
  )
}
const LeftContainer = styled.div`
    width:80%;
    height:100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    line-height:7rem;
    background-color:indigo;

    h1{
        font-size:3rem;
        letter-spacing:2px;
        opacity: 0.5;
    color: #4812f6;
    }
        h2{
            font-size:7rem;
            text-transform:lowercase;
            font-weight:600;
        }

`
export default Hero
