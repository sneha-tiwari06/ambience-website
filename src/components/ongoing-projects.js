import React, { useEffect, useState } from "react";
import Swiper from "swiper/bundle";
import "swiper/bundle";
import { axiosInstance, IMAGE_URL } from "../utils/axiosInstance";
import ContentLoader from "react-content-loader";

function OngoingProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/projects")
      .then((response) => {
        const ongoingProjects = response.data.filter(
          (project) => project.category === "ongoing" && project.isActive === true
        );
        console.log(ongoingProjects);
        setProjects(ongoingProjects);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading && projects.length > 0) {
      new Swiper(".project-slider", {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        speed: 1500,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
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
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
      });
    }
  }, [loading, projects]);
  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-IN").format(num); // Using Indian locale to handle 2,25,000 format
  };
  return (
    <div className="w-100 padding project-section">
      <div className="container-lg">
        {loading ? (
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
            {[1,2,3].map((i) => (
              <ContentLoader
                key={i}
                speed={2}
                width={300}
                height={220}
                viewBox="0 0 300 220"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                style={{ borderRadius: 12 }}
              >
                {/* Image rectangle */}
                <rect x="15" y="15" rx="8" ry="8" width="80" height="80" />
                {/* Project name */}
                <rect x="110" y="25" rx="4" ry="4" width="170" height="18" />
                {/* Location */}
                <rect x="110" y="55" rx="4" ry="4" width="120" height="14" />
                {/* Areas */}
                <rect x="110" y="75" rx="4" ry="4" width="90" height="14" />
                {/* GC Works */}
                <rect x="110" y="95" rx="4" ry="4" width="60" height="14" />
                {/* Bottom bar */}
                <rect x="15" y="110" rx="6" ry="6" width="270" height="16" />
              </ContentLoader>
            ))}
          </div>
        ) : (
          <div className="swiper projectContainer project-slider">
            <div className="headingContainer px-lg-3 d-flex justify-content-between align-items-center">
              <div className="heading mb-0">
                <h3 className="mb-0">Ongoing Projects</h3>
              </div>
              <div className="bottom-controls mr-0 justify-content-end">
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
              </div>
            </div>
            <div className="swiper-wrapper">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <div className="swiper-slide projectBox" key={project._id}>
                    <div className="inside">
                      <div className="img-fluid">
                        <div className="projectBox-logo">
                          <img
                            src={`${IMAGE_URL}/${project.imagePath}`}
                            alt={project.altText}
                          />
                        </div>
                      </div>
                      <div className="project-name">
                        <span>
                          {project.locations && project.locations.join(", ")}
                        </span>
                        <p className="mb-0">{project.projectName}</p>
                        <ul className="list-inline">
                          <li>
                            {project.areas &&
                              project.areas
                                .map((area) => formatNumber(area))
                                .join(", ")}{" "}
                            sqft
                          </li>
                          <li>GC Works</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="swiper-slide">
                  <p>No ongoing projects available</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OngoingProjects;
