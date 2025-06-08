import React, { useState } from 'react';
import './About.css';
import aboutImage from '../../Assets/saveimage.png';
import FineImage from '../../Assets/fine.png';
import 'font-awesome/css/font-awesome.min.css';

function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="financeManagement_aboutPage_container">
      <main className="financeManagement_aboutPage_mainSection">
        {/* Hero Section */}
        <div className="financeManagement_aboutPage_hero">
          <img 
            src={aboutImage} 
            alt="Financial management" 
            className="financeManagement_aboutPage_featureImage"
          />
        </div>

        {/* About Section with Side-by-side Layout */}
        <section className="financeManagement_aboutPage_section">
          <div className="financeManagement_aboutPage_contentGrid">
            <div className="financeManagement_aboutPage_textContent">
              <h2 className="financeManagement_aboutPage_sectionHeading">
                Financial Features In Our Site
              </h2>
              <p className="financeManagement_aboutPage_sectionText">
                Welcome to Finance Management, a revolutionary web-based platform transforming 
                chit fund management with a secure, transparent, and efficient solution.
                We empower chit group organizers to focus on their members by streamlining 
                member registration, payment tracking, auction management, and dividend 
                calculations, while providing real-time reporting and analytics to enhance 
                transparency and trust. Finance management is the process of managing 
                financial resources effectively to ensure optimal returns while minimizing 
                risks. Just like chit fund management, it plays a pivotal role in helping 
                individuals, groups, and businesses achieve their financial objectives through 
                disciplined savings, investment strategies, and risk-sharing.
              </p>
            </div>
            <div className="financeManagement_aboutPage_imageContent">
              <img 
                src={FineImage} 
                alt="Financial management" 
                className="financeManagement_aboutPage_featureImage" 
              />
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="financeManagement_aboutPage_visionMission">
          <div className="financeManagement_aboutPage_cardGrid">
            <div className="financeManagement_aboutPage_cardWrapper">
              <h2 className="financeManagement_aboutPage_sectionHeading">Our Vision</h2>
              <div className="financeManagement_aboutPage_featureCard">
                <i className="fa fa-bar-chart financeManagement_aboutPage_cardIcon" style={{ color: '#FFBF00' }}></i>
                <h3 className="financeManagement_aboutPage_cardHeading">Vision</h3>
                <p className="financeManagement_aboutPage_cardText">
                  To become the most trusted and innovative financial management platform globally, 
                  fostering financial independence and stability for all. By leveraging cutting-edge 
                  technology and user-centric design, we aspire to build a financially informed 
                  society where everyone has the resources and knowledge to make sound financial decisions.
                </p>
              </div>
            </div>

            <div className="financeManagement_aboutPage_cardWrapper">
              <h2 className="financeManagement_aboutPage_sectionHeading">Our Mission</h2>
              <div className="financeManagement_aboutPage_featureCard">
                <i className="fa fa-bar-chart financeManagement_aboutPage_cardIcon" style={{ color: '#FFBF00' }}></i>
                <h3 className="financeManagement_aboutPage_cardHeading">Mission</h3>
                <p className="financeManagement_aboutPage_cardText">
                  To empower individuals and businesses with seamless, intuitive, and 
                  data-driven financial management tools. Our goal is to simplify personal 
                  finance, enhance financial literacy, and provide actionable insights for 
                  smarter money management, enabling users to achieve their financial goals 
                  with confidence and ease.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Modal */}
        {isModalOpen && (
          <div className={`financeManagement_aboutPage_modal ${isModalOpen ? 'active' : ''}`}>
            <div className="financeManagement_aboutPage_modalContent">
              <span className="financeManagement_aboutPage_modalClose" onClick={toggleModal}>×</span>
              <h2 className="financeManagement_aboutPage_modalHeading">Full Details</h2>
              <p className="financeManagement_aboutPage_modalText">
                {/* Modal content */}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AboutPage;