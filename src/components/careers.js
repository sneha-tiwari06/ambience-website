import React, { useEffect, useState } from 'react';
import { Modal } from 'bootstrap';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosInstance';

function Careers() {
  const [modalData, setModalData] = useState({
    role: '',
    location: ''
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const careerModal = document.getElementById('careerModal');
    if (!careerModal) return;

    const modalInstance = new Modal(careerModal);

    if (showModal) {
      modalInstance.show();
    } else {
      modalInstance.hide();
    }

    careerModal.addEventListener('hidden.bs.modal', () => {
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    });

    return () => {
      careerModal.removeEventListener('hidden.bs.modal', () => {});
    };
  }, [showModal]);

  useEffect(() => {
    const careerCards = document.querySelectorAll('.career-card');

    careerCards.forEach((card) => {
      const applyNowButton = card.querySelector('.readmore button');
      if (applyNowButton) {
        applyNowButton.addEventListener('click', () => {
          const role = card.querySelector('.job-role').textContent;
          const location = card.querySelector('.job-location').textContent;

          setModalData({ role, location });
          setShowModal(true);
        });
      }
    });

    return () => {
      careerCards.forEach((card) => {
        const applyNowButton = card.querySelector('.readmore button');
        if (applyNowButton) {
          applyNowButton.removeEventListener('click', () => {});
        }
      });
    };
  }, []);

  // API integration
  const [careers, setCareers] = useState([]);
  useEffect(() => {
    axiosInstance.get('/careers')
      .then(response => {
        setCareers(response.data);
      })
      .catch(error => {
        console.error('Error Fetching Data:', error);
      });
  }, []);

  if (!careers.length) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="breadcrumbContainer">
        <div className="container-lg">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to='/'>Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Careers
            </li>
          </ol>
        </div>
      </div>

      <div className="w-100 padding project-section">
        <div className="container-lg">
          <div className="heading">
            <span className="h6 text-brown">Current Openings</span>
            <h3 className="mb-0">Choose the role that suits you?</h3>
          </div>
          <div className="careerForm">
            <div className="row g-2">
              {/* Map over careers array to display multiple career cards */}
              {careers.map((career) => (
                <div className="col-md-4 career-card" key={career._id}>
                  <div className="card inside">
                    <div className="card-header pt-0 px-0">
                      <p className="mb-0">Role</p>
                      <h5 className="mb-0 job-role">{career.role}</h5>
                    </div>
                    <div className="card-body px-0">
                      <h6 className="font-weight-bold">Role Description</h6>
                      <p className="mb-0">{career.description}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <strong>Positions</strong>
                        <span className="job-positions">{career.position}</span>
                      </li>
                      <li className="list-group-item">
                        <strong>Experience</strong>
                        <span className="job-experience">{career.experience}</span>
                      </li>
                      <li className="list-group-item">
                        <strong>Location</strong>
                        <span className="job-location">{career.location}</span>
                      </li>
                    </ul>
                    <div className="readmore">
                      <button
                        type="button"
                        className="button"
                        onClick={() => {
                          setModalData({
                            role: career.role,
                            location: career.location
                          });
                          setShowModal(true);
                        }}
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="careerModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="careerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="row mx-0">
              <div className="col-md-5 px-0">
                <img
                  src="./images/career-modal-img.jpg"
                  className="h-100 object-cover"
                  alt=""
                />
              </div>
              <div className="col-md-7 px-0">
                <div className="modal-header rounded-0">
                  <h5 className="modal-title" id="careerModalLabel">{modalData.role}</h5>
                  <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row">
                      <div className="col-sm-6 form-group">
                        <label htmlFor="car_name">Name*</label>
                        <input
                          type="text"
                          className="form-control"
                          id="car_name"
                          name="car_name"
                        />
                      </div>
                      <div className="col-sm-6 form-group">
                        <label htmlFor="car_email">Email*</label>
                        <input
                          type="text"
                          className="form-control"
                          id="car_email"
                          name="car_email"
                        />
                      </div>
                      <div className="col-sm-6 form-group">
                        <label htmlFor="car_mobile">Mobile*</label>
                        <input
                          type="text"
                          className="form-control"
                          id="car_mobile"
                          name="car_mobile"
                        />
                      </div>
                      <div className="col-sm-6 form-group">
                        <label htmlFor="car_location">Location</label>
                        <input
                          type="text"
                          className="form-control bg-white"
                          id="car_location"
                          name="car_location"
                          value={modalData.location}
                          readOnly
                        />
                      </div>
                      <div className="col-sm-12 form-group mb-0">
                        <label htmlFor="car_resume">Resume*</label>
                        <input
                          type="file"
                          className="form-control"
                          id="car_resume"
                        />
                      </div>
                    </div>
                    <input type="hidden" name="car_role" id="car_role" value={modalData.role} />
                    <div className="readmore">
                      <button type="submit" className="button">
                        Apply Now
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Careers;
