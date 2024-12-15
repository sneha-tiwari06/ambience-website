import React from 'react'
import logo from './logo.png'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <>
            <div className="header">
                <div className="container-lg main-header">
                    <div className="logo">
                        <Link to='/'><img src={`${logo}`} alt="Ambience" /></Link>
                    </div>
                    <nav className="nav justify-content-center d-none d-xl-flex">
                        <ul className="list-inline topLinks">
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/projects'>Projects</Link></li>
                            <li><Link to='/gallery'>Gallery</Link></li>
                            <li><Link to ='/testimonials'>Testimonials</Link></li>
                            <li><Link to='/about-us'>About</Link></li>
                            <li><Link to='/careers'>Careers</Link></li>
                            <li><Link to='/contact-us'>Contact Us</Link></li>
                        </ul>
                    </nav>
                    <div className="top-header">
                        <button className="menuBtn d-flex d-xl-none">
                            <span id="menuLine1"></span>
                            <span id="menuLine2"></span>
                            <span id="menuLine3"></span>
                        </button>
                        <div className="socialBtn">
                            <i className="fa fa-share-alt"></i>
                            <ol className="list-inline">
                                <li style={{ "--i": 2 }}><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                <li style={{ "--i": 4 }}><a href="#"><i className="fab fa-instagram"></i></a></li>
                                <li style={{ "--i": 6 }}><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <div className="menuContainer">
                <div className="inner">
                    <div className="mainMenu">
                        <ul className="list-inline">
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/projects'>Projects</Link></li>
                            <li><Link to='/gallery'>Gallery</Link></li>
                            <li><Link to ='/testimonials'>Testimonials</Link></li>
                            <li><Link to='/about-us'>About</Link></li>
                            <li><Link to='/careers'>Careers</Link></li>
                            <li><Link to='/contact-us'>Contact Us</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header