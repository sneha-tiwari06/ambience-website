import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Footer() {
    const currentYear = new Date().getFullYear(); 
    const [showButton, setShowButton] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    const opacity = Math.min(scrollY / 200, 1); 

    const bottomPosition = scrollY > 100 ? 10 : -60;
    return (
        <>
            <footer className="footer-area overflow-hidden w-100">
                <div className="container-lg">
                    <div className="foot-other-menu">
                        <ul className="list-inline">
                            <li><Link to='/about-us'>About</Link></li>
                            <li><Link to='/careers'>Careers</Link></li>
                            <li><Link to='/contact-us'>Contact Us</Link></li>
                        </ul>
                        <div class="readmore w-auto mt-0">
                            <Link to="/contact-us#enquiry" class="button">Enquire Now</Link>
                        </div>
                    </div>
                    <div className="foot-links">
                        <div className="row gap-row">
                            <div className="col-md-4 col-sm-6 foot-menu">
                                <h6>Useful Links</h6>
                                <ul className="list-inline">
                                    <li><Link to='/projects'>Our Work</Link></li>
                                    <li><Link to='/gallery'>Gallery</Link></li>
                                    <li><Link to='/certifications'>Certifications</Link></li>
                                    <li><Link to='/testimonials'>Testimonials</Link></li>
                                </ul>
                            </div>
                            <div className="col-md-4 col-sm-6 foot-address">
                                <h6>Contact Us (NCR)</h6>
                                <ul className="list-inline">
                                    <li><a href="https://maps.app.goo.gl/hLLcAC5gT8SNS6My8" target="_blank"><i className="fa fa-map-marker-alt"></i> <span>441-P, Pace City-II, Sector - 37, Gurgaon</span></a></li>
                                    <li><a href="tel:+91 124 4967777"><i className="fa fa-phone"></i> <span>+91 124 4967777</span></a></li>
                                    <li><a href="mailto:mail@ambience.co.in"><i className="fa fa-envelope"></i> <span>mail@ambience.co.in</span></a></li>
                                </ul>
                                <div className="readmore footer-map-btn"><a href="https://maps.app.goo.gl/hLLcAC5gT8SNS6My8" target="_blank" className="button">View On Google Map</a></div>
                            </div>
                            <div className="col-md-4 col-sm-6 foot-address">
                                <h6>Contact Us (Bangalore)</h6>
                                <ul className="list-inline">
                                    <li><a href="https://maps.app.goo.gl/apy7P7pbjqnn81DNA" target="_blank"><i className="fa fa-map-marker-alt"></i> <span>2nd Floor ,Times Square, No.319/C, 2nd Main, Kasturi Nagar (East of NGEF), Bangalore – 560043.</span></a></li>
                                    <li><a href="tel:+918042192947"><i className="fa fa-phone"></i> <span>+91 80 42192947</span></a></li>
                                    <li><a href="mailto:mail@ambience.co.in"><i className="fa fa-envelope"></i> <span>mail@ambience.co.in</span></a></li>
                                </ul>
                                <div className="readmore footer-map-btn"><a href="https://maps.app.goo.gl/apy7P7pbjqnn81DNA" target="_blank" className="button">View On Google Map</a></div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <div className="bottom-links">
                            <ul className="list-inline">
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Disclaimer</a></li>
                                <li><a href="#">Sitemap</a></li>
                            </ul>
                        </div>
                        <div className="copyrights">
                        <p>&copy; Ambience Interiors 2019-{currentYear}</p>
                        </div>
                    </div>
                </div>
            </footer>

            {showButton && (
                <div
                className="button-top"
                style={{
                    opacity: opacity,
                    bottom: `${bottomPosition}px`,
                    transition: 'bottom 0.3s ease-in-out, opacity 0.3s ease-in-out', // Smooth transitions for both opacity and bottom
                }}
                onClick={scrollToTop}
            >
                <i className="fa fa-chevron-up"></i>
            </div>
            )}
        </>
    )
}

export default Footer