    import React, {useState, useEffect} from 'react'
    import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaRobot } from 'react-icons/fa';
    import NurenLogo from './Nuren_logo.png';
    import { Nav, 
        NavbarContainer, 
        NavLogo, 
        NavIcon, 
        NavMenu,
        NavItem,
        NavLinks,
        NavItemBtn,
        NavBtnLink
    } from './Navbar.elements'
    import { IconContext } from 'react-icons/lib'
    import { Button } from '../../globalStyles';


    function Navbar({ isLoggedIn, onLogout }) {

        const [click, setClick] = useState(false);
        const [button, setButton] = useState(true);
        const [showTranscript, setShowTranscript] = useState(false);
        const [showcontacts, setShowcontacts] = useState(false);
        const [showFlows, setShowFlows] = useState(false);

        const [homeClick, setHomeClick] = useState(false);
        const [servicesClick, setServicesClick] = useState(false);
        const [productsClick, setProductsClick] = useState(false);
        const navigate = useNavigate();

        const handleHomeClick = () => {
            setHomeClick(true);
            setProductsClick(false);
            setServicesClick(false);
        }
        const handleServicesClick = () => {
            setHomeClick(false);
            setProductsClick(false);
            setServicesClick(true);
        }
        const handleProductsClick = () => {
            setHomeClick(false);
            setProductsClick(true);
            setServicesClick(false);
        }

        const handlecontactsClick = () => {
            setShowcontacts(true);
          };

        const handleTranscriptClick = () => {
            setShowTranscript(true);
          };
          const handleFlowsClick = () => {
            setShowFlows(true);
          };

        const handleClick = () =>  setClick(!click);
        
        const closeMobileMenu = () => setClick(false);

        const handleLogout = () => {
            onLogout(); // Call logout function from props
        };
        

        const showButton = () => {
            // so if the screensize is <= 960px then set button state to false
            if(window.innerwidth <= 960) {
                setButton(false)
            } else {
                setButton(true)
            }
        }
        const handleChatbotClick = () => {
            // Navigate to the Chatbot Demo page
            navigate('/chat');
            closeMobileMenu(); // Close mobile menu after clicking
        };

        useEffect(() => {
            showButton();
        }, [])

        window.addEventListener('resize', showButton);

        return (
            <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <Nav>
                    <NavbarContainer>
                        <NavLogo to='/'> 
                        <NavIcon src={NurenLogo} alt="Nuren Logo" />
                                Nuren AI

                        </NavLogo>
                        <NavMenu onClick={handleClick} click={click} >
                            <NavItem onClick={handleHomeClick} homeClick={homeClick}>
                                <NavLinks to='/' onClick={closeMobileMenu}>
                                    Home
                                </NavLinks>
                            </NavItem>
                        
                        
                            <NavItem onClick={handleServicesClick} servicesClick={servicesClick}>
                                <NavLinks to='/services' onClick={closeMobileMenu}>
                                    Services
                                </NavLinks>
                            </NavItem>
                        
                        
                            <NavItem onClick={handleProductsClick} productsClick={productsClick}>
                                <NavLinks to='/Products' onClick={closeMobileMenu}>
                                    Products
                                </NavLinks>
                            </NavItem>
                            <NavItem onClick={handlecontactsClick} productsClick={productsClick}>
                                <NavLinks to='/Contact' onClick={closeMobileMenu}>
                                    Contacts
                                </NavLinks>
                            </NavItem>
                            <NavItem onClick={handleFlowsClick} productsClick={productsClick}>
                                <NavLinks to='/Flows' onClick={closeMobileMenu}>
                                    Flows
                                </NavLinks>
                            </NavItem>
                            <NavItem onClick={handleTranscriptClick} productsClick={productsClick}>
                                <NavLinks to='/logs' onClick={closeMobileMenu}>
                                    Transcript
                                </NavLinks>
                            </NavItem>
                            {isLoggedIn && 
                            <NavItem onClick={handleChatbotClick}>
                            <NavLinks to='#' onClick={closeMobileMenu}>
                                <FaRobot /> Chatbot Demo
                            </NavLinks>
                        </NavItem>}
                            {isLoggedIn ? (
                    <NavItem>
                    <NavLinks to='/' onClick={handleLogout}>
                        Logout
                    </NavLinks>
                    </NavItem>
                ) : (
                    <>
                    <NavItem>
                        <NavLinks to='/login' onClick={closeMobileMenu}>
                        Login
                        </NavLinks>
                    </NavItem>
                    {button && !isLoggedIn && ( // Render sign-up button if not logged in
                        <NavItemBtn>
                        <NavBtnLink to='/sign-up' onClick={closeMobileMenu}>
                            <Button primary>SIGN UP</Button>
                        </NavBtnLink>
                        </NavItemBtn>
                    )}
                    </>
                )}
                </NavMenu>
            </NavbarContainer>
            </Nav>
        </IconContext.Provider>
        </>
    );
    }

    export default Navbar;
