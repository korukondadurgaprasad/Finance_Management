import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Addadmins.css';
import { api } from '../../../Services/api';

const AddAdminmemPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    gender: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) navigate('/login');
  }, [navigate]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!/^[0-9]{10}$/.test(formData.mobile)) newErrors.mobile = 'Mobile number must be exactly 10 digits';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.gender) newErrors.gender = 'Please select a gender';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setErrors({});
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await api.createAdmin(formData);
        setSuccess('Admin created successfully!');
        setFormData({ name: '', mobile: '', email: '', gender: '' });
        setTimeout(() => setSuccess(''), 2000);
      } catch (error) {
        setErrors({ submit: error.message || 'Failed to create admin. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-form-wrapper">
        <h2 className="admin-title">Add New Admin</h2>
        
        {success && <div className="message success">{success}</div>}
        {errors.submit && <div className="message error">{errors.submit}</div>}
        
        <form onSubmit={handleSubmit} className="admin-form" noValidate>
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter admin name"
              className={errors.name ? 'has-error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              id="mobile"
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              maxLength="10"
              placeholder="Enter 10-digit mobile number"
              className={errors.mobile ? 'has-error' : ''}
            />
            {errors.mobile && <span className="error-text">{errors.mobile}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className={errors.email ? 'has-error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={errors.gender ? 'has-error' : ''}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <span className="error-text">{errors.gender}</span>}
          </div>

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Creating Admin...' : 'Add Admin'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAdminmemPage;