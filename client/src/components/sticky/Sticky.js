import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faWhatsapp, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'; // Add this import
import './Sticky.css';

const StickyIcons = () => {
  return (
    <div className="sticky-icon">
      <a href="https://api.whatsapp.com/send?phone=1234567836" className="Whatsapp" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faWhatsapp} style={{ marginRight: '20px', marginLeft: '5px' }} /> WhatsApp
      </a>
      <a href="https://www.instagram.com/khub_kiet/" className="Instagram" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faInstagram} style={{ marginRight: '20px', marginLeft: '5px' }} /> Instagram
      </a>
      <a href="https://www.linkedin.com/company/103654742/dashboard/" className="Linkedin" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faLinkedin} style={{ marginRight: '20px', marginLeft: '5px' }} /> Linkedin
      </a>
      <a href="https://www.youtube.com/@Kiet-Hub" className="Youtube" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faYoutube} style={{ marginRight: '20px', marginLeft: '5px' }} /> Youtube
      </a>
      <a href="mailto:khub.helpdesk@gmail.com" className="Gmail" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '20px', marginLeft: '5px' }} /> Gmail
      </a>
    </div>
  );
};

export default StickyIcons;