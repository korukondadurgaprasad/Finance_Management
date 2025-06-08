import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import './Pie.css';
import api from "../../Services/api";


const AnalyticsDashboard = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalStats, setTotalStats] = useState({
    totalAmount: 0,
    totalCustomers: 0,
    creditTotal: 0,
    debitTotal: 0
  });

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch transactions
        const transactionResponse = await api.getAllTransactionDetails();
        if (transactionResponse.status === 'success') {
          setTransactionData(transactionResponse.data);
          
          // Calculate totals
          const { creditTotal, debitTotal } = transactionResponse.data.reduce((acc, curr) => {
            if (curr.transaction_type === 'credit') {
              acc.creditTotal += curr.amount;
            } else {
              acc.debitTotal += curr.amount;
            }
            return acc;
          }, { creditTotal: 0, debitTotal: 0 });

          // Fetch customers
          const customerResponse = await api.getCustomers();
          setCustomerData(customerResponse.customers);
          
          setTotalStats({
            totalAmount: creditTotal + debitTotal,
            totalCustomers: customerResponse.customers.length,
            creditTotal,
            debitTotal
          });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Process transaction data for monthly bar chart
  const getMonthlyData = () => {
    const monthlyData = transactionData.reduce((acc, transaction) => {
      const month = new Date(transaction.transaction_date).toLocaleString('default', { month: 'short' });
      if (!acc[month]) {
        acc[month] = { month, credit: 0, debit: 0 };
      }
      if (transaction.transaction_type === 'credit') {
        acc[month].credit += transaction.amount;
      } else {
        acc[month].debit += transaction.amount;
      }
      return acc;
    }, {});
    
    return Object.values(monthlyData);
  };

  // Process data for customer distribution pie chart
  const getCustomerDistribution = () => {
    const distribution = customerData.reduce((acc, customer) => {
      const type = customer.account_type;
      if (!acc[type]) {
        acc[type] = { name: type, value: 0 };
      }
      acc[type].value++;
      return acc;
    }, {});
    
    return Object.values(distribution);
  };

  if (loading) {
    return (
      <div className="analytics-loading">
        Loading analytics data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="analytics-error">
        Error loading analytics: {error}
      </div>
    );
  }

  return (
    <div className="analytics-dashboard">
      {/* Statistics Cards */}
      <div className="analytics-stats-grid">
        <div className="stat-card total-amount">
          <h3>Total Amount</h3>
          <p>₹{totalStats.totalAmount.toLocaleString()}</p>
        </div>
        <div className="stat-card total-customers">
          <h3>Total Customers</h3>
          <p>{totalStats.totalCustomers}</p>
        </div>
        <div className="stat-card total-credit">
          <h3>Total Credit</h3>
          <p>₹{totalStats.creditTotal.toLocaleString()}</p>
        </div>
        <div className="stat-card total-debit">
          <h3>Total Debit</h3>
          <p>₹{totalStats.debitTotal.toLocaleString()}</p>
        </div>
      </div>

      {/* Monthly Transactions Bar Chart */}
      <div className="chart-container">
        <h3>Monthly Transaction Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={getMonthlyData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="credit" fill="#82ca9d" name="Credit" />
            <Bar dataKey="debit" fill="#8884d8" name="Debit" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Customer Distribution Pie Chart */}
      <div className="chart-container">
        <h3>Customer Account Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={getCustomerDistribution()}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {getCustomerDistribution().map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Transaction Trend Line Chart */}
      <div className="chart-container">
        <h3>Transaction Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={transactionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="transaction_date" 
              tickFormatter={(date) => new Date(date).toLocaleDateString()}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="amount" 
              stroke="#8884d8" 
              name="Transaction Amount"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;