import React, { useState, useEffect } from 'react';
import api from "../../Services/api";
import { FaSort, FaSortUp, FaSortDown, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Transaction.css';

const TransactionDetailsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Responsive itemsPerPage adjustment
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(5);
      } else {
        setItemsPerPage(10);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await api.getAllTransactionDetails();
      setTransactions(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch transactions. Please try again later.');
      toast.error('Error loading transactions');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    try {
      const headers = [
        'Customer Name',
        'Customer ID',
        'Date',
        'Amount',
        'Type',
        'Description'
      ].join(',');

      const csvData = transactions.map(transaction => {
        return [
          transaction.customer_name,
          transaction.customer_id,
          new Date(transaction.transaction_date).toLocaleDateString(),
          transaction.amount.toFixed(2),
          transaction.transaction_type,
          transaction.description
        ].map(field => `"${field}"`).join(',');
      });

      const csvContent = [headers, ...csvData].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      link.setAttribute('href', url);
      link.setAttribute('download', 'transaction_details.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Download started successfully');
    } catch (err) {
      toast.error('Error downloading transactions');
      console.error('Download error:', err);
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = null;
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnName) => {
    if (sortConfig.key !== columnName) return <FaSort />;
    if (sortConfig.direction === 'ascending') return <FaSortUp />;
    if (sortConfig.direction === 'descending') return <FaSortDown />;
    return <FaSort />;
  };

  const sortedTransactions = React.useMemo(() => {
    let sortableTransactions = [...transactions];
    if (searchTerm) {
      sortableTransactions = sortableTransactions.filter(
        transaction =>
          transaction.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.customer_id.toString().includes(searchTerm) ||
          transaction.amount.toString().includes(searchTerm)
      );
    }
    if (sortConfig.key && sortConfig.direction) {
      sortableTransactions.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableTransactions;
  }, [transactions, sortConfig, searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Smooth scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <div className="loading">Loading transactions...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="transaction-details-container">
      <h1>Transaction Details</h1>
      
      <div className="controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by customer name, ID or amount..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <button
          onClick={handleDownload}
          className="download-button"
          title="Download Transactions"
        >
          <FaDownload /> <span className="button-text">Download CSV</span>
        </button>
      </div>

      <div className="table-wrapper">
        <div className="table-scroll">
          <table className="transaction-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('customer_name')}>
                  Customer Name {getSortIcon('customer_name')}
                </th>
                <th onClick={() => handleSort('customer_id')}>
                  Customer ID {getSortIcon('customer_id')}
                </th>
                <th onClick={() => handleSort('transaction_date')}>
                  Date {getSortIcon('transaction_date')}
                </th>
                <th onClick={() => handleSort('amount')}>
                  Amount {getSortIcon('amount')}
                </th>
                <th onClick={() => handleSort('transaction_type')}>
                  Type {getSortIcon('transaction_type')}
                </th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((transaction) => (
                <tr key={transaction.id}>
                  <td data-label="Customer Name">{transaction.customer_name}</td>
                  <td data-label="Customer ID">{transaction.customer_id}</td>
                  <td data-label="Date">
                    {new Date(transaction.transaction_date).toLocaleDateString()}
                  </td>
                  <td 
                    data-label="Amount" 
                    className={`amount ${transaction.transaction_type}`}
                  >
                    ₹{transaction.amount.toFixed(2)}
                  </td>
                  <td data-label="Type">
                    <span className={`status-badge ${transaction.transaction_type}`}>
                      {transaction.transaction_type}
                    </span>
                  </td>
                  <td data-label="Description">{transaction.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pagination">
        <button 
          onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <div className="page-numbers">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button 
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionDetailsPage;