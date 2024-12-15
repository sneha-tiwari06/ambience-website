import React, { useEffect, useState } from 'react'
import { axiosInstance, IMAGE_URL } from '../utils/axiosInstance';

import LightGallery from 'lightgallery/react';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';

import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
function Testimonials() {
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
        <>
            <div className="breadcrumbContainer">
                <div className="container-lg">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="<?= $base_url?>">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Testimonials</li>
                    </ol>
                </div>
            </div>

            <div className="w-100 padding project-section">
                <div className="container-lg">
                    <div className="heading">
                        <h3 className="mb-0">Testimonials</h3>
                    </div>
                    <div className="projectContainer">
                    <LightGallery plugins={[lgThumbnail, lgZoom]} selector=".testimBox a" >
                        <div className="row gap-row">
                            {testimonials.map((testimonial) => (
                                testimonial.isActive && (
                                    <div key={testimonial._id} className="col-sm-6 testimBox">
                                        <a
                                            href={`${IMAGE_URL}/${testimonial.image}`}
                                            data-src={`${IMAGE_URL}/${testimonial.image}`}
                                            className="inside"
                                            data-sub-html={testimonial.imageAltText || "Testimonial"}
                                           
                                        >
                                            <div className="img-fluid">
                                                <img
                                                    src={`${IMAGE_URL}/${testimonial.logo}`}
                                                    alt={testimonial.logoAltText || "Testimonial Logo"}
                                                />
                                            </div>
                                          <p dangerouslySetInnerHTML={{ __html: testimonial.content }}></p>

                                            <h6 className="testim-name">
                                                {testimonial.logoAltText || "Testimonial"}
                                                <small></small>
                                            </h6>
                                            <div className="readmore">
                                                <span className="button mx-auto">View</span>
                                            </div>
                                            <i className="fa fa-quote-left" aria-hidden="true"></i>
                                            <i className="fa fa-quote-right" aria-hidden="true"></i>
                                        </a>

                                    </div>
                                )
                            ))}
                          
                        </div>
                           </LightGallery>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Testimonials