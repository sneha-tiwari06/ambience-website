import React, { useEffect, useState } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import { axiosInstance, IMAGE_URL } from "../utils/axiosInstance";

function CompletedProjects() {
  const [completedProjects, setCompletedProjects] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/projects")
      .then((response) => {
        const filteredProjects = response.data.filter(
          (project) => project.category === "completed"
        );
        console.log(filteredProjects);
        setCompletedProjects(filteredProjects);
      })
      .catch((error) => {
        console.error("There was an error fetching the completed projects!", error);
      });
  }, []);

  useEffect(() => {
    new Swiper(".projectWork-slider", {
      slidesPerView: 3,
      spaceBetween: 20,
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
          <div className="heading">
            <h3 className="mb-0">Completed Projects</h3>
          </div>
          <div className="projectContainer">
            <div className="row gap-row">
              {completedProjects.length > 0 ? (
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
                                <b>{formatNumber(completed.areas[index])} sft</b>
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
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompletedProjects;
