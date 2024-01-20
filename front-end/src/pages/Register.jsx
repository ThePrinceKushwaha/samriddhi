import React from 'react';
import styled from 'styled-components'
import Hero from './Hero';
import { useLocation } from 'react-router-dom';
import Signup from './Signup';

const Register = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <>
      <RegisterContainer className="container xl">
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
                <Signup />
              </SignupContainer>
            )}
          </ContentContainer>
        </div>
      </RegisterContainer>
    </>
  );
};

const RegisterContainer = styled.div`
  margin: 0;
  padding: 0;
  .homeWrapper {
    margin: 0;
    padding: 0;
  }
`;

const ContentContainer = styled.div`
  width: 100%; // Make the container take up full width
  max-width: 500px; // Set max-width if you want to limit the width
  padding-left: 200px;
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

export default Register;
