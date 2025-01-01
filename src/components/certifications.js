import React, { useEffect, useState } from "react";
import { axiosInstance, IMAGE_URL } from "../utils/axiosInstance";
import LightGallery from 'lightgallery/react';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';

import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
function Certifications() {
  const [certifications, setCertifications] = useState([]);

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
    <>
      <div className="breadcrumbContainer">
        <div className="container-lg">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Certifications
            </li>
          </ol>
        </div>
      </div>

      <div className="w-100 padding project-section">
        <div className="container-lg">
          <div className="heading">
            <h3 className="mb-0">Certifications</h3>
          </div>
          <div className="certifications-wrapper">
          <LightGallery plugins={[lgThumbnail, lgZoom]} selector=".certifications-box a" >
            <div className="row gap-row">
              {certifications.map(
                (certification) =>
                  certification.isActive && (
                    <div
                      key={certification._id}
                      className="col-sm-4 certifications-box"
                    >
                      <a
                        href={`${IMAGE_URL}/${certification.certificateImage}`}
                        className="inside"
                        data-src={`${IMAGE_URL}/${certification.certificateImage}`}
                        data-caption={certification.altText}
                        data-sub-html={certification.altText || "Testimonial"}
                      >
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
                      </a>
                    </div>
                  )
              )}
            </div>
            </LightGallery>
          </div>
        </div>
      </div>
    </>
  );
}

export default Certifications;
