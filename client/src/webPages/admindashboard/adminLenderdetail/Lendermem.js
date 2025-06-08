import React, { useState, useEffect } from 'react';
import './Lendermem.css';

const LenderMembersPage = () => {
  const [lenders, setLenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLenders();
  }, []);

  const fetchLenders = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      const lendersOnly = data.filter(user => user.role.toLowerCase() === 'lender');
      setLenders(lendersOnly);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const filteredLenders = lenders.filter(lender =>
    lender.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lender.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading-container">Loading lenders...</div>;
  if (error) return <div className="error-container">Error: {error}</div>;

  return (
    <div className="table-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search lenders..."
          className="search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-wrapper">
        <table className="ant-table">
          <thead className="ant-table-thead">
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody className="ant-table-tbody">
            {filteredLenders.map((lender) => (
              <tr key={lender.id}>
                <td>{lender.username}</td>
                <td>{lender.email}</td>
                <td>{`${lender.firstname} ${lender.lastname}`}</td>
                <td>{lender.phonenumber}</td>
                <td>{lender.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lender-count">
        Total Lenders: {filteredLenders.length}
      </div>
    </div>
  );
};

export default LenderMembersPage;