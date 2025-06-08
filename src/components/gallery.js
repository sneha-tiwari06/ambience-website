import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance, IMAGE_URL } from "../utils/axiosInstance";
import Footer from "../widgets/footer";

function Gallery() {
  const [gallery, setGallery] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("/gallery")
      .then((response) => {
        // Sort the gallery data based on the priority field
        const sortedGallery = response.data.sort(
          (a, b) => a.priority - b.priority
        );
        setGallery(sortedGallery);
      })
      .catch((error) => {
        console.error("There was an error fetching the gallery images!", error);
      });
  }, []);

  return (
    <>
      <div className="breadcrumbContainer">
        <div className="container-lg">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Gallery
            </li>
          </ol>
        </div>
      </div>

      <div className="w-100 padding project-section">
        <div className="container-lg">
          <div className="heading">
            <h3 className="mb-0">Gallery</h3>
          </div>
          <div className="projectContainer">
            <div className="row gap-row">
              {gallery.map((gallery) => (
                <div
                  key={gallery._id}
                  className="col-sm-4 projectBox galleryBox"
                >
                  <Link
                    to={`/project-details/${gallery._id}`}
                    className="inside"
                  >
                    <div className="img-fluid">
                      <img
                        src={`${IMAGE_URL}${gallery.image}`}
                        alt={gallery.logoAltText || "gallery Logo"}
                      />
                    </div>
                    <div className="project-name">
                      <span>{gallery.location}</span>
                      <p className="mb-0">{gallery.projectName}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Gallery;
