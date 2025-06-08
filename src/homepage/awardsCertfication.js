import React, { useEffect, useState } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import { axiosInstance, IMAGE_URL } from "../utils/axiosInstance";

function AwardsCertification() {
  const [certifications, setCertifications] = useState([]);
 useEffect(() => {
  if (certifications.length > 0) {
    // Give React time to render the DOM
    setTimeout(() => {
      new Swiper(".certifications-slider", {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
          clickable: true,
        },
        breakpoints: {
          576: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
      });
    }, 0); // or a slight delay like 100ms if needed
  }
}, [certifications]);

  

  useEffect(() => {
    axiosInstance
      .get("/awards")
      .then((response) => {
        setCertifications(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the certifications!", error);
      });
  }, []);

  return (
    <div className="w-100 padding certifications-section">
      <div className="container-lg">
        <div className="swiper certifications-slider">
          <div className="headingContainer d-flex justify-content-between align-items-center">
            <div className="heading mb-0">
              <span className="h6 text-brown">Ambience</span>
              <h3 className="mb-0">Certifications</h3>
            </div>
            <div className="bottom-controls me-0 justify-content-end">
              <div className="swiper-button-prev"></div>
              <div className="swiper-pagination"></div>
              <div className="swiper-button-next"></div>
            </div>
          </div>

          <div className="swiper-wrapper certifications-wrapper">
            {certifications.map(
              (certification) =>
                certification.isActive && (
                  <div key={certification._id} className="swiper-slide certifications-box">
                    <div  className="inside">
                      <div className="img-fluid">
                        <img
                          src={`${IMAGE_URL}/${certification.image}`}
                          alt={certification.altText}
                        />
                      </div>
                      <div className="certificate-text">
                        {/* <span>{certification.altText}</span> */}
                        <p
                          className="mb-0"
                          dangerouslySetInnerHTML={{
                            __html: certification.altText,
                          }}
                        ></p>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AwardsCertification;
