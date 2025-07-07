import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import { Link } from 'react-router-dom';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    };

    useEffect(() => {
        const body = document.body;
        const header = document.querySelector('.header');

        if (menuOpen) {
            body.classList.add('overflow-hidden');
            header?.classList.add('notfixed');
        } else {
            body.classList.remove('overflow-hidden');
            header?.classList.remove('notfixed');
        }

        return () => {
            body.classList.remove('overflow-hidden');
            header?.classList.remove('notfixed');
        };
    }, [menuOpen]);

    // Add fixed class on scroll
    useEffect(() => {
        const header = document.querySelector('.header');
        const handleScroll = () => {
            if (window.scrollY > 0) {
                header?.classList.add('fixed');
            } else {
                header?.classList.remove('fixed');
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div className="header">
                <div className="container-lg main-header">
                    <div className="logo">
                        <Link to='/'><img src={logo} alt="Ambience" /></Link>
                    </div>
                    <nav className="nav justify-content-center d-none d-xl-flex">
                        <ul className="list-inline topLinks">
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/projects'>Projects</Link></li>
                            <li><Link to='/gallery'>Gallery</Link></li>
                            <li><Link to='/testimonials'>Testimonials</Link></li>
                            <li><Link to='/about-us'>About</Link></li>
                            <li><Link to='/careers'>Careers</Link></li>
                            <li><Link to='/contact-us'>Contact Us</Link></li>
                        </ul>
                    </nav>

                    <button 
                        className={`menuBtn d-flex d-xl-none ${menuOpen ? 'closeMenuBtn' : ''}`} 
                        onClick={toggleMenu}
                    >
                        <span id="menuLine1"></span>
                        <span id="menuLine2"></span>
                        <span id="menuLine3"></span>
                    </button>
                </div>
            </div>
            <div 
                className={`menuContainer ${menuOpen ? 'active' : ''}`} 
                style={{ display: menuOpen ? 'block' : 'none' }}
            >
                <div className="inner">
                    <div className="mainMenu">
                        <ul className="list-inline">
                            <li><Link to='/' onClick={() => setMenuOpen(false)}>Home</Link></li>
                            <li><Link to='/projects' onClick={() => setMenuOpen(false)}>Projects</Link></li>
                            <li><Link to='/gallery' onClick={() => setMenuOpen(false)}>Gallery</Link></li>
                            <li><Link to='/testimonials' onClick={() => setMenuOpen(false)}>Testimonials</Link></li>
                            <li><Link to='/about-us' onClick={() => setMenuOpen(false)}>About</Link></li>
                            <li><Link to='/careers' onClick={() => setMenuOpen(false)}>Careers</Link></li>
                            <li><Link to='/contact-us' onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
