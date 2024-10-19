"use client"

import React from 'react';
import Link from 'next/link';
import GoBackIcon from "@/components/goBackIcon"; // Adjust the path if necessary
import MenuIcon from '@/components/menuIcon'; // Adjust the path if necessary
import { PiWarningCircle, PiPencilLight, PiNewspaperLight } from 'react-icons/pi';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateCourse = () => {
  return (
    <div className="container mt-3">
      {/* Navbar */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link href="/" passHref>
          
            <GoBackIcon />
       
        </Link>
        <h2 className="m-0">Жаңа курс</h2>
       
          <MenuIcon />
    
      </div>

      {/* Warning Message */}
      <div className="d-flex align-items-center mb-3">
        <PiWarningCircle size={24} className="text-primary me-2" />
        <span className="text-primary">
          Алдымен курс қосыңыз, одан әрі сабақты қосыңыз
        </span>
      </div>

    {/* Input Fields */}
{/* Input Fields */}
<div className="mb-3">
  <div className="input-group rounded">
    <span className="input-group-text input-bg rounded-start">
      <PiPencilLight />
    </span>
    <input
      type="text"
      className="form-control input-bg"
      placeholder="Курс тақырыбы"
    />
  </div>
</div>

<div className="mb-3">
  <div className="input-group rounded">
    <span className="input-group-text input-bg rounded-start">
      <PiNewspaperLight />
    </span>
    <input
      type="text"
      className="form-control input-bg"
      placeholder="Курсты сипаттау"
    />
  </div>
</div>



      {/* Add Button */}
      <div className="d-grid">
        <button className="btn btn-primary rounded-pill" style={{ backgroundColor: '#1C8ED7' }}>
          Қосу
        </button>
      </div>

      <style jsx>{`
        .icon-wrapper {
          background-color: black;
          border-radius: 50%;
          padding: 4px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .input-bg {
          background-color: #F4F5F9 !important;
          border: none;
          border-radius: 50px !important; /* Makes the input more rounded */
        }
        .input-group-text {
          background-color: #F4F5F9 !important;
          border: none;
          color: #6c757d; /* Color for the icons inside inputs */
        }
        .form-control:focus {
          box-shadow: none;
        }
        .form-control {
          border-radius: 0 50px 50px 0 !important; /* Make the input seamlessly blend with the icon */
        }
      `}</style>
    </div>
  );
};

export default CreateCourse;
