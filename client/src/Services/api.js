const API_BASE_URL = 'http://localhost:8000';

const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('accessToken');
      throw new Error('Authentication failed');
    }
    throw new Error(data.detail || 'API request failed');
  }
  
  return data;
};

const getHeaders = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('No authentication token found');
  }
  
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

export const api = {
  signup: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Signup failed');
      }
      
      return data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  login: async (email, password, role) => {
    try {
      const params = new URLSearchParams({
        email: email,
        password: password,
        role: role
      });

      const response = await fetch(`${API_BASE_URL}/login?${params}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Invalid credentials');
      }
      
      const data = await response.json();
      
      // Handle both admin and regular user responses
      if (!data.access_token || !data.role) {
        throw new Error('Invalid response from server');
      }
      
      // For admin login, we don't require user_id
      if (data.role !== 'admin' && !data.user_id) {
        throw new Error('Invalid response from server');
      }
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  addCustomer: async (customerData) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_BASE_URL}/customers`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          localStorage.clear();
          window.location.href = '/login';
          throw new Error('Session expired. Please login again.');
        }
        throw new Error(errorData.detail || 'Failed to add customer');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },


  getNextCustomerId: async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_BASE_URL}/next-customer-id`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to get next customer ID');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  // Get customers for logged-in lender only
  getAuthHeaders: () => {
    const token = localStorage.getItem('accessToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  },

  getCustomers: async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_BASE_URL}/customers`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.clear();
          window.location.href = '/login';
          throw new Error('Session expired. Please login again.');
        }
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch customers');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  getCustomerDetails: async (customerId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/customers/${customerId}`, {
        method: 'GET',
        headers: api.getAuthHeaders(),
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.clear();
          window.location.href = '/login';
          throw new Error('Session expired. Please login again.');
        }
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch customer details');
      }
      
      return await response.json();
    } catch (error) {
      throw error;
    }
  },


  addTransaction: async (transactionData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions`, {
        method: 'POST',
        headers: api.getAuthHeaders(),
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.clear();
          window.location.href = '/login';
          throw new Error('Session expired. Please login again.');
        }
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to add transaction');
      }
      
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
  

  getCustomerTransactions: async (customerId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/${customerId}`, {
        method: 'GET',
        headers: api.getAuthHeaders(),
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.clear();
          window.location.href = '/login';
          throw new Error('Session expired. Please login again.');
        }
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch transactions');
      }
      
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  getTransactionsByDate: async (startDate, endDate) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(
        `${API_BASE_URL}/gettransactions?start_date=${startDate}&end_date=${endDate}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.clear();
          window.location.href = '/login';
          throw new Error('Session expired. Please login again.');
        }
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch transactions');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  },

  getAllTransactionDetails: async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_BASE_URL}/api/transactions/details`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.clear();
          window.location.href = '/login';
          throw new Error('Session expired. Please login again.');
        }
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch transaction details');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },


  createAdmin: async (adminData) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_BASE_URL}/api/admin/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to create admin');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  getAdminList: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/list`, {
        method: 'GET',
        headers: getHeaders(),
      });
      
      return handleResponse(response);
    } catch (error) {
      console.error('Get admin list error:', error);
      throw error;
    }
  },

  updateAdmin: async (adminId, adminData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/${adminId}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(adminData),
      });
      
      return handleResponse(response);
    } catch (error) {
      console.error('Update admin error:', error);
      throw error;
    }
  },

  deleteAdmin: async (adminId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/${adminId}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      
      return handleResponse(response);
    } catch (error) {
      console.error('Delete admin error:', error);
      throw error;
    }
  },
  getLenders: async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/lenders`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to fetch lenders');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching lenders:', error);
      throw error;
    }
  }


};



export default api;