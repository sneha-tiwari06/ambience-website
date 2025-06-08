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
import { axiosInstance, IMAGE_URL } from "../utils/axiosInstance";
import ContentLoader from "react-content-loader";
import Footer from "../widgets/footer";

function Home() {
  const [pointers, setPointers] = useState([]);
  const [banners, setBanner] = useState([]);
  const [overviewData, setOverviewData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getFullImageUrl = (path) => `${IMAGE_URL}${path}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pointerRes, bannerRes, overviewRes] = await Promise.all([
          axiosInstance.get("/pointers"),
          axiosInstance.get("/banner-images"),
          axiosInstance.get("/overview"),
        ]);

        const pointerData = pointerRes.data[0];
        setPointers([
          pointerData.pointer1,
          pointerData.pointer2,
          pointerData.pointer3,
          pointerData.pointer4,
        ]);

        const formattedBanners = bannerRes.data.map((banner) => ({
          ...banner,
          fullImageUrl: getFullImageUrl(banner.imageUrl),
          fullMobileImageUrl: getFullImageUrl(banner.mobileImageUrl),
          fullTabImageUrl: getFullImageUrl(banner.tabImageUrl),
        }));
        setBanner(formattedBanners);

        setOverviewData(overviewRes.data[0]);
      } catch (error) {
        console.error("Error loading home data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatContent = (content) => {
    if (typeof content !== "string") return null;
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const paragraphs = doc.querySelectorAll("p");
    return Array.from(paragraphs)
      .slice(0, 2)
      .map((para, index) => (
        <div className="col-md-6 col-sm-6 overview-text text-justify" key={index}>
          <p className="mb-0" dangerouslySetInnerHTML={{ __html: para.outerHTML }} />
        </div>
      ));
  };

  if (loading) {
    return (
      <div className="container-lg py-5" style={{ minHeight: "80vh" }}>
        <ContentLoader height={400} width="100%" viewBox="0 0 800 400">
          <rect x="0" y="0" rx="5" ry="5" width="100%" height="200" />
          <rect x="0" y="220" rx="4" ry="4" width="75%" height="20" />
          <rect x="0" y="250" rx="4" ry="4" width="50%" height="20" />
          <rect x="0" y="280" rx="4" ry="4" width="60%" height="20" />
        </ContentLoader>
      </div>
    );
  }

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 5000 }}
        navigation
        pagination={{ clickable: true }}
        loop
        className="banner"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner._id} className="h-auto">
            <picture>
              <source media="(max-width: 576px)" srcSet={banner.fullMobileImageUrl} />
              <source media="(max-width: 768px)" srcSet={banner.fullTabImageUrl} />
              <img
                src={banner.fullImageUrl}
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
          <div className="row gy-3">
            {pointers.map((pointer, index) => (
              <div
                key={index}
                className={`col-lg-3 col-6 hm-service-box ${
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
        <hr className="my-0" />
      </div>
      <Clients />
      <div className="container-lg">
        <hr className="my-0" />
      </div>

      <div className="w-100 padding position-relative overflow-hidden overview-section">
        <div className="container-lg">
          <div className="heading">
            <span className="h6 text-brown">Overview</span>
            <h3 className="mb-0">Delivering inspired spaces</h3>
          </div>
          <div className="row g-4">{formatContent(overviewData?.content)}</div>
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
      <div className="container-lg">
        <hr className="my-0" />
      </div>
      <HomeTestimonials />
      <Footer />
    </>
  );
}

export default Home;
