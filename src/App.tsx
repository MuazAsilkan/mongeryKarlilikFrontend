import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Outlet } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<DashboardPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

const PrivateRoute: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      navigate('/login');
    }

    const checkToken = () => {
      const storedToken = localStorage.getItem('accessToken');
      if (!storedToken) {
        navigate('/login');
      }
    };

    const interval = setInterval(checkToken, 1000); 

    return () => clearInterval(interval); 
  }, [navigate]);

  return <Outlet/>; 
};

export default App;
