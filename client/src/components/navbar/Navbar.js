import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import Logo from '../../Assets/Logo_hive.png';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const hiddenPaths = ['/login', '/signup'];
    if (hiddenPaths.includes(location.pathname)) {
        return null;
    }

    const handleNavigation = (path) => {
        setMenuOpen(false);
        navigate(path);
    };

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    return (
        <nav className="navbar_container_x7f92">
            <div className="navbar_content_wrapper_d3e45">
                <img 
                    src={Logo} 
                    alt="Company Logo" 
                    className="navbar_logo_image_b8h31" 
                    onClick={() => handleNavigation('/')}
                />
                <div className={`navbar_navigation_items_j9k42 ${menuOpen ? 'navbar_navigation_items_visible_m4p73' : ''}`}>
                    <Link 
                        to="/" 
                        className="navbar_navigation_link_h2l56" 
                        onClick={() => setMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link 
                        to="/about" 
                        className="navbar_navigation_link_h2l56" 
                        onClick={() => setMenuOpen(false)}
                    >
                        About
                    </Link>
                    <Link 
                        to="/feature" 
                        className="navbar_navigation_link_h2l56" 
                        onClick={() => setMenuOpen(false)}
                    >
                        Features
                    </Link>
                    <Link 
                        to="/contact" 
                        className="navbar_navigation_link_h2l56" 
                        onClick={() => setMenuOpen(false)}
                    >
                        Contact
                    </Link>
                    <button 
                        className="navbar_connect_button_f5n91"
                        onClick={() => handleNavigation('/signup')}
                    >
                        Work With Us
                    </button>
                </div>
                <div 
                    className={`navbar_hamburger_menu_k7r84 ${menuOpen ? 'navbar_hamburger_menu_active_q2w39' : ''}`} 
                    onClick={toggleMenu}
                >
                    <div className="navbar_hamburger_bar_x9y62"></div>
                    <div className="navbar_hamburger_bar_x9y62"></div>
                    <div className="navbar_hamburger_bar_x9y62"></div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;