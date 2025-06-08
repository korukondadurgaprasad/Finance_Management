// LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Log.css';
import loginImage from '../../Assets/loginimg.png';
import api from '../../Services/api';

// Admin credentials - in a real app, these would be securely stored on the backend
const ADMIN_EMAIL = 'admin@financehive.com';
const ADMIN_PASSWORD = 'admin123';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'lender'
  });
  const [errors, setErrors] = useState({});
  const [loginMessage, setLoginMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
    setLoginMessage('');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Special handling for admin login
      if (formData.role === 'admin') {
        if (formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASSWORD) {
          // Store admin data
          localStorage.setItem('accessToken', 'admin-token');
          
          localStorage.setItem('role', 'admin');
          localStorage.setItem('email', ADMIN_EMAIL);
          
          setLoginMessage('Login Successful! Redirecting to admin dashboard...');
          setTimeout(() => {
            navigate('/admindashboard');
          }, 1500);
        } else {
          throw new Error('Invalid admin credentials');
        }
      } else {
        // Handle regular user login (lender/borrower)
        const response = await api.login(
          formData.email.trim(),
          formData.password,
          formData.role
        );
        console.log(response.access_token)
        if (response.access_token && response.role) {
          // Store user data
          localStorage.setItem('accessToken', response.access_token);
          localStorage.setItem('userId', response.user_id);
          localStorage.setItem('username', response.username);
          localStorage.setItem('email', response.email);
          localStorage.setItem('role', response.role);
          
          setLoginMessage('Login Successful! Redirecting...');
          
          setTimeout(() => {
            if (response.role === 'lender') {
              navigate('/userdashboard');
            } else if (response.role === 'borrower') {
              navigate('/borrowersdashboard');
            }
          }, 1500);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginMessage(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="image-section">
        <img src={loginImage} alt="Login Illustration" className="illustration" />
      </div>
      
      <div className="form-section">
        <h1>Login</h1>
        <p className="welcome-message">Welcome back! Please login to your account.</p>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="role">Select Role</label>
            <select
              id="role"
              value={formData.role}
              onChange={handleInputChange}
              disabled={isLoading}
              className={errors.role ? 'error-input' : ''}
            >
              <option value="admin">Admin</option>
              <option value="lender">Lender</option>
              <option value="borrower">Borrower</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder={formData.role === 'admin' ? ADMIN_EMAIL : 'Enter your email'}
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
              className={errors.email ? 'error-input' : ''}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              disabled={isLoading}
              className={errors.password ? 'error-input' : ''}
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          {/*{formData.role !== 'admin' && (
            <div className="forgot-password-container">
              <a href="/forgot-password" className="forgot-password">
                Forgot Password?
              </a>
            </div>
          )}*/}

          <button 
            type="submit" 
            className="login-btn" 
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          {loginMessage && (
            <p className={`login-message ${
              loginMessage.includes('Successful') ? 'success' : 'error'
            }`}>
              {loginMessage}
            </p>
          )}
        </form>

        {formData.role !== 'admin' && (
          <div className="signup-prompt">
            <span>Don't have an account? </span>
            <a href="/signup" className="signup-link">Sign Up</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;