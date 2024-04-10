import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyles from './globalStyles'
import { Navbar, Footer } from './components';
import Home from './pages/HomePage/Home';
import Services from './pages/Services/Services';
import Products from './pages/Products/Products';
import SignUp from './pages/SignUp/SignUp';
import SignupPage from './pages/SignUp/SignupPage'; 
import Login from './pages/LoginPage/Login';
import ScrollToTop from './components/ScrollToTop';
import Chat from './pages/chatbot/Chat';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set initial login state

  // Function to handle login
  const handleLogin = () => {
    // Your login logic here
    setIsLoggedIn(true); // Set isLoggedIn to true after successful login
  };

  // Function to handle logout
  const handleLogout = () => {
    // Your logout logic here 
    setIsLoggedIn(false); // Set isLoggedIn to false after logout
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
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/signup-page" element={<SignupPage />} /> 
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/chat" element={<Chat />} />
          </Routes>
          <Footer />
      </Router>
    
  );
}

export default App;
