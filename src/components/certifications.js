import React, { useEffect, useRef, useState } from "react";
import { axiosInstance, IMAGE_URL } from "../utils/axiosInstance";
import LightGallery from "lightgallery/react";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import Footer from "../widgets/footer";
import logo from "./logo.png"; // ✅ Import logo properly

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
  const logoClass = "lg-top-left-logo";
  const logoRef = useRef(null);
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const container = document.querySelector(".lg-current");

      if (container && !document.querySelector(`.${logoClass}`)) {
        const logoImg = document.createElement("img");
        logoImg.src = logo;
        logoImg.alt = "Ambience Interiors";
        logoImg.className = logoClass;
        Object.assign(logoImg.style, {
          position: "fixed",
          top: "30px",
          left: "20px",
          width: "160px",
          zIndex: 9999,
          pointerEvents: "none",
        });

        document.body.appendChild(logoImg);
        logoRef.current = logoImg; // save reference for cleanup
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      if (logoRef.current) {
        logoRef.current.remove();
        logoRef.current = null;
      }
    };
  }, []);

  // Cleanup function for gallery close
  const handleAfterClose = () => {
    if (logoRef.current) {
      logoRef.current.remove();
      logoRef.current = null;
    }
  };

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
            <LightGallery
              plugins={[lgThumbnail]}
              selector=".certifications-box a"
              download={false}
              subHtmlSelectorRelative={true}
              appendSubHtmlTo=".lg-sub-html"
              onAfterClose={handleAfterClose}
            >
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
      <Footer />
    </>
  );
}

export default Certifications;
