import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Signup.css';
import ovalImage from '../../Assets/oval.png';

const API_BASE_URL = "http://localhost:8000";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    aadhar: "",
    phoneNumber: "",
    role: "lender",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const aadharRegex = /^\d{12}$/;
    const phoneRegex = /^\d{10}$/;

    const requiredFields = {
      username: "Username",
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      password: "Password",
      dateOfBirth: "Date of Birth",
      aadhar: "Aadhar number",
      phoneNumber: "Phone number"
    };

    Object.entries(requiredFields).forEach(([field, label]) => {
      if (!formData[field].trim()) {
        newErrors[field] = `${label} is required`;
      }
    });

    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.password && !passwordRegex.test(formData.password)) {
      newErrors.password = "Password must contain at least 8 characters, one letter, one number, and one special character";
    }

    if (formData.aadhar && !aadharRegex.test(formData.aadhar)) {
      newErrors.aadhar = "Aadhar number must be exactly 12 digits";
    }

    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits";
    }

    if (!formData.terms) {
      newErrors.terms = "You must agree to the terms of service";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      setIsLoading(true);
      setApiError("");

      try {
        const response = await axios.post(`${API_BASE_URL}/signup`, {
          username: formData.username,
          password: formData.password,
          email: formData.email,
          firstname: formData.firstName,
          lastname: formData.lastName,
          dateofbirth: formData.dateOfBirth,
          aadhar: formData.aadhar,
          phonenumber: formData.phoneNumber,
          role: formData.role
        });

        if (response.data.message === "User created successfully") {
          localStorage.setItem('userRole', formData.role);
          setShowPopup(true);
          
          // Hide popup and redirect after 2 seconds
          setTimeout(() => {
            setShowPopup(false);
            navigate('/login');
          }, 2000);
        }
      } catch (error) {
        const errorMessage = error.response?.data?.detail || "Signup failed. Please try again.";
        setApiError(errorMessage);
        
        if (error.response?.status === 400) {
          if (errorMessage.includes("Username")) {
            setErrors(prev => ({ ...prev, username: "Username is already taken" }));
          }
          if (errorMessage.includes("Email")) {
            setErrors(prev => ({ ...prev, email: "Email is already registered" }));
          }
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="signupPage__container">
      <div className="signupPage__leftSection">
        <img src={ovalImage} alt="Yellow Oval" className="signupPage__yellowOvalImage" />
        <div className="signupPage__leftContent">
          <h1 className="signupPage__mainHeading">Let's Start Your Business</h1>
          <p className="signupPage__subHeading">Get started with ease and begin your journey now.</p>
        </div>
      </div>

      <div className="signupPage__rightSection">
        <div className="signupPage__formWrapper">
          <form className="signupPage__form" onSubmit={handleSubmit}>
            {apiError && <div className="signupPage__apiErrorMessage">{apiError}</div>}
            
            <div className="signupPage__formField">
              <label className="signupPage__label" htmlFor="role">Select Role *</label>
              <select
                className="signupPage__input"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="lender">Lender</option>
                <option value="borrower">Borrower</option>
              </select>
              {errors.role && <span className="signupPage__errorText">{errors.role}</span>}
            </div>

            {/* Name Fields */}
            <div className="signupPage__nameFieldsContainer">
              <div className="signupPage__formField signupPage__formFieldHalf">
                <label className="signupPage__label" htmlFor="firstName">First Name *</label>
                <input
                  className="signupPage__input"
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && <span className="signupPage__errorText">{errors.firstName}</span>}
              </div>

              <div className="signupPage__formField signupPage__formFieldHalf">
                <label className="signupPage__label" htmlFor="lastName">Last Name *</label>
                <input
                  className="signupPage__input"
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && <span className="signupPage__errorText">{errors.lastName}</span>}
              </div>
            </div>

            {/* Other form fields */}
            <div className="signupPage__formField">
              <label className="signupPage__label" htmlFor="username">Username *</label>
              <input
                className="signupPage__input"
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <span className="signupPage__errorText">{errors.username}</span>}
            </div>

            <div className="signupPage__formField">
              <label className="signupPage__label" htmlFor="email">Email *</label>
              <input
                className="signupPage__input"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="signupPage__errorText">{errors.email}</span>}
            </div>

            <div className="signupPage__formField">
              <label className="signupPage__label" htmlFor="password">Password *</label>
              <input
                className="signupPage__input"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <span className="signupPage__errorText">{errors.password}</span>}
            </div>

            <div className="signupPage__formField">
              <label className="signupPage__label" htmlFor="dateOfBirth">Date of Birth *</label>
              <input
                className="signupPage__input"
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
              {errors.dateOfBirth && <span className="signupPage__errorText">{errors.dateOfBirth}</span>}
            </div>

            <div className="signupPage__formField">
              <label className="signupPage__label" htmlFor="aadhar">Aadhar Number *</label>
              <input
                className="signupPage__input"
                type="text"
                id="aadhar"
                name="aadhar"
                value={formData.aadhar}
                onChange={handleChange}
                maxLength="12"
              />
              {errors.aadhar && <span className="signupPage__errorText">{errors.aadhar}</span>}
            </div>

            <div className="signupPage__formField">
              <label className="signupPage__label" htmlFor="phoneNumber">Phone Number *</label>
              <input
                className="signupPage__input"
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                maxLength="10"
              />
              {errors.phoneNumber && <span className="signupPage__errorText">{errors.phoneNumber}</span>}
            </div>

            <div className="signupPage__checkboxContainer">
              <input
                className="signupPage__checkbox"
                type="checkbox"
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
              />
              <label className="signupPage__checkboxLabel" htmlFor="terms">
                I agree to the Terms of Service and Privacy Notice *
              </label>
              {errors.terms && <span className="signupPage__errorText">{errors.terms}</span>}
            </div>

            <button 
              type="submit" 
              className="signupPage__submitButton" 
              disabled={isLoading}
            >
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>

          <p className="signupPage__loginLink">
            Already have an account? <a href="/login" className="signupPage__loginAnchor">Log in</a>
          </p>
        </div>
      </div>

      {showPopup && (
        <div className="signupPage__popup">
          <div className="signupPage__popupContent">
            <h2 className="signupPage__popupHeading">Success!</h2>
            <p className="signupPage__popupText">Account created successfully!</p>
            <p className="signupPage__popupText">Redirecting to login page...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpPage;