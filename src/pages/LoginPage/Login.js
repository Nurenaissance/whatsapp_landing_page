import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged,sendEmailVerification } from 'firebase/auth';
import { setUser, clearUser } from '../../redux_comp/authActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyBPsLD_NgSwchMrpG2U81UsH_USQGSiNZU",
  authDomain: "nurenai.firebaseapp.com",
  projectId: "nurenai",
  storageBucket: "nurenai.appspot.com",
  messagingSenderId: "667498046930",
  appId: "1:667498046930:web:cb281b053ddc016e18940b"
};

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

const Login = () => {
  const Navigate=useNavigate();
  const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
  const dispatch = useDispatch(); 

  useEffect(() => {
    const handleAuthStateChange = async (user) => {
      if (user) {
        if (user.emailVerified) {
          dispatch(setUser(user));
          Navigate('/');
          // Fetch user profile data from Firestore
        } else {
          // Handle the case where email is not verified
          console.log('Email not verified');
        }
      } else {
        dispatch(clearUser());
      }
    };

    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      console.log('Attempting to log in with:', email, password);

      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = userCredential.user;

      if (!loggedInUser.emailVerified) {
        alert('Please verify your email before signing in.');
        sendEmailVerification(auth.currentUser);
        return;
      }
      dispatch(setUser(loggedInUser));;

      Navigate('/');
      
    } catch (error) {
      console.error('Login Error:', error);
    }
  };
  const handlesclick=()=>{
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
          <button className='button-49' onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
