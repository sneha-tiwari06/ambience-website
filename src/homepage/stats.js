import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../utils/axiosInstance';
const StatsSection = () => {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const [count3, setCount3] = useState(0);
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

    useEffect(() => {
        if (overviewData) {
            const { area, deliveredProjects, happyCustomers } = overviewData;
            const duration = 4000;

            const step1 = area / (duration / 50);
            const step2 = deliveredProjects / (duration / 50);
            const step3 = happyCustomers / (duration / 50);

            const interval1 = setInterval(() => {
                setCount1(prev => {
                    if (prev < area) {
                        return Math.min(prev + step1, area);
                    }
                    clearInterval(interval1);
                    return prev;
                });
            }, 50);

            const interval2 = setInterval(() => {
                setCount2(prev => {
                    if (prev < deliveredProjects) {
                        return Math.min(prev + step2, deliveredProjects);
                    }
                    clearInterval(interval2);
                    return prev;
                });
            }, 50);

            const interval3 = setInterval(() => {
                setCount3(prev => {
                    if (prev < happyCustomers) {
                        return Math.min(prev + step3, happyCustomers);
                    }
                    clearInterval(interval3);
                    return prev;
                });
            }, 50);

            return () => {
                clearInterval(interval1);
                clearInterval(interval2);
                clearInterval(interval3);
            };
        }
    }, [overviewData]);
    if (!overviewData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-100 stats-section padding pt-0">
            <div className="container-lg">
                <div className="stats">
                    <div className="row">
                        <div className="col-sm-4 statsBox">
                            <div className="inside">
                                <div className="h4">
                                    {Math.round(count1)} <small>M</small>
                                </div>
                                <p>Sq.Ft. Area Developed</p>
                            </div>
                        </div>
                        <div className="col-sm-4 statsBox">
                            <div className="inside">
                                <div className="h4">
                                    {Math.round(count2)} <small>+</small>
                                </div>
                                <p>Delivered Projects</p>
                            </div>
                        </div>
                        <div className="col-sm-4 statsBox">
                            <div className="inside">
                                <div className="h4">
                                    {Math.round(count3)} <small>+</small>
                                </div>
                                <p>Happy Customers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsSection;
