import React, { useState, useEffect } from "react";
import "./Adddata.css";
import transactionImage from "../../Assets/Add-Data.png";
import api from "../../Services/api";

const AddTransactionPage = () => {
  const [formData, setFormData] = useState({
    account_id: "",
    transaction_date: new Date().toISOString().split('T')[0],
    amount: "",
    transaction_type: "",
    description: ""
  });

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    type: "success"
  });

  // Fetch customers when component mounts
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await api.getCustomers();
        
        if (response && response.customers) {
          // Sort customers by ID for easier finding
          const sortedCustomers = response.customers.sort((a, b) => a.customer_id - b.customer_id);
          setCustomers(sortedCustomers);
        } else {
          setCustomers([]);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
        setError(error.message);
        setShowAlert({
          show: true,
          message: `Failed to fetch customers: ${error.message}`,
          type: "error"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []); // Empty dependency array means this runs once on mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = (data) => {
    const errors = [];
    
    if (!data.account_id) errors.push("Account ID is required");
    if (!data.transaction_date) errors.push("Transaction date is required");
    if (!data.amount || parseFloat(data.amount) <= 0) errors.push("Valid amount is required");
    if (!data.transaction_type) errors.push("Transaction type is required");
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const amount = parseFloat(formData.amount);
    
    const transactionData = {
      account_id: parseInt(formData.account_id, 10),
      transaction_date: formData.transaction_date,
      amount: amount,
      transaction_type: formData.transaction_type,
      description: formData.description || ""
    };

    const validationErrors = validateForm(transactionData);
    if (validationErrors.length > 0) {
      setShowAlert({
        show: true,
        message: `Validation errors: ${validationErrors.join(", ")}`,
        type: "error"
      });
      return;
    }

    try {
      const response = await api.addTransaction(transactionData);
      
      setShowAlert({
        show: true,
        message: `Transaction added successfully! New balance: ₹${response.updated_balance.toFixed(2)}`,
        type: "success"
      });
      
      resetForm();
      
      setTimeout(() => {
        setShowAlert({ show: false, message: "", type: "success" });
      }, 3000);
      
    } catch (error) {
      console.error("Transaction error:", error);
      setShowAlert({
        show: true,
        message: error.response?.data?.detail || error.message || "Transaction failed",
        type: "error"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      account_id: "",
      transaction_date: new Date().toISOString().split('T')[0],
      amount: "",
      transaction_type: "",
      description: ""
    });
  };

  if (loading) {
    return <div className="loading-spinner">Loading customers...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="transaction_management_outer_container">
      {showAlert.show && (
        <div className={`alert alert-${showAlert.type}`}>
          {showAlert.message}
        </div>
      )}
      
      <h2 className="transaction_management_main_heading">Add Transaction Details</h2>
      <div className="transaction_management_content_wrapper">
        <div className="transaction_form_section_container">
          <form className="transaction_data_input_form" onSubmit={handleSubmit}>
            <div className="transaction_form_input_group">
              <label htmlFor="account_id" className="transaction_form_input_label">
                Select Customer * {customers.length === 0 && "(No customers available)"}
              </label>
              <select
                id="account_id"
                name="account_id"
                value={formData.account_id}
                onChange={handleChange}
                className="transaction_form_select_input"
                required
              >
                <option value="">Select Customer</option>
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name} (ID: {customer.customer_id}) - Balance: ₹{parseFloat(customer.amount).toFixed(2)}
                  </option>
                ))}
              </select>
            </div>

            {/* Rest of the form fields remain the same */}
            <div className="transaction_form_input_group">
              <label htmlFor="transaction_date" className="transaction_form_input_label">
                Transaction Date *
              </label>
              <input
                type="date"
                id="transaction_date"
                name="transaction_date"
                value={formData.transaction_date}
                onChange={handleChange}
                className="transaction_form_text_input"
                required
                max={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="transaction_form_input_group">
              <label htmlFor="amount" className="transaction_form_input_label">
                Amount (₹) *
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="transaction_form_text_input"
                required
                step="0.01"
                min="0.01"
                placeholder="Enter amount"
              />
            </div>

            <div className="transaction_form_input_group">
              <label htmlFor="transaction_type" className="transaction_form_input_label">
                Transaction Type *
              </label>
              <select
                id="transaction_type"
                name="transaction_type"
                value={formData.transaction_type}
                onChange={handleChange}
                className="transaction_form_select_input"
                required
              >
                <option value="">Select Type</option>
                <option value="credit">Credit (Receive Payment)</option>
                <option value="debit">Debit (Give Loan)</option>
              </select>
            </div>

            <div className="transaction_form_input_group">
              <label htmlFor="description" className="transaction_form_input_label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="transaction_form_textarea_input"
                rows="3"
                placeholder="Enter transaction description (optional)"
              />
            </div>

            <button 
              type="submit" 
              className="transaction_form_submit_button"
              disabled={customers.length === 0}
            >
              Add Transaction
            </button>
          </form>
        </div>
        
        <div className="transaction_illustration_container">
          <img 
            src={transactionImage} 
            alt="Transaction Illustration" 
            className="transaction_illustration_image"
          />
        </div>
      </div>
    </div>
  );
};

export default AddTransactionPage;