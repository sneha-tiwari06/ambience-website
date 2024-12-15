import React, { useEffect, useState } from "react";
import Swiper from "swiper/bundle";
import "swiper/bundle";
import { axiosInstance, IMAGE_URL } from "../utils/axiosInstance";

function OngoingProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/projects")
      .then((response) => {
        const ongoingProjects = response.data.filter(
          (project) => project.category === "ongoing"
        );
        console.log(ongoingProjects);
        setProjects(ongoingProjects);
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
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);
  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-IN").format(num); // Using Indian locale to handle 2,25,000 format
  };
  return (
    <div className="w-100 padding project-section">
      <div className="container-lg">
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
      </div>
    </div>
  );
}

export default OngoingProjects;
