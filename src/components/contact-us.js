import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { axiosInstance } from '../utils/axiosInstance';

function ContactUs() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        message: "",
      });
    
      const [status, setStatus] = useState("");
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("");
      
        try {
          const response = await axiosInstance.post("/contact-us", formData);
          alert("Form submitted successfully!"); // Show success alert
          setStatus(response.data.message);
          setFormData({
            name: "",
            email: "",
            mobile: "",
            message: "",
          });
        } catch (error) {
          alert("Failed to submit the form."); // Show failure alert
          setStatus(error.response?.data?.message || "Submission failed");
        }
      };
      
    return (
        <>
            <div className="breadcrumbContainer">
                <div className="container-lg">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Contact Us</li>
                    </ol>
                </div>
            </div>

            <div className="w-100 padding project-section">
                <div className="container-lg">
                    <div className="heading">
                        <h3 className="mb-0">Contact Us</h3>
                    </div>
                    <div className="row g-0">
                        <div className="col-md-6 contactBox">
                            <div className="inner">
                                <h5>NCR</h5>
                                <ul className="list-inline contactList">
                                    <li><a href="#"><i className="fa fa-map-marker-alt"></i> <span>441-P, Pace City-II, Sector - 37, Gurgaon</span></a></li>
                                    <li><a href="#"><i className="fa fa-phone"></i> <span>+91 124 4967777</span></a></li>
                                    <li><a href="#"><i className="fa fa-envelope"></i> <span>mail@ambience.co.in</span></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6 contactBox">
                            <div className="locMap h-100"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.3363248201094!2d76.99734601199916!3d28.439276263456566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d17ed6db9e807%3A0x726dd3d32b612194!2sAmbience+Interiors+Pvt+Ltd!5e0!3m2!1sen!2sin!4v1558000879444!5m2!1sen!2sin" frameborder="0" style={{border:"0"}} allowfullscreen="" className="w-100"></iframe></div>
                        </div>
                    </div>
                    <div className="row g-0 flex-row-reverse">
                        <div className="col-md-6 contactBox">
                            <div className="inner">
                                <h5>Bangalore</h5>
                                <ul className="list-inline contactList">
                                    <li><a href="#"><i className="fa fa-map-marker-alt"></i> <span>2nd Floor ,Times Square, No.319/C, 2nd Main, Kasturi Nagar (East of NGEF), Bangalore – 560043.</span></a></li>
                                    <li><a href="#"><i className="fa fa-phone"></i> <span>+91 80 42192947</span></a></li>
                                    <li><a href="#"><i className="fa fa-envelope"></i> <span>mail@ambience.co.in</span></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6 contactBox">
                            <div className="locMap h-100"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.4814329491855!2d77.65849682771209!3d13.0049849822439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae112e0b12960b%3A0x50eef9d3916c72a!2sAmbience+Interiors+Pvt.+Ltd.!5e0!3m2!1sen!2sin!4v1558001003446!5m2!1sen!2sin" frameborder="0" style={{border:"0"}} allowfullscreen="" className="w-100"></iframe></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-lg">
                <hr className="my-0" />
            </div>

            <div className="w-100 padding project-section">
                <div className="container-lg">
                    <div className="heading">
                        <h3 className="mb-0">Get In Touch</h3>
                    </div>
                    <div className="contactform">
                        <form id="contactus" onSubmit={handleSubmit} enctype="multipart/form-data">
                            <span className="status text-danger"></span>
                            <div className="row">
                                <div className="col-sm-4 form-group"><input type="text" name="name" id="name" value={formData.name}
            onChange={handleChange}placeholder="Name*" className="form-control" /></div>
                                <div className="col-sm-4 form-group"><input type="email" id="email" name="email" value={formData.email}
            onChange={handleChange} placeholder="Email*" className="form-control" /></div>
                                <div className="col-sm-4 form-group"><input type="text" name="mobile" id="mobile" value={formData.mobile}
            onChange={handleChange} placeholder="Mobile*" className="form-control" /></div>
                                <div className="col-sm-12 form-group"><textarea name="message" id="message" value={formData.message}
            onChange={handleChange} cols="30" rows="4" className="form-control" placeholder="Write your message"></textarea></div>
                            </div>
                            <div className="readmore">
                                <input type="hidden" name="contactus" value="active" />
                                    <button type="submit" className="button" name="submit"><span>Submit</span></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactUs