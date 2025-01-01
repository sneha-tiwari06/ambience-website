import React, { useEffect, useState } from "react";
import Swiper from "swiper";
import "swiper/css/bundle";
import { axiosInstance, IMAGE_URL } from "../utils/axiosInstance";

function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/clients")
      .then((response) => {
        const activeClients = response.data.filter((client) => client.active);
        setClients(activeClients);

        const swiper2 = new Swiper(".project-logo-slider", {
          slidesPerView: "auto",
          centeredSlides: true,
          loop: true,
          allowTouchMove: false,
          speed: 3000,
          autoplay: {
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          },
        });

        return () => {
          if (swiper2 && swiper2.destroy) {
            swiper2.destroy(true, true);
          }
        };
      })
      .catch((error) => {
        console.error("Error fetching client data:", error);
      });
  }, []);

  return (
    <div className="w-100 padding hm-clients-wrapper">
      <div className="container-lg">
        <div className="heading">
          <span className="h6 text-brown">Clientele</span>
          <h3 className="mb-0">Valuable Clients</h3>
        </div>
        <div className="project-logos">
          <div className="swiper project-logo-slider mb-3">
            <div className="swiper-wrapper">
              {clients.map((client) => (
                <div className="swiper-slide" key={client._id}>
                  <div className="inside">
                    <img
                      src={`${IMAGE_URL}/${client.image}`}
                      alt={client.altText}
                    />
                  </div>
                </div>
              ))}
              
              {clients.map((client) => (
                <div className="swiper-slide" key={client._id}>
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
          <div dir="rtl" className="swiper project-logo-slider">
            <div className="swiper-wrapper">
              {clients.map((client) => (
                <div className="swiper-slide" key={client._id}>
                  <div className="inside">
                    <img
                      src={`${IMAGE_URL}/${client.image}`}
                      alt={client.altText}
                    />
                  </div>
                </div>
              ))}
              {clients.map((client) => (
                <div className="swiper-slide" key={client._id}>
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
