import React, { useEffect, useState } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import { axiosInstance, IMAGE_URL } from "../utils/axiosInstance";

function Clients() {
  const [clients, setClients] = useState([]);

  // Fetch client data
  useEffect(() => {
    axiosInstance
      .get("/clients")
      .then((response) => {
        const activeClients = response.data.filter((client) => client.active);
        setClients(activeClients);
      })
      .catch((error) => {
        console.error("Error fetching client data:", error);
      });
  }, []);

  // Initialize Swipers
  useEffect(() => {
    if (clients.length === 0) return;

    const swiper1 = new Swiper(".project-logo-slider-1", {
      slidesPerView: "auto",
      spaceBetween: 30,
      loop: true,
      speed: 3000,
      allowTouchMove: false,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      },
    });

    const swiper2 = new Swiper(".project-logo-slider-2", {
      slidesPerView: "auto",
      spaceBetween: 30,
      loop: true,
      speed: 3000,
      allowTouchMove: false,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
        reverseDirection: true,
      },
    });

    return () => {
      swiper1?.destroy(true, true);
      swiper2?.destroy(true, true);
    };
  }, [clients]);

  const repeatedClients = [...clients, ...clients]; // Repeat for seamless looping

  return (
    <div className="w-100 padding hm-clients-wrapper">
      <div className="container-lg">
        <div className="heading">
          <span className="h6 text-brown">Clientele</span>
          <h3 className="mb-0">Valuable Clients</h3>
        </div>

        <div className="project-logos">
          {/* Left to Right Swiper */}
          <div className="swiper project-logo-slider-1 mb-3">
            <div className="swiper-wrapper">
              {repeatedClients.map((client, index) => (
                <div className="swiper-slide" key={`left-${client._id}-${index}`}>
                  <div className="inside">
                    <img
                      src={`${IMAGE_URL}/${client.image}`}
                      alt={client.altText}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right to Left Swiper */}
          <div className="swiper project-logo-slider-2">
            <div className="swiper-wrapper">
              {repeatedClients.map((client, index) => (
                <div className="swiper-slide" key={`right-${client._id}-${index}`}>
                  <div className="inside">
                    <img
                      src={`${IMAGE_URL}/${client.image}`}
                      alt={client.altText}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clients;
