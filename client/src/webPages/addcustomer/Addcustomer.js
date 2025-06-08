import React, { useState, useEffect } from "react";
import './Addcustomer.css';
import custimg from '../../Assets/calculate.jpg';
import api from '../../Services/api';

const AddCustomerPage = () => {
  const initialFormState = {
    name: '',
    username: '',
    purpose: '',
    customer_id: '',
    amount: '',
    interest_rate: '',
    start_date: '',
    end_date: '',
    account_type: '',
    gender: '',
    phone_number: '',
    aadhar: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [showAlert, setShowAlert] = useState({ show: false, message: '', type: 'success' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchNextCustomerId = async () => {
    try {
      const response = await api.getNextCustomerId();
      setFormData(prev => ({
        ...prev,
        customer_id: response.next_customer_id.toString()
      }));
    } catch (error) {
      console.error('Error fetching next customer ID:', error);
      showNotification('Error fetching customer ID', 'error');
    }
  };

  useEffect(() => {
    fetchNextCustomerId();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.username || !formData.customer_id) {
      throw new Error('Please fill in all required fields');
    }
    
    if (formData.phone_number.length !== 10) {
      throw new Error('Phone number must be 10 digits');
    }
    
    if (formData.aadhar.length !== 12) {
      throw new Error('Aadhar number must be 12 digits');
    }
    
    if (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
      throw new Error('Please enter a valid amount');
    }
    
    if (isNaN(parseFloat(formData.interest_rate)) || parseFloat(formData.interest_rate) < 0) {
      throw new Error('Please enter a valid interest rate');
    }
  };

  const showNotification = (message, type = 'success') => {
    setShowAlert({ show: true, message, type });
    setTimeout(() => setShowAlert({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      validateForm();

      const formattedData = {
        ...formData,
        customer_id: parseInt(formData.customer_id),
        amount: parseFloat(formData.amount),
        interest_rate: parseFloat(formData.interest_rate),
        start_date: new Date(formData.start_date).toISOString().split('T')[0],
        end_date: formData.end_date ? new Date(formData.end_date).toISOString().split('T')[0] : null
      };

      const response = await api.addCustomer(formattedData);
      
      if (response.message === "Customer added successfully") {
        showNotification('Customer Added Successfully!');
        setFormData(initialFormState);
        fetchNextCustomerId(); // Fetch next customer ID after successful submission
      } else {
        throw new Error('Failed to add customer');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      showNotification(error.message || 'Failed to add customer', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="customer_registration_main_container_x8f92j">
      {showAlert.show && (
        <div 
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: showAlert.type === 'success' ? '#4CAF50' : '#f44336',
            color: 'white',
            padding: '15px 25px',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            zIndex: 1000
          }}
        >
          {showAlert.message}
        </div>
      )}
      
      <div className="customer_registration_content_wrapper_y7h56k">
        <div className="customer_registration_image_container_m4n21p">
          <img src={custimg} alt="Customer Registration" className="customer_registration_hero_image_t9q43r"/>
        </div>
        
        <div className="customer_registration_form_container_l2p87m">
          <div className="customer_registration_form_scroll_wrapper_k5v31n">
            <h1 className="customer_registration_title_heading_w9c64b">Add Your Customers</h1>
            <form onSubmit={handleSubmit} className="customer_registration_form_element_h3j12p">
              {[
                { label: 'Name', name: 'name', type: 'text', required: true },
                { label: 'Username', name: 'username', type: 'text', required: true },
                { label: 'Purpose', name: 'purpose', type: 'text', required: true },
                { label: 'Customer ID', name: 'customer_id', type: 'number', required: true, readonly: true },
                { label: 'Amount', name: 'amount', type: 'number', step: '0.01', required: true },
                { label: 'Interest Rate (%)', name: 'interest_rate', type: 'number', step: '0.01', required: true },
                { label: 'Start Date', name: 'start_date', type: 'date', required: true },
                { label: 'End Date', name: 'end_date', type: 'date', required: false },
                { label: 'Phone Number', name: 'phone_number', type: 'tel', pattern: '[0-9]{10}', required: true },
                { label: 'Aadhar Number', name: 'aadhar', type: 'text', pattern: '[0-9]{12}', required: true }
              ].map((field) => (
                <div key={field.name} className="customer_registration_form_field_container_r8m45v">
                    <label className="customer_registration_form_label_b2k98h">
                        {field.label}
                        <input
                            className="customer_registration_form_input_x4j67d"
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            required={field.required}
                            readOnly={field.readonly}  // Add this
                            step={field.step}
                            pattern={field.pattern}
                        />
                    </label>
                </div>
              ))}

              <div className="customer_registration_form_field_container_r8m45v">
                <label className="customer_registration_form_label_b2k98h">
                  Account Type
                  <select
                    className="customer_registration_form_select_n7p34q"
                    name="account_type"
                    value={formData.account_type}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Account Type</option>
                    <option value="credit">Credit</option>
                    <option value="debit">Debit</option>
                  </select>
                </label>
              </div>

              <div className="customer_registration_form_field_container_r8m45v">
                <label className="customer_registration_form_label_b2k98h">
                  Gender
                  <select
                    className="customer_registration_form_select_n7p34q"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>

              <button 
                type="submit" 
                className="customer_registration_submit_button_q1w23e"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding Customer...' : 'Add Customer'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerPage;