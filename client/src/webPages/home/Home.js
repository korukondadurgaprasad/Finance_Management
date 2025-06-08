import React from 'react';
import HeroSection from './hero';
import InfoPage from './info';
import ServicesPage from './help';
import Message from './message';
import './Home.css';

const HomePage = () => {
  return (
    <div className="mainContentWrapper">
      <section id="hero" className="mainHeroSection">
        <HeroSection />
      </section>
      <section id="info" className="mainAboutSection">
        <InfoPage />
      </section>
      <section id="service" className="mainServicesSection">
        <ServicesPage />
      </section>
      <section id="message" className="mainContactSection">
        <Message />
      </section>
    </div>
  );
};

export default HomePage;