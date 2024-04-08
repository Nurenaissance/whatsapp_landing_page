// SignUp.js
import React, { useState } from 'react';
import { InfoSection } from '../../components';
import { homeObjOne } from './Data';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function SignUp() {
  const navigate = useNavigate(); // Use useNavigate to navigate to different routes

  const handleSignupButtonClick = () => {
    // Navigate to the signup page
    navigate('/sign-up');
  };

  return (
    <>
      <InfoSection {...homeObjOne} onSignupButtonClick={handleSignupButtonClick} /> {/* Pass the handleSignupButtonClick function as a prop */}
    </>
  );
}

export default SignUp;
