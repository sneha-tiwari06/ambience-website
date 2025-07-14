import React, { useEffect, useState } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import { axiosInstance, IMAGE_URL } from "../utils/axiosInstance";
import ContentLoader from "react-content-loader";

function CompletedProjects() {
  const [completedProjects, setCompletedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/projects")
      .then((response) => {
        const filteredProjects = response.data.filter(
          (project) => project.category === "completed"
        );
        console.log(filteredProjects);
        setCompletedProjects(filteredProjects);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the completed projects!",
          error
        );
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    new Swiper(".projectWork-slider", {
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
          spaceBetween: 10,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
    });
  }, [completedProjects]);
  const formatNumber = (num) => {
    return num.toLocaleString("en-IN"); // This will format the number with commas (Indian number system)
  };
  return (
    <>
      <div className="container-lg">
        <hr className="my-0" />
      </div>

      <div className="w-100 padding project-section">
        <div className="container-lg">
          <div className="heading px-lg-3">
            <h3 className="mb-0">Completed Projects</h3>
          </div>
          <div className="projectContainer">
            <div className="row gap-row">
              {loading ? (
                <div style={{ display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'center', minHeight: '200px', width: '100%' }}>
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
                completedProjects.length > 0 ? (
                  completedProjects.map((completed) => (
                    <div
                      key={completed._id}
                      className="col-lg-4 col-sm-6 projectBox completed-projectBox"
                    >
                      <div className="inside">
                        <div className="img-fluid">
                          <img
                            src={`${IMAGE_URL}/${completed.imagePath}`}
                            alt={completed.altText}
                          />
                        </div>
                        <div className="project-name">
                          <p>{completed.projectName}</p>
                          <div className="swiper projectWork-slider">
                            <div className="swiper-wrapper">
                              {completed.locations.map((loc, index) => (
                                <div
                                  key={index}
                                  className="swiper-slide projectWork-box"
                                >
                                  {loc}
                                  <br />
                                  <b>
                                    {formatNumber(completed.areas[index])} sft
                                  </b>
                                </div>
                              ))}
                            </div>
                            <div
                              className="bottom-controls mt-3 justify-content-start"
                              style={{ gap: "5px" }}
                            >
                              <div className="swiper-button-prev sm"></div>
                              <div className="swiper-button-next sm"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No completed projects found.</p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompletedProjects;
