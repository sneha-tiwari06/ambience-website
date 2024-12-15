import React, { useEffect, useState } from 'react'
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { axiosInstance, IMAGE_URL } from '../utils/axiosInstance';
import { Link } from 'react-router-dom';

function HomeTestimonials() {
    useEffect(() => {

        new Swiper('.testim-slider', {
            slidesPerView: 1,
            spaceBetween: 10,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                type: "fraction",
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                576: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
            },
        });
    }, []);
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        axiosInstance.get('/testimonials')
            .then(response => {
                setTestimonials(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the testimonials!', error);
            });
    }, []);
    return (
        <div className="w-100 padding testimonial-section">
            <div className="container-lg">
                <div className="swiper testim-slider">
                    <div className="headingContainer d-flex justify-content-between align-items-center">
                        <div className="heading mb-0">
                            <span className="h6 text-brown">Testimonials</span>
                            <h3 className="mb-0">Client's speak</h3>
                        </div>
                        <div className="bottom-controls mr-0 justify-content-end">
                            <div className="swiper-button-prev"></div>
                            <div className="readmore w-auto mt-0"><Link to='/testimonials' className="button">Read more</Link></div>
                            <div className="swiper-button-next"></div>
                        </div>
                    </div>
                    <div className="swiper-wrapper">
                        {testimonials.map((testimonial) => (
                            testimonial.isActive && (
                                <div className="swiper-slide testimBox">
                                    <div key={testimonial._id} className="inside">
                                        <div className="img-fluid"> <img src={`${IMAGE_URL}/${testimonial.logo}`} alt={testimonial.logoAltText} />
                                        </div>
                                        <p dangerouslySetInnerHTML={{ __html: testimonial.content }}></p>
                                        <h6 className="testim-name">{testimonial.logoAltText}<small /></h6>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeTestimonials