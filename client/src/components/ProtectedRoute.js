// components/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  
  // Check for both token and role
  const accessToken = localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('role');
  
  // Function to validate admin token
  const isValidAdminToken = () => {
    return accessToken === 'admin-token' && userRole === 'admin';
  };

  if (!accessToken || !isValidAdminToken()) {
    // Redirect to login page with the return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;