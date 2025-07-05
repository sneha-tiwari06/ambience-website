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

  // ...existing code...
  useEffect(() => {
    const fetchGalleryDetails = async () => {
      try {
        const response = await axiosInstance.get(`/gallery-image/${id}`);
        // Sort images by priority (ascending)
        const sortedImages = response.data.sort(
          (a, b) => a.priority - b.priority
        );
        setImages(sortedImages);
        console.log("Fetched images:", sortedImages);
      } catch (error) {
        console.error("Error fetching gallery details:", error);
      }
    };

    fetchGalleryDetails();
  }, [id]);
  // ...existing code...

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
              <h3 className="mb-4">{projectName || "Gallery"}</h3>
            )}
            {images.length > 0 && (
              <p className="mb-0">{images[0].altText}</p>
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
                        data-sub-html={`${image.caption || "Gallery Image"}`}
                      >
                        <div className="img-fluid position-relative">
                          <img
                            src={`${IMAGE_URL}/${image.thumbnailImagePath}`}
                            alt={image.caption || "Gallery Image"}
                            className="img-thumbnail"
                          />
                          <span className="caption badge bg-dark text-white position-absolute start-0 bottom-0 ms-2 mb-2 rounded-0">{image.caption || "Gallery"}</span>
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
