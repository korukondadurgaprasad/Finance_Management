import React, { useState, useEffect } from "react";
import { Table, Button, Input, message } from "antd";
import { EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import api from "../../Services/api";
import './Details.css';

const CustomerDetailsPage = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await api.getCustomers();
      const transformedData = response.customers.map((customer, index) => ({
        key: index.toString(),
        name: customer.name,
        username: customer.username,
        purpose: customer.purpose,
        customerId: customer.customer_id,
        amount: customer.amount,
        interest: customer.interest_rate,
        startDate: customer.start_date,
        endDate: customer.end_date,
        accountType: customer.account_type,
        gender: customer.gender,
        mobile: customer.phone_number,
        aadhar: customer.aadhar
      }));
      setData(transformedData);
    } catch (error) {
      message.error("Failed to fetch customers: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (customerId) => {
    try {
      await api.deleteCustomer(customerId);
      const updatedData = data.filter(item => item.customerId !== customerId);
      setData(updatedData);
      message.success("Customer deleted successfully");
    } catch (error) {
      message.error("Failed to delete customer: " + error.message);
    }
  };

  const handleEdit = (record) => {
    message.info("Edit functionality to be implemented");
  };

  const handleSearch = (value) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeoutId = setTimeout(() => {
      setSearchText(value.toLowerCase().trim());
    }, 300);

    setSearchTimeout(timeoutId);
  };

  const filteredData = data.filter(item => 
    item.name?.toLowerCase().includes(searchText) ||
    item.username?.toLowerCase().includes(searchText) ||
    item.purpose?.toLowerCase().includes(searchText) ||
    item.customerId?.toString().includes(searchText) ||
    item.mobile?.includes(searchText) ||
    item.accountType?.toLowerCase().includes(searchText)
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: "table-cell",
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: 150,
      fixed: 'left'
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      className: "table-cell",
      width: 150
    },
    {
      title: "Purpose",
      dataIndex: "purpose",
      key: "purpose",
      className: "table-cell",
      width: 150
    },
    {
      title: "Customer ID",
      dataIndex: "customerId",
      key: "customerId",
      className: "table-cell",
      width: 120
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      className: "table-cell",
      width: 120,
      render: (amount) => `₹${amount.toLocaleString()}`
    },
    {
      title: "Interest (%)",
      dataIndex: "interest",
      key: "interest",
      className: "table-cell",
      width: 100
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      className: "table-cell",
      width: 120
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      className: "table-cell",
      width: 120
    },
    {
      title: "Account Type",
      dataIndex: "accountType",
      key: "accountType",
      className: "table-cell",
      width: 120,
      render: (type) => type?.charAt(0).toUpperCase() + type?.slice(1)
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      className: "table-cell",
      width: 100
    },
    {
      title: "Mobile No",
      dataIndex: "mobile",
      key: "mobile",
      className: "table-cell",
      width: 120
    },
    {
      title: "Aadhar",
      dataIndex: "aadhar",
      key: "aadhar",
      className: "table-cell",
      width: 120
    },
    {
      title: "Actions",
      key: "actions",
      className: "table-cell-actions",
      fixed: 'right',
      width: 120,
      render: (_, record) => (
        <div className="action-buttons">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            className="edit-button"
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.customerId)}
            className="delete-button"
          >
            Delete
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="main-container">
      <div className="content-wrapper">
        <h1 className="page-title">Customer Details</h1>
        <div className="search-container">
          <Input
            placeholder="Search by Name, Username, Purpose, Customer ID or Mobile"
            prefix={<SearchOutlined className="search-icon" />}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
            allowClear
          />
        </div>
        <div className="table-wrapper">
          <Table
            columns={columns}
            dataSource={filteredData}
            loading={loading}
            scroll={{
              x: 'max-content',
              y: 'calc(100vh - 280px)',
              scrollToFirstRowOnChange: true
            }}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} customers`,
              className: "table-pagination",
              responsive: true
            }}
            className="details-table"
            sticky
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsPage;