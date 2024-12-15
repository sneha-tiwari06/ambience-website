import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import LightGallery from 'lightgallery/react';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';

import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { axiosInstance, IMAGE_URL } from '../utils/axiosInstance';

function GalleryDetails() {
    const { id } = useParams();
    const [images, setImages] = useState([]);
    const [metaDetails, setMetaDetails] = useState(null);

    useEffect(() => {
        const fetchMetaDetails = async () => {            
            try {
                const response = await axiosInstance.get(`/gallery/${id}`);
                const fetchedMeta = response.data?.data;
                if (!fetchedMeta) {
                    console.warn('Meta details are missing in the response.');
                    return;
                }
    
                setMetaDetails(fetchedMeta);
                document.title = fetchedMeta.metaTitle || 'Gallery | Ambience';
                document
                    .querySelector('meta[name="description"]')
                    ?.setAttribute('content', fetchedMeta.metaDescription || 'Explore our stunning project gallery at Ambience.');
                document
                    .querySelector('meta[name="keywords"]')
                    ?.setAttribute('content', fetchedMeta.metaKeywords || 'Ambience, Gallery, Projects');
            } catch (error) {
                console.error('Error fetching meta details:', error);
            }
        };
    
        fetchMetaDetails();
    }, [id]);
    
    

    useEffect(() => {
        const fetchGalleryDetails = async () => {
            try {
                const response = await axiosInstance.get(`/gallery-image/${id}`);
                setImages(response.data);
            } catch (error) {
                console.error('Error fetching gallery details:', error);
            }
        };

        fetchGalleryDetails();
    }, [id]);

    const projectName = metaDetails ? metaDetails.projectName : '';

    return (
        <>
            <div className="breadcrumbContainer">
                <div className="container-lg">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/gallery">Gallery</Link></li>
                        {projectName && (
                            <li className="breadcrumb-item active" aria-current="page">
                                {projectName}
                            </li>
                        )}
                    </ol>
                </div>
            </div>
            <div className="w-100 padding project-section">
                <div className="container-lg">
                    <div className="heading">
                        {projectName && (
                            <h3 className="text-center mb-0"> {projectName || 'Gallery'}</h3>
                        )}
                    </div>
                    <div className="projectContainer">
                        <LightGallery plugins={[lgThumbnail, lgZoom]} selector=".projectBox a" >
                            {images.length > 0 ? (

                                <div className="row g-4">
                                    {images.map((image) => (
                                        <div key={image._id} className="col-sm-4 inside projectBox galleryBox">
                                            <a
                                                href={`${IMAGE_URL}/${image.originalImagePath}`}
                                                data-src={`${IMAGE_URL}/${image.originalImagePath}`}
                                                data-sub-html={image.altText || 'Project Gallery'}

                                            >
                                                <div className="img-fluid">
                                                    <img
                                                        src={`${IMAGE_URL}/${image.thumbnailImagePath}`}
                                                        alt={image.altText || 'Gallery Image'}
                                                        className="img-thumbnail"
                                                    />
                                                </div>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>Loading gallery images...</p>
                            )}
                        </LightGallery>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GalleryDetails;
