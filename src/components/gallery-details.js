import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import LightGallery from "lightgallery/react";
import logo from "./logo.png"; // ✅ Import logo properly

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import { axiosInstance, IMAGE_URL } from "../utils/axiosInstance";
import Footer from "../widgets/footer";

function GalleryDetails() {
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [metaDetails, setMetaDetails] = useState(null);

  useEffect(() => {
    const fetchMetaDetails = async () => {
      try {
        const response = await axiosInstance.get(`/gallery/${id}`);
        const fetchedMeta = response.data?.data;
        if (!fetchedMeta) {
          console.warn("Meta details are missing in the response.");
          return;
        }

        setMetaDetails(fetchedMeta);
        document.title = fetchedMeta.metaTitle || "Gallery | Ambience";
        document
          .querySelector('meta[name="description"]')
          ?.setAttribute(
            "content",
            fetchedMeta.metaDescription ||
              "Explore our stunning project gallery at Ambience."
          );
        document
          .querySelector('meta[name="keywords"]')
          ?.setAttribute(
            "content",
            fetchedMeta.metaKeywords || "Ambience, Gallery, Projects"
          );
      } catch (error) {
        console.error("Error fetching meta details:", error);
      }
    };

    fetchMetaDetails();
  }, [id]);

  useEffect(() => {
    const fetchGalleryDetails = async () => {
      try {
        const response = await axiosInstance.get(`/gallery-image/${id}`);
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching gallery details:", error);
      }
    };

    fetchGalleryDetails();
  }, [id]);

  const projectName = metaDetails ? metaDetails.projectName : "";
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
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/gallery">Gallery</Link>
            </li>
            {projectName && (
              <li className="breadcrumb-item active" aria-current="page">
                {projectName}
              </li>
            )}
          </ol>
        </div>
      </div>

      <div className="w-100 padding project-section">
        <div className="container-lg">
          <div className="heading">
            {projectName && (
              <h3 className="text-center mb-0">{projectName || "Gallery"}</h3>
            )}
          </div>
          <div className="projectContainer">
            <LightGallery
              plugins={[lgThumbnail]}
              selector=".projectBox a"
              download={false}
              subHtmlSelectorRelative={true}
              appendSubHtmlTo=".lg-sub-html"
              onAfterClose={handleAfterClose}
            >
              {images.length > 0 ? (
                <div className="row g-4">
                  {images.map((image) => (
                    <div
                      key={image._id}
                      className="col-sm-4 inside projectBox galleryBox"
                    >
                      <a
                        href={`${IMAGE_URL}/${image.originalImagePath}`}
                        data-src={`${IMAGE_URL}/${image.originalImagePath}`}
                        data-sub-html={`${image.altText || "Gallery Image"}`}
                      >
                        <div className="img-fluid">
                          <img
                            src={`${IMAGE_URL}/${image.thumbnailImagePath}`}
                            alt={image.altText || "Gallery Image"}
                            className="img-thumbnail"
                          />
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Loading gallery images...</p>
              )}
            </LightGallery>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default GalleryDetails;
