import React, { useState, useEffect } from 'react';
import './Lenderlist.css';
import { api } from '../../../Services/api';

function LenderListPage() {
  const [lenders, setLenders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLenders();
  }, []);

  const fetchLenders = async () => {
    try {
      setLoading(true);
      const response = await api.getLenders();
      setLenders(response);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch lenders');
      setLenders([]);
      console.error('Error fetching lenders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppRedirect = (phoneNumber) => {
    const formattedNumber = phoneNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${formattedNumber}`, '_blank');
  };

  const filteredLenders = lenders.filter(lender => {
    const searchValue = searchTerm.toLowerCase();
    return (
      lender.firstname?.toLowerCase().includes(searchValue) ||
      lender.lastname?.toLowerCase().includes(searchValue) ||
      lender.email?.toLowerCase().includes(searchValue) ||
      lender.phonenumber?.includes(searchTerm)
    );
  });

  const renderContent = () => {
    if (loading) {
      return (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading lenders...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error-message">
          <p>Error: {error}</p>
          <button onClick={fetchLenders} className="retry-button">Retry</button>
        </div>
      );
    }

    if (filteredLenders.length === 0) {
      return (
        <div className="no-lenders">
          <p>{searchTerm ? 'No matching lenders found.' : 'No lenders available at the moment.'}</p>
        </div>
      );
    }

    return (
      <div className="lender-table-wrapper">
        <table className="lender-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLenders.map((lender) => (
              <tr key={lender.id}>
                <td data-label="Name">
                  <span className="lender-name">
                    {lender.firstname} {lender.lastname}
                  </span>
                </td>
                <td data-label="Email">
                  <a href={`mailto:${lender.email}`} className="lender-email">
                    {lender.email}
                  </a>
                </td>
                <td data-label="Phone">
                  <span className="lender-phone">
                    {lender.phonenumber || 'Not provided'}
                  </span>
                </td>
                <td data-label="Action">
                  <button
                    onClick={() => handleWhatsAppRedirect(lender.phonenumber)}
                    className="action-button whatsapp-button"
                    disabled={!lender.phonenumber}
                  >
                    Chat on WhatsApp
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="lender-container">
      <div className="lender-header">
        <h1>Borrower Dashboard</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      <div className="lender-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default LenderListPage;