import React from 'react';
import { IoIosArrowDropleftCircle } from 'react-icons/io';
import { PiDotsThreeCircleFill, PiWarningCircle, PiPencilLight, PiNewspaperLight } from 'react-icons/pi';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';

const CreateCourse = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/'); // Redirect to the home page
  };

  return (
    <div className="container mt-3">
      {/* Navbar */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <IoIosArrowDropleftCircle size={24} onClick={handleGoBack} style={{ cursor: 'pointer', color: '#F4F5F9' }} />
        <h2 className="m-0">Жаңа курс</h2>
        <PiDotsThreeCircleFill size={24} style={{ color: '#F4F5F9' }} />
      </div>

      {/* Warning Message */}
      <div className="d-flex align-items-center mb-3">
        <PiWarningCircle size={24} className="text-primary me-2" />
        <span className="text-primary">
          Алдымен курс қосыңыз, одан әрі сабақты қосыңыз
        </span>
      </div>

      {/* Input Fields */}
      <div className="mb-3">
        <div className="input-group rounded">
          <input
            type="text"
            className="form-control rounded-start input-bg"
            placeholder="Курс тақырыбы"
            style={{ height: '50px' }} // Set a fixed height for input
          />
          <span className="input-group-text bg-light input-bg rounded-end" style={{ border: 'none' }}>
            <PiPencilLight />
          </span>
        </div>
      </div>

      <div className="mb-3">
        <div className="input-group rounded">
          <input
            type="text"
            className="form-control rounded-start input-bg"
            placeholder="Курсты сипаттау"
            style={{ height: '50px' }} // Set a fixed height for input
          />
          <span className="input-group-text bg-light input-bg rounded-end" style={{ border: 'none' }}>
            <PiNewspaperLight />
          </span>
        </div>
      </div>

      {/* Add Button */}
      <div className="d-grid">
        <button className="btn btn-primary rounded-pill">
          Қосу
        </button>
      </div>

      <style jsx>{`
        .input-bg {
          background-color: #F4F5F9 !important;
          border: none;
          border-radius: 50px !important; /* Makes the input more rounded */
        }
        .input-group-text {
          background-color: #F4F5F9 !important;
          border: none;
          display: flex;
          align-items: center; /* Center icon vertically */
          justify-content: center; /* Center icon horizontally */
        }
        .form-control:focus {
          box-shadow: none;
        }
      `}</style>
    </div>
  );
};

export default CreateCourse;