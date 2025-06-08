import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();

  // Navigation handler function
  const handleNavigation = (path) => {
    navigate(path);
  };

  // External link handler function
  const handleExternalLink = (url) => {
    window.open(url, '_blank', 'noopener noreferrer');
  };

  // Contact handler function
  const handleContact = (type, value) => {
    switch (type) {
      case 'phone':
        window.location.href = `tel:${value}`;
        break;
      case 'email':
        window.location.href = `mailto:${value}`;
        break;
      case 'address':
        window.open(`https://maps.google.com/?q=${encodeURIComponent(value)}`, '_blank');
        break;
      default:
        break;
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Address Section */}
        <div className="footer-column">
          <h3 className="footer-heading">Address</h3>
          <div 
            className="footer-item"
            onClick={() => handleContact('address', '123 street, kiet')}
            role="button"
            tabIndex={0}
          >
            <MapPin className="footer-icon" size={16} />
            <p>123 street, kiet</p>
          </div>
          <div 
            className="footer-item"
            onClick={() => handleContact('phone', '+910000000000')}
            role="button"
            tabIndex={0}
          >
            <Phone className="footer-icon" size={16} />
            <p>+91 0000000000</p>
          </div>
          <div 
            className="footer-item"
            onClick={() => handleContact('email', 'kiethub@gmail.com')}
            role="button"
            tabIndex={0}
          >
            <Mail className="footer-icon" size={16} />
            <p>kiethub@gmail.com</p>
          </div>
        </div>

        {/* Services Section */}
        <div className="footer-column">
          <h3 className="footer-heading">Services</h3>
          <ul>
            <li onClick={() => handleNavigation('/feature')} role="button" tabIndex={0}>Strategies</li>
            <li onClick={() => handleNavigation('/feature')} role="button" tabIndex={0}>Guidance</li>
            <li onClick={() => handleNavigation('/feature')} role="button" tabIndex={0}>Data secure</li>
            <li onClick={() => handleNavigation('/feature')} role="button" tabIndex={0}>Analysis</li>
            <li onClick={() => handleNavigation('/feature')} role="button" tabIndex={0}>Finance management</li>
          </ul>
        </div>

        {/* Quick Lines Section */}
        <div className="footer-column">
          <h3 className="footer-heading">Quick lines</h3>
          <ul>
            <li onClick={() => handleNavigation('/about')} role="button" tabIndex={0}>About us</li>
            <li onClick={() => handleNavigation('/contact')} role="button" tabIndex={0}>Contact us</li>
            <li onClick={() => handleNavigation('/feature')} role="button" tabIndex={0}>Services</li>
            <li onClick={() => handleNavigation('/feature')} role="button" tabIndex={0}>Support</li>
          </ul>
        </div>

        {/* ChatBot Section */}
        <div className="footer-column">
          <h3 className="footer-heading">Features</h3>
          <p>For Know more about finance, let's explore features ...</p>
          <div className="chatbot-container">
            <span className="chatbot-text">Explore It...</span>
            <button 
              className="chatbot-button" 
              onClick={() => handleNavigation('/feature')}
            >
              Click Me 
            </button>
          </div>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="footer-icons">
        <div onClick={() => handleExternalLink('https://www.instagram.com/khub_kiet/')} role="button" tabIndex={0} className="social-icon">
          <svg className="footer-icon instagram" viewBox="0 0 24 24" width="25" height="25">
            <path fill="currentColor" d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
          </svg>
        </div>
        <div onClick={() => handleExternalLink('https://www.linkedin.com/company/103654742/dashboard/')} role="button" tabIndex={0} className="social-icon">
          <svg className="footer-icon linkedin" viewBox="0 0 24 24" width="25" height="25">
            <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
          </svg>
        </div>
        <div onClick={() => handleExternalLink('https://api.whatsapp.com/send?phone=1234567836')} role="button" tabIndex={0} className="social-icon">
          <svg className="footer-icon whatsapp" viewBox="0 0 24 24" width="25" height="25">
            <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>
        <div onClick={() => handleExternalLink('https://www.youtube.com/@Kiet-Hub')} role="button" tabIndex={0} className="social-icon">
          <svg className="footer-icon youtube" viewBox="0 0 24 24" width="25" height="25">
            <path fill="currentColor" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </div>
        <div onClick={() => handleContact('mailto:khub.helpdesk@gmail.com')} role="button" tabIndex={0} className="social-icon">
          <svg className="footer-icon email" viewBox="0 0 24 24" width="25" height="25">
            <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </div>
      </div>
    </footer>
  );
};

export default Footer;