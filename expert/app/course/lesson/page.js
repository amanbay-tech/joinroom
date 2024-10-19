"use client"

import React from 'react';
import Link from 'next/link';
import GoBackIcon from "@/components/goBackIcon"; // Adjust the path if necessary
import MenuIcon from '@/components/menuIcon'; // Adjust the path if necessary
import { GoBook } from 'react-icons/go';
import { FaArrowRightLong } from 'react-icons/fa6';
import { IoIosArrowRoundForward } from "react-icons/io";

import 'bootstrap/dist/css/bootstrap.min.css';

const CourseLessons = () => {
  return (
    <div className="container mt-3">
      {/* Navbar */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link href="/" passHref>
          
            <GoBackIcon />
       
        </Link>
        <h2 className="m-0">Сабақтар</h2>
       
          <MenuIcon />
    
      </div>
 {/* Course Info Box */}
 <div className="course-info-box">
        <h3 className="course-name">Курс Атауы</h3>
        <p className="course-description">Бұл курстың сипаттамасы. Бұл курс сізге көптеген жаңа білім береді.</p>
      </div>

 {/* Lessons List */}
 <div className="lessons-list">
        <div className="lesson-box d-flex align-items-center justify-content-between mb-2">
          <div className="d-flex align-items-center">
            <GoBook size={24} className="me-2" />
            <span>Lesson 1</span>
          </div>
          <IoIosArrowRoundForward size={20} />
        </div>
        <div className="lesson-box d-flex align-items-center justify-content-between mb-2">
          <div className="d-flex align-items-center">
            <GoBook size={24} className="me-2" />
            <span>Lesson 2</span>
          </div>
          <IoIosArrowRoundForward size={20} />
        </div>
        {/* Add more lessons as needed */}
      </div>




      {/* Add Button */}
      <div className="d-grid">
        <button className="btn btn-primary rounded-pill" style={{ backgroundColor: '#1C8ED7' }}>
          Қосу
        </button>
      </div>

      <style jsx>{`
        .course-info-box {
          box-sizing: border-box;
          width: 100%;
          height: 101px;
          margin: 0 auto 10px; /* Centered and with bottom margin for spacing */
          background: #F4F5F9;
          border-radius: 16px;
          padding: 16px;
          display: flex;
          justify-content: space-between;
        }

        .course-name {
          font-size: 1.2rem;
          margin: 0;
          font-weight: bold;
          color: #323232;
        }

        .course-description {
          font-size: 0.9rem;
          margin: 8px 0 0;
          color: #6c757d;
        }

        
        .lesson-box {
          box-sizing: border-box;
          width: 100%;
          height: 64px;
          margin: 0 auto;
          background: #F2F8FC;
          border-bottom: 1px solid #F4F5F9;
          border-radius: 16px;
          padding: 0 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

      `}</style>
    </div>
  );
};

export default CourseLessons;
