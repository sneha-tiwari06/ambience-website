import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/bundle";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import LatestProjects from "./latest-projects";
import Clients from "../homepage/clients";
import StatsSection from "../homepage/stats";
import Spotlight from "../homepage/spotlights";
import AwardsCertification from "../homepage/awardsCertfication";
import HomeTestimonials from "../homepage/home-testimonials";
import { axiosInstance } from "../utils/axiosInstance";

function Home() {
  const BASE_URL = "https://ambience.in/apis";
  // const BASE_URL = "http://localhost:5000";
  const [pointers, setPointers] = useState([]);
  useEffect(() => {
    // Fetch data using axios
    axiosInstance
      .get("/pointers")
      .then((response) => {
        const data = response.data;
        if (data && data.length > 0) {
          const { pointer1, pointer2, pointer3, pointer4 } = data[0];
          setPointers([pointer1, pointer2, pointer3, pointer4]);
        }
      })
      .catch((error) => console.error("Error fetching pointers:", error));
  }, []);
  const getFullImageUrl = (path) => `${BASE_URL}${path}`;
  const [banners, setBanner] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("/banner-images")
      .then((response) => {
        const formattedBanners = response.data.map((banner) => ({
          ...banner,
          fullImageUrl: getFullImageUrl(banner.imageUrl), // Desktop image
          fullMobileImageUrl: getFullImageUrl(banner.mobileImageUrl), // Mobile image
          fullTabImageUrl: getFullImageUrl(banner.tabImageUrl), // Tablet image
        }));
        setBanner(formattedBanners);
      })
      .catch((error) => {
        console.error("There was an error fetching the banner image!", error);
      });
  }, []);
  const [overviewData, setOverviewData] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/overview")
      .then((response) => {
        setOverviewData(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const formatContent = (content) => {
    if (typeof content !== "string") return null;
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const paragraphs = doc.querySelectorAll("p");
    return Array.from(paragraphs)
      .slice(0, 2)
      .map((para, index) => (
        <div
          className="col-md-6 col-sm-6 overview-text text-justify"
          key={index}
        >
          <p
            className="mb-0"
            dangerouslySetInnerHTML={{ __html: para.outerHTML }}
          />
        </div>
      ));
  };

  if (!overviewData) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 5000 }}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        className="banner"
      >
       {banners.map((banner) => (
      <SwiperSlide key={banner._id} className="h-auto">
        <picture>
          <source
            media="(max-width: 576px)" // Mobile breakpoint
            srcSet={banner.fullMobileImageUrl}
          />
          <source
            media="(max-width: 768px)" // Tablet breakpoint
            srcSet={banner.fullTabImageUrl}
          />
          <img
            src={banner.fullImageUrl} // Default to desktop image
            alt={banner.altText || "Banner"}
            className="d-block h-100 object-cover"
          />
        </picture>
        <div className="bannerText">
          <p dangerouslySetInnerHTML={{ __html: banner.bannerText }}></p>
          <div className="readmore solid white">
            <Link to="/about-us" className="button mx-auto">
              Learn More
            </Link>
          </div>
        </div>
      </SwiperSlide>
    ))}
      </Swiper>

      <div className="w-100 py-3 hm-services-container bg-dark text-white text-center">
        <div className="container-lg">
          <div className="row gap-row">
            {pointers.map((pointer, index) => (
              <div
                key={index}
                className={`col-lg-3 hm-service-box ${
                  index < pointers.length - 1 ? "border-end" : ""
                }`}
              >
                <div className="inside">
                  <p className="mb-0 text-uppercase">{pointer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <LatestProjects />
      <div className="container-lg">
        <hr class="my-0" />
      </div>
      <Clients />
      <div class="container-lg">
        <hr class="my-0" />
      </div>
      <div className="w-100 padding position-relative overflow-hidden overview-section">
        <div className="container-lg">
          <div className="heading">
            <span className="h6 text-brown">Overview</span>
            <h3 className="mb-0">Delivering inspired spaces</h3>
          </div>
          <div className="row g-4">{formatContent(overviewData.content)}</div>
          <div className="viewmore">
            <Link to="/about-us" className="button">
              <span>Read more</span>
            </Link>
          </div>
        </div>
      </div>
      <StatsSection />
      <Spotlight />
      <AwardsCertification />
      <div class="container-lg">
        <hr class="my-0" />
      </div>
      <HomeTestimonials />
    </>
  );
}

export default Home;
