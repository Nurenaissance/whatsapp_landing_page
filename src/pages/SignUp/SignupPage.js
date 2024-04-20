import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { sendSignInLinkToEmail } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import './SignupPage.css';

const firebaseConfig = {
  apiKey: "AIzaSyBPsLD_NgSwchMrpG2U81UsH_USQGSiNZU",
  authDomain: "nurenai.firebaseapp.com",
  projectId: "nurenai",
  storageBucket: "nurenai.appspot.com",
  messagingSenderId: "667498046930",
  appId: "1:667498046930:web:cb281b053ddc016e18940b"

};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const SignupPage = ({ setUser }) => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const [errorMessage, setErrorMessage] = useState('');
  const [phoneNumberExists, setPhoneNumberExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);

  // Function to check if phone number exists
  const checkIfPhoneNumberExists = async (phoneNumber) => {
    try {
      const querySnapshot = await getDocs(query(collection(db, 'users'), where('phoneNumber', '==', phoneNumber)));
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking phone number existence:', error.message);
      return true;
    }
  };

  // Function to check if email exists
  const checkIfEmailExists = async (email) => {
    try {
      const querySnapshot = await getDocs(query(collection(db, 'users'), where('email', '==', email)));
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking email existence:', error.message);
      return true;
    }
  };

  // Function to check if username exists
  const checkIfUsernameExists = async (username) => {
    try {
      const querySnapshot = await getDocs(query(collection(db, 'users'), where('username', '==', username)));
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking username existence:', error.message);
      return true;
    }
  };

  // Function to handle signup
  const handleSignup = async () => {
    try {
      // Check if the provided email already exists
      const emailAlreadyExists = await checkIfEmailExists(email);
      if (emailAlreadyExists) {
        setEmailExists(true);
        return;
      }

      // Check if the provided phone number already exists
      const phoneNumberAlreadyExists = await checkIfPhoneNumberExists(phoneNumber);
      if (phoneNumberAlreadyExists) {
        setPhoneNumberExists(true);
        return;
      }

      // Check if the provided username already exists
      const usernameAlreadyExists = await checkIfUsernameExists(username);
      if (usernameAlreadyExists) {
        setUsernameExists(true);
        return;
      }

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user profile data to Firestore
      const docRef = await addDoc(collection(db, "users"), {
        fullName,
        username,
        phoneNumber,
        email,
        password,
      });

      console.log("User profile document written with ID: ", docRef.id);

      // Send email verification link
      await sendSignInLinkToEmail(auth, email);

      // Notify user about successful sign-up
      setSignupSuccess(true);

      // Set the user state
      setUser(user);
    } catch (error) {
      console.error('Signup Error:', error.message);
    }
  };

  // Function to handle navigation to login page
  const handleLoginClick = () => {
    navigate('/login');
  };

  // Function to reset the form
  const resetForm = () => {
    setFullName('');
    setUsername('');
    setPhoneNumber('');
    setEmail('');
    setPassword('');
    setSignupSuccess(false);
    setUsernameExists(false);
    setEmailExists(false);
    setPhoneNumberExists(false);
  };

  return (
    <div className='sign_log_page'>
      <div className='sign_log_form'>
        {signupSuccess ? (
          <div>
            <p>Sign-up successful! Check your email for the verification link.</p>
            <button className='button-49' onClick={handleLoginClick}>Login</button>
          </div>
        ) : (
          <div>
            <div>
              <input
                className='name_pass_cont'
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <input
                className={`name_pass_cont ${usernameExists ? 'field-error' : ''}`}
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {usernameExists && <p className="error-message">Username is already taken</p>}
            </div>
            <div>
              <input
                className={`name_pass_cont ${phoneNumberExists ? 'field-error' : ''}`}
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {phoneNumberExists && <p className="error-message">Phone number is already taken</p>}
            </div>
            <div>
              <input
                className={`name_pass_cont ${emailExists ? 'field-error' : ''}`}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailExists && <p className="error-message">Email is already taken</p>}
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
              <button className='button-49' onClick={handleSignup}>Sign Up</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
