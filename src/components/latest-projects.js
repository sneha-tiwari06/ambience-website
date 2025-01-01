import React, { useState, useEffect } from 'react';
import { axiosInstance, IMAGE_URL } from '../utils/axiosInstance';
import { Link } from 'react-router-dom';

function LatestProjects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axiosInstance.get('/projects')
            .then(response => {
                const filteredProjects = response.data.filter(project => project.showOnHomePage);
                setProjects(filteredProjects);
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
            });
    }, []);

    return (
        <div className="w-100 padding project-section">
            <div className="container-lg">
                <div className="headingContainer px-lg-3 d-flex justify-content-between align-items-center">
                    <div className="heading mb-0">
                        <span className="h6 text-brown">Latest Works</span>
                        <h3 className="mb-0">Some of our projects</h3>
                    </div>
                    <div className="viewmore w-auto mt-0">
                        <Link to='/projects' className="button"><span>Explore more</span></Link>
                    </div>
                </div>
                <div className="projectContainer">
                    <div className="row gap-row">
                        {projects.map((project, index) => (
                            <div key={project._id} className="col-sm-4 projectBox">
                                <Link to='/gallery' className="inside" data-count={index + 1}>
                                    <div className="img-fluid">
                                    <img src={`${IMAGE_URL}/${project.imagePath}`} alt={project.altText} />
                                    </div>
                                    <div className="project-name">
                                        <span>{project.location}</span>
                                        <p className="mb-0">{project.projectName}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LatestProjects;
