import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LatestProjects from './latest-projects';
import Clients from '../homepage/clients';
import StatsSection from '../homepage/stats';
import Spotlight from '../homepage/spotlights';
import AwardsCertification from '../homepage/awardsCertfication';
import HomeTestimonials from '../homepage/home-testimonials';
import { axiosInstance } from '../utils/axiosInstance';

function Home() {
    const BASE_URL = "https://ambience.in/apis"; 

    const getFullImageUrl = (path) => `${BASE_URL}${path}`;
    const [banners, setBanner] = useState([]);
    useEffect(() => {
        axiosInstance.get('/banner-images')
            .then(response => {
                // console.log('Response:', response.data);
                const formattedBanners = response.data.map(banner => ({
                    ...banner,
                    fullImageUrl: getFullImageUrl(banner.imageUrl)
                }));
                setBanner(formattedBanners);
            })
            .catch(error => {
                console.error('There was an error fetching the banner image!', error);
            });
    }, []);
    const [overviewData, setOverviewData] = useState(null);

    useEffect(() => {
        axiosInstance.get('/overview')
            .then(response => {
                setOverviewData(response.data[0]);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
  
    const formatContent = (content) => {
        if (typeof content !== 'string') return null;
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');        
        const paragraphs = doc.querySelectorAll('p');
        return Array.from(paragraphs)
            .slice(0, 2)
            .map((para, index) => (
                <div className='col-md-6 col-sm-6 overview-text text-justify' key={index}>
                    <p
                        className="mb-0"
                        dangerouslySetInnerHTML={{ __html: para.outerHTML }}
                    />
                </div>
            ));
    };
    
    
    if (!overviewData) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <div
                id="banner"
                className="banner carousel slide"
                data-bs-ride="carousel"
                aria-label="Banner Carousel"
            >
                <div className="carousel-inner">
                    {banners.map((banner, index) => (
                        <div
                            key={banner._id}
                            className={`carousel-item ${index === 0 ? 'active' : ''}`}
                        >
                            <picture>
                                <img
                                    src={banner.fullImageUrl}
                                    alt={banner.altText || "Banner"}
                                    className="d-block w-100"
                                />
                            </picture>
                            <div className="bannerText">
                            <p dangerouslySetInnerHTML={{ __html: banner.bannerText }}></p>
                                <div className="readmore solid white">
                                    <Link to="/about-us" className="button mx-auto">Learn More</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#banner"
                    data-bs-slide="prev"
                    aria-label="Previous slide"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#banner"
                    data-bs-slide="next"
                    aria-label="Next slide"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
            </div>



            <div className="w-100 py-3 hm-services-container bg-dark text-white text-center">
                <div className="container-lg">
                    <div className="row gap-row">
                        <div className="col-lg-3 hm-service-box border-end">
                            <div className="inside">
                                <p className="mb-0 fw-bold text-uppercase">Services</p>
                            </div>
                        </div>
                        <div className="col-lg-3 hm-service-box border-end">
                            <div className="inside">
                                <p className="mb-0">Design & Build</p>
                            </div>
                        </div>
                        <div className="col-lg-3 hm-service-box border-end">
                            <div className="inside">
                                <p className="mb-0">Construction Works</p>
                            </div>
                        </div>
                        <div className="col-lg-3 hm-service-box">
                            <div className="inside">
                                <p className="mb-0">Other Services</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <LatestProjects />
            <div className="container-lg"><hr class="my-0" /></div>
            <Clients />
            <div class="container-lg"><hr class="my-0" /></div>
            <div className="w-100 padding position-relative overflow-hidden overview-section">
                <div className="container-lg">
                    <div className="heading">
                        <span className="h6 text-brown">Overview</span>
                        <h3 className="mb-0">Delivering inspired spaces</h3>
                    </div>
                    <div className="row g-4">
                        {formatContent(overviewData.content)}                
                    </div>
                    <div className="viewmore"><Link to='/about-us' className="button"><span>Read more</span></Link></div>        
                </div>
            </div>
            <StatsSection />
            <Spotlight />
            <AwardsCertification />
            <div class="container-lg"><hr class="my-0" /></div>
            <HomeTestimonials />
        </>
    );
}

export default Home;
