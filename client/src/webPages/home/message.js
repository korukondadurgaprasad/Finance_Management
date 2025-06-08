import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import './message.css';
import connectImage from '../../Assets/connect.png';

const Message = () => {
  useEffect(() => {
    emailjs.init("eDlUp6flp7QouWrWV"); // Initialize with your public key
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    error: null
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setStatus({ submitted: false, submitting: true, error: null });

    try {
      await emailjs.send(
        'service_beugrvr',
        'template_iah1b4s',
        {
          from_name: formData.name,
          from_email: formData.email,
          from_mobile: formData.mobile,
          message: formData.message
        }
      );

      setStatus({ submitted: true, submitting: false, error: null });
      setFormData({ name: '', mobile: '', email: '', message: '' });
      alert('Message sent successfully!');
    } catch (error) {
      setStatus({ submitted: false, submitting: false, error: error.message });
      alert('Failed to send message. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="message_container_main">
      <div className="message_inner_container">
        <h1 className="message_heading_title">Contact Us</h1>
        <div className="message_content_wrapper">
          <div className="message_image_container">
            <img src={connectImage} alt="Contact" className="message_image"/>
          </div>
          <form className="message_form_container" onSubmit={handleSubmit} noValidate>
            <div className="message_input_group">
              <input
                type="text"
                name="name"
                placeholder="Name *"
                className={`message_input_field ${errors.name ? 'error' : ''}`}
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <span className="error_message">{errors.name}</span>}
            </div>

            <div className="message_input_group">
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile No *"
                className={`message_input_field ${errors.mobile ? 'error' : ''}`}
                value={formData.mobile}
                onChange={handleChange}
                required
              />
              {errors.mobile && <span className="error_message">{errors.mobile}</span>}
            </div>

            <div className="message_input_group">
              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                className={`message_input_field ${errors.email ? 'error' : ''}`}
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="error_message">{errors.email}</span>}
            </div>

            <div className="message_input_group">
              <textarea
                name="message"
                placeholder="Your Message *"
                className={`message_textarea_field ${errors.message ? 'error' : ''}`}
                value={formData.message}
                onChange={handleChange}
                required
              />
              {errors.message && <span className="error_message">{errors.message}</span>}
            </div>

            <button 
              type="submit" 
              className="message_submit_button"
              disabled={status.submitting}
            >
              {status.submitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Message;