import React, { useState } from "react";
import emailjs from '@emailjs/browser';
import './Contact.css';
import conTactuS from '../../Assets/contactus-person.png';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitting(true);

    // Replace these with your actual EmailJS credentials
    const serviceId = "service_7s6b18e";
    const templateId = "template_koxr66x";
    const publicKey = "eDlUp6flp7QouWrWV";

    // Prepare the template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      from_mobile: formData.mobile,
      message: formData.message,
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setSubmissionStatus("success");
        alert("Thanks for submitting, we will reach you soon!");
        setFormData({
          name: "",
          mobile: "",
          email: "",
          message: "",
        });
      })
      .catch((err) => {
        console.error('FAILED...', err);
        setSubmissionStatus("error");
        alert("There was an error sending your message. Please try again.");
      })
      .finally(() => {
        setFormSubmitting(false);
      });
  };

  return (
    <div>
      <div className="contact-page">
        <section className="contact-form-section">
          <div className="form-main">
            <div className="form-heading">
              <p>Feel free to contact us.</p>
            </div>
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </label>
                <br />
                <label>
                  Mobile Number:
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </label>
                <br />
                <label>
                  Email ID:
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </label>
                <br />
                <label>
                  Message:
                  <br />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </label>
                <br />
                <button type="submit" disabled={formSubmitting}>
                  {formSubmitting ? "Submitting..." : "Submit"}
                </button>
                {submissionStatus === "error" && (
                  <p className="error-message">
                    Error submitting form. Please try again.
                  </p>
                )}
              </form>
            </div>
          </div>
          <div className="form-image">
            <img
              src={conTactuS}
              alt="Contact Person"
              className="contact-image"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;