import React, { useState } from 'react';
import Header from '../components/Header';
import TotalPrice from '../components/TotalPrice';
import MainTable from '../components/MainTable';
import { ConfigProvider, theme } from 'antd';

const DashboardPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <div className="flex items-center min-h-screen flex-col" style={{backgroundColor:darkMode ? "#757575" : "#bbbbbb"}}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
        <TotalPrice />
        <MainTable />
      </div>
    </ConfigProvider>
  );
};

export default DashboardPage;