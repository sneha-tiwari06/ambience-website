import React, { useEffect, useState } from 'react';
import { axiosInstance, IMAGE_URL } from '../utils/axiosInstance';

function Spotlight() {
  const [spotlightData, setSpotlightData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get('/spotlights')
      .then((response) => {
        setSpotlightData(response.data[0]); 
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-100 padding position-relative overflow-hidden hm-spotlight-wrapper">
      <div className="container-lg">
        <div className="heading">
          <span className="h6 text-brown">Spotlight</span>
          <h3 className="mb-4">{spotlightData.spotlightheading}</h3>
          <p className="mb-0 col-md-8 px-0">{spotlightData.spotlightcontent}</p>
        </div>
        <article className="generic-article">
          <div className="row gap-row">
            {[spotlightData.spotlightPointer1, spotlightData.spotlightPointer2, spotlightData.spotlightPointer3].map((info, index) => (
              <div key={index} className="col-lg-3 col-sm-6 genericBox">
                <div className="inside">
                  <p className="mb-0 font-weight-bold">{info}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
      <div className="parallax-video-container">
        <img
          src={`${IMAGE_URL}/${spotlightData.imageUrl}`}
          className="w-100 h-100 object-cover"
        />
      </div>
    </div>
  );
}

export default Spotlight;
