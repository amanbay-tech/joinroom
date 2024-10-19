// pages/index.js
import React, { useRef, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Icon from '../components/icon'; // Adjust the path if necessary
import Head from 'next/head';
import { useRouter } from 'next/router';

const HomePage = () => {
  const [buttonWidth, setButtonWidth] = useState('auto');
  const joinRoomRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    // Adjust the width of the button to match the width of the "Join room" text
    if (joinRoomRef.current) {
      setButtonWidth(`${joinRoomRef.current.offsetWidth + 50}px`); // Increased width
    }
  }, []);

  const handleAddCourse = () => {
    router.push('/create_course'); // Redirect to the CreateCourse page
  };

  return (
    <>
      <Head>
        <title>Join Room Platform</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&family=Rubik+Bubbles&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="content-wrapper">
        <Icon />
        <div className="join-room rubik-bubbles" ref={joinRoomRef}>
          Join room
        </div>
        <div className="description roboto-light">
          это инновационная платформа совместной работы, созданная для эффективного взаимодействия команд и упрощения удаленной коммуникации
        </div>
        <button
          className="add-course-btn"
          style={{ width: buttonWidth }}
          onClick={handleAddCourse}
        >
          Курс қосу
        </button>
      </div>
      <style jsx>{`
        .content-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          text-align: center;
          background: url('/image-bg.png') no-repeat center center fixed;
          background-size: cover;
          background-color: rgba(0, 0, 0, 0.5); /* Optional: Fallback color */
          padding: 20px;
        }
        .join-room {
          font-size: 2.5rem;
          margin-top: 20px;
          color: white;
          font-family: 'Rubik Bubbles', sans-serif;
        }
        .description {
          margin-top: 15px;
          color: white;
          font-size: 1.2rem;
          max-width: 600px;
          font-family: 'Roboto', sans-serif;
          font-weight: 300;
        }
        .add-course-btn {
          background-color: white;
          color: black;
          border: none;
          border-radius: 50px;
          padding: 10px 20px;
          font-size: 1rem;
          margin-top: 20px;
          transition: background-color 0.3s ease;
          font-family: 'Roboto', sans-serif;
          font-weight: 300; /* Use light font weight */
        }
        .add-course-btn:hover {
          background-color: #f0f0f0;
        }
        @media (max-width: 768px) {
          .add-course-btn {
            width: 100% !important; /* Full width on mobile */
          }
        }
      `}</style>
    </>
  );
};

export default HomePage;
