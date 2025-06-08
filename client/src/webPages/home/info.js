import React from 'react';
import './info.css';
import aboutImage from '../../Assets/About_pic.png';

const InfoPage = () => {
  return (
    <div className="info_main_container_x7f92">
      <h1 className="info_heading_title_d3e45">About</h1>
      <div className="info_content_wrapper_j9k42">
        <div className="info_image_container_h2l56">
          <img
            src={aboutImage}
            alt="About Finance Hive"
            className="info_main_image_b8h31"
          />
        </div>
        <div className="info_text_container_m4p73">
          <p className="info_description_text_f5n91">
            Welcome to Finance Management, a revolutionary web-based platform transforming chit fund management with a secure, transparent, and efficient solution. We empower chit group organizers to focus on their members by streamlining member registration, payment tracking, auction management, and dividend calculations, while providing real-time reporting and analytics to enhance transparency and trust.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;