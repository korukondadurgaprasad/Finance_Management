import React from 'react';
import { useNavigate } from 'react-router-dom';
import './hero.css';
import heroImage from '../../Assets/Head.png';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/feature');
  };

  return (
    <div className="hero_container_x9f42">
      <div className="hero_content_wrapper_k7h31">
        <div className="hero_text_container_m4p56">
          <h1 className="hero_heading_j2l89">
            Get <span className="hero_highlight_text_q8w23">ready</span> for your<br/>
            <span className="hero_business_text_n5r67">Business</span><br/>
            & <span className="hero_highlight_text_q8w23">upgrade</span> all aspects
          </h1>
          <p className="hero_description_h6t45">
            This comprehensive resource will empower you to taking control of your finances and 
            Achieve financial freedom, and secure a prosperous futures ...Unlock the secrets to 
            financial success with our in-depth guide to financial management.
          </p>
          <button 
            className="hero_explore_button_f3k78"
            onClick={handleExploreClick}
          >
            Explore
          </button>
        </div>
        <div className="hero_image_container_b9m34">
          <img src={heroImage} alt="Finance Hero" className="hero_main_image_v5x12"/>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;