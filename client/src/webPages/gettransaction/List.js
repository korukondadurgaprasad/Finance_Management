import React, { useState } from 'react';
import './List.css';
import Generatelist from '../../Assets/gett.jpg';
import api from '../../Services/api';

const GetTransactionPage = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await api.getTransactionsByDate(startDate, endDate);
      setTransactions(response.transactions || []);
    } catch (err) {
      if (err.message === 'Session expired. Please login again.') {
        // Handle session expiration
        return;
      }
      setError(err.message || 'Failed to fetch transactions');
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const headers = ['Account ID', 'Customer Name', 'Date', 'Amount', 'Type', 'Description'];
    const csvData = transactions.map(transaction => [
      transaction.account_id,
      transaction.customer_name,
      new Date(transaction.transaction_date).toLocaleDateString(),
      transaction.amount.toFixed(2),
      transaction.transaction_type,
      transaction.description || '-'
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `transactions_${startDate}_${endDate}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="transaction_history_management_container_wrapper">
      <div className="transaction_history_content_section_container">
        <div className="transaction_history_image_display_container">
          <img 
            src={Generatelist}
            alt="Transaction Dashboard"
            className="transaction_history_display_image_element"
          />
        </div>
        
        <div className="transaction_history_form_display_container">
          {error && <div className="error-message" style={{color: 'red', marginBottom: '1rem'}}>{error}</div>}
          
          <form onSubmit={handleSubmit} className="transaction_history_date_input_form_wrapper">
            <div className="transaction_history_date_input_fields_container">
              <div className="transaction_history_input_field_group">
                <label className="transaction_history_input_field_label">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="transaction_history_start_date_input_field"
                  required
                />
              </div>
              <div className="transaction_history_input_field_group">
                <label className="transaction_history_input_field_label">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="transaction_history_end_date_input_field"
                  required
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="transaction_history_generate_button_element"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Generate'}
            </button>
          </form>

          {transactions.length > 0 && (
            <div className="transaction_history_results_display_container">
              <div className="transaction_history_table_scroll_wrapper">
                <table className="transaction_history_data_table_element">
                  <thead>
                    <tr>
                      <th>Account ID</th>
                      <th>Customer Name</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Type</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td>{transaction.account_id}</td>
                        <td>{transaction.customer_name}</td>
                        <td>{new Date(transaction.transaction_date).toLocaleDateString()}</td>
                        <td>${transaction.amount.toFixed(2)}</td>
                        <td>{transaction.transaction_type}</td>
                        <td>{transaction.description || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button 
                onClick={handleDownload}
                className="transaction_history_download_button_element"
              >
                Download CSV
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetTransactionPage;