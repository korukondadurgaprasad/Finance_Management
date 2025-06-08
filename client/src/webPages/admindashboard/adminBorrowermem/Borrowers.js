import React, { useState, useEffect } from 'react';
import './Borrowers.css';

const BorrowedMembersPage = () => {
  const [borrowers, setBorrowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    fetchBorrowers();
  }, []);

  const fetchBorrowers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setBorrowers(data.filter(user => user.role.toLowerCase() === 'borrower'));
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const sortedBorrowers = React.useMemo(() => {
    const sorted = [...borrowers].filter(borrower =>
      borrower.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      borrower.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];
        
        if (sortConfig.key === 'name') {
          aVal = `${a.firstname} ${a.lastname}`;
          bVal = `${b.firstname} ${b.lastname}`;
        }
        
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sorted;
  }, [borrowers, searchTerm, sortConfig]);

  if (loading) return <div className="loading-state">Loading borrowers...</div>;
  if (error) return <div className="error-state">Error: {error}</div>;

  return (
    <div className="borrowers-container">
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search borrowers by username or email..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="borrowers-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('username')}>
                Username {sortConfig.key === 'username' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('email')}>
                Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('name')}>
                Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('phonenumber')}>
                Phone {sortConfig.key === 'phonenumber' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {sortedBorrowers.map((borrower) => (
              <tr key={borrower.id}>
                <td>{borrower.username}</td>
                <td>{borrower.email}</td>
                <td>{`${borrower.firstname} ${borrower.lastname}`}</td>
                <td>{borrower.phonenumber}</td>
                <td>{borrower.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="borrowers-count">
        Total Borrowers: {sortedBorrowers.length}
      </div>
    </div>
  );
};

export default BorrowedMembersPage;