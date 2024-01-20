import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Hero from './Hero';
import Register from './Register';

const Homepage = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <HomeContainer className="container xl">
        <div className="homeWrapper flex items-center justify-center">
          <Hero />
          <ContentContainer>
            {(currentPath === '/' || currentPath === '/login') && (
              <LoginContainer>
                <h2 className="loginText">Login to your account</h2>
                <Login />
              </LoginContainer>
            )}
            {currentPath === '/register' && (
              <SignupContainer>
                <h2 className="signupText">Signup for an account</h2>
                <Register />
              </SignupContainer>
            )}
          </ContentContainer>
        </div>
      </HomeContainer>
    </>
  );
};

const HomeContainer = styled.div`
  margin: 0;
  padding: 0;
  .homeWrapper {
    margin: 0;
    padding: 0;
  }
`;

const ContentContainer = styled.div`
  padding-left: 200px;
  width: 500px;
`;

const LoginContainer = styled.div`
  h2 {
    font-size: 1.3rem;
    font-weight: 300;
  }
`;

const SignupContainer = styled.div`
  h2 {
    font-size: 1.3rem;
    font-weight: 300;
  }
`;

export default Homepage;
