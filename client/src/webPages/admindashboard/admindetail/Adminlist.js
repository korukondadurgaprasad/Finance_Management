import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditAdminModal from './EditAdminModal';
import './Adminlist.css';
import Header from '../adminheader/adminheader';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const AdminListPage = () => {
  const [admins, setAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'

  useEffect(() => {
    fetchAdmins();
    handleResponsiveView();
    window.addEventListener('resize', handleResponsiveView);
    return () => window.removeEventListener('resize', handleResponsiveView);
  }, []);

  const handleResponsiveView = () => {
    setViewMode(window.innerWidth < 768 ? 'card' : 'table');
  };

  const fetchAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/admins');
      setAdmins(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching admins:', error);
      setIsLoading(false);
    }
  };

  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    setShowEditModal(true);
  };

  const handleDelete = async (adminId) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      try {
        await axios.delete(`http://localhost:8000/api/admin/${adminId}`);
        fetchAdmins();
      } catch (error) {
        console.error('Error deleting admin:', error);
        alert('Failed to delete admin');
      }
    }
  };

  const handleSort = (field) => {
    const direction = field === sortField && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);
  };

  const filteredAndSortedAdmins = [...admins]
    .filter(admin =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.mobile.includes(searchTerm)
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      const compareValue = sortDirection === 'asc' ? 1 : -1;
      return a[sortField] > b[sortField] ? compareValue : -compareValue;
    });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort />;
    return sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  const renderTableView = () => (
    <div className="table-responsive">
      <table className="admin-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>
              Name {getSortIcon('name')}
            </th>
            <th onClick={() => handleSort('email')}>
              Email {getSortIcon('email')}
            </th>
            <th>Mobile</th>
            <th>Gender</th>
            <th onClick={() => handleSort('created_at')}>
              Created At {getSortIcon('created_at')}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedAdmins.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-data">No admins found</td>
            </tr>
          ) : (
            filteredAndSortedAdmins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>{admin.mobile}</td>
                <td>{admin.gender}</td>
                <td>{formatDate(admin.created_at)}</td>
                <td className="action-buttons">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(admin)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(admin.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  const renderCardView = () => (
    <div className="admin-cards">
      {filteredAndSortedAdmins.length === 0 ? (
        <div className="no-data">No admins found</div>
      ) : (
        filteredAndSortedAdmins.map((admin) => (
          <div key={admin.id} className="admin-card">
            <div className="card-header">
              <h3>{admin.name}</h3>
            </div>
            <div className="card-body">
              <p><strong>Email:</strong> {admin.email}</p>
              <p><strong>Mobile:</strong> {admin.mobile}</p>
              <p><strong>Gender:</strong> {admin.gender}</p>
              <p><strong>Created:</strong> {formatDate(admin.created_at)}</p>
            </div>
            <div className="card-actions">
              <button
                className="edit-btn"
                onClick={() => handleEdit(admin)}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(admin.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="admin-page-wrapper">
      <Header />
      <div className="admin-list-container">
        <div className="admin-header">
          <h1>Admin Management</h1>
        </div>

        <div className="controls-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search admins..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="loading">
            <div className="loader"></div>
            <span>Loading...</span>
          </div>
        ) : (
          viewMode === 'table' ? renderTableView() : renderCardView()
        )}

        {showEditModal && (
          <EditAdminModal
            admin={selectedAdmin}
            onClose={() => {
              setShowEditModal(false);
              setSelectedAdmin(null);
            }}
            onUpdate={fetchAdmins}
          />
        )}
      </div>
    </div>
  );
};

export default AdminListPage;