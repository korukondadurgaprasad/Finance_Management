import React from 'react';
import './help.css';
import { 
  LineChart, 
  Briefcase, 
  Calculator, 
  Shield, 
  BarChart3, 
  Target, 
  Globe, 
  PieChart 
} from 'lucide-react';

const ServicesPage = () => {
  const services = [
    { 
      title: 'Financial Planning', 
      icon: <LineChart className="services_icon_element_h2l56" size={40} />,
      description: 'Comprehensive financial planning tailored to your goals'
    },
    { 
      title: 'Investment Management', 
      icon: <Briefcase className="services_icon_element_h2l56" size={40} />,
      description: 'Expert portfolio management and investment strategies'
    },
    { 
      title: 'Budget Planning', 
      icon: <Calculator className="services_icon_element_h2l56" size={40} />,
      description: 'Professional budget planning and compliance services'
    },
    { 
      title: 'Risk Management', 
      icon: <Shield className="services_icon_element_h2l56" size={40} />,
      description: 'Identify and mitigate financial risks effectively'
    },
    { 
      title: 'Market Analysis', 
      icon: <BarChart3 className="services_icon_element_h2l56" size={40} />,
      description: 'In-depth market research and trend analysis'
    },
    { 
      title: 'Business Strategy', 
      icon: <Target className="services_icon_element_h2l56" size={40} />,
      description: 'Strategic planning for business growth'
    },

  ];

  return (
    <section className="services_main_section_x7f92">
      <div className="services_content_wrapper_d3e45">
        <div className="services_header_container_j9k42">
          <h1 className="services_primary_heading_m4p73">Our Services</h1>
        </div>
        <div className="services_grid_container_f5n91">
          {services.map((service, index) => (
            <div className="services_card_wrapper_b8h31" key={index}>
              <div className="services_card_content_k7r84">
                <div className="services_icon_wrapper_q2w39">
                  {service.icon}
                </div>
                <h3 className="services_item_title_x9y62">{service.title}</h3>
                <p className="services_item_description_v5x12">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;