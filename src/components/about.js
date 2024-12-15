import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosInstance';

function About() {
    const [overviewData, setOverviewData] = useState(null);

    useEffect(() => {
        axiosInstance.get('/overview')
            .then(response => {
                setOverviewData(response.data[0]);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
   
    if (!overviewData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="breadcrumbContainer">
                <div className="container-lg">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">About Us</li>
                    </ol>
                </div>
            </div>

            <div className="w-100 padding project-section">
                <div className="container-lg">
                    <div className="heading">
                        <span className="h6 text-brown">About Us</span>
                    </div>
                    <div className="row">
                        <div className="col-md-12 overview-text">
                            <div className="inside text-justify">
                            <p dangerouslySetInnerHTML={{ __html: overviewData.content }}></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-100 stats-section padding pt-0">
                <div className="container-lg">
                    <div className="stats">
                        <div className="row">
                            <div className="col-sm-4 statsBox">
                                <div className="inside">
                                    <div className="h4"><span className="counter">{overviewData.area}</span> <small>M</small></div>
                                    <p>Sq.Ft. Area Developed</p>
                                </div>
                            </div>
                            <div className="col-sm-4 statsBox">
                                <div className="inside">
                                    <div className="h4"><span className="counter">{overviewData.deliveredProjects}</span> <small>+</small></div>
                                    <p>Delivered Projects</p>
                                </div>
                            </div>
                            <div className="col-sm-4 statsBox">
                                <div className="inside">
                                    <div className="h4"><span className="counter">{overviewData.happyCustomers}</span> <small>+</small></div>
                                    <p>Happy Customers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;
