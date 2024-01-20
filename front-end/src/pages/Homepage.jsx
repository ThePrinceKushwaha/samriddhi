import React from 'react';
import Navigation from './Navigation';
import Login from './Login';
import Hero from './Hero';
import styled from 'styled-components'



const Homepage = () => {
  return (
    <>
      <HomeContainer className="container xl">
        <div className="homeWrapper flex items-center justify-center">
          <Hero />
           
            <LoginContainer>
            
              <h2 className='loginText'>login to your account</h2>
            <Login/>
            </LoginContainer>
         
        </div>
        
          
        
      </HomeContainer>

    </>
  )
}
const HomeContainer = styled.div`
  margin:0;
  padding:0;
  .homeWrapper {
    margin:0;
    padding:0;
  }
  .login_____{
    width:400px;
  }
`

const LoginContainer =  styled.div`
  width:500px;
  h2{
    font-size:1.3rem;
    font-weight:300;
  }
`


export default Homepage