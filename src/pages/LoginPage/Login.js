import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged,sendEmailVerification } from 'firebase/auth';
import { setUser, clearUser } from '../../redux_comp/authActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

const firebaseConfig = {

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State to hold error message
  const dispatch = useDispatch();

  

  const handleLogin = async () => {
    try {
      console.log('Attempting to log in with:', email, password);

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = userCredential.user;

      if (!loggedInUser.emailVerified) {
        alert('Please verify your email before signing in.');
        sendEmailVerification(auth.currentUser);
        return;
      }

      dispatch(setUser(loggedInUser));

      // Navigate to home page after successful login
      Navigate('/');
          
        } catch (error) {
          console.error('Login Error:', error);
      // Handle incorrect email or password error
      if (error.code === 'auth/wrong-password') {
        setError('Wrong password. Please try again.');
      } else if (error.code === 'auth/user-not-found') {
        setError('Email not found. Please check your email.');
      } else {
        setError('User does not found please Sign Up');
      }
    }
  };

  const handlesclick = () => {
    Navigate('../signup');
  };

  return (
    <div className='sign_log_page'>
      <div className='sign_log_form'>
        <div>
          <input
            className='name_pass_cont'
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            className='name_pass_cont'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if exists */}
          <button className='button-49' onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
