import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyles from './globalStyles'
import { initializeApp } from 'firebase/app';
import { Navbar, Footer } from './components';
import Home from './pages/HomePage/Home';
import Services from './pages/Services/Services';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Products from './pages/Products/Products';
import SignUp from './pages/SignUp/SignUp';
import SignupPage from './pages/SignUp/SignupPage'; 
import Login from './pages/LoginPage/Login';
import ScrollToTop from './components/ScrollToTop';
import { setUser, clearUser } from './redux_comp/authActions';
import { useSelector, useDispatch } from 'react-redux';
import Chat from './pages/chatbot/Chat';
import Logs from './callLogs';

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

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Set initial login state to false
  const dispatch = useDispatch();
  const user = useSelector((state) => state);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true); // User is logged in
      } else {
        setIsLoggedIn(false); // User is logged out
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  

  // Function to handle logout
    const handleLogout = () => {
      // Dispatch the action to clear the user from the Redux store
      dispatch(clearUser());
      
      // Your existing logout logic
      if (user) {
        auth.signOut().then(() => {
          // Dispatch the action to clear the user from the Redux store
          
        }).catch((error) => {
          console.error('Logout Error:', error.message);
        });
      }
    };
  
  return (
      <Router>
          <GlobalStyles />
          <ScrollToTop />
          <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/logs" element={<Logs/>}/>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/signup-page" element={<SignupPage />} /> 
          <Route path="/login" element={<Login />} />
          {isLoggedIn && <Route path="/chat" element={<Chat />} />} 
          </Routes>
          <Footer />
      </Router>
    
  );
}

export default App;
