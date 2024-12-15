import React from 'react'
import OngoingProjects from './ongoing-projects'
import CompletedProjects from './completed-projects'
import { Link } from 'react-router-dom'

function Projects() {
    return (
        <>
            <div className="breadcrumbContainer">
                <div className="container-lg">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Projects</li>
                    </ol>
                </div>
            </div>
            <OngoingProjects />
            <CompletedProjects />


        </>
    )
}

export default Projects