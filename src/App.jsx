/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

// Layout components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Sidebar from './components/common/Sidebar';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ClassificationPage from './pages/ClassificationPage';
import BatchClassificationPage from './pages/BatchClassificationPage';
import HistoryPage from './pages/HistoryPage';
import ChatbotPage from './pages/ChatbotPage';
import DeveloperDashboardPage from './pages/DeveloperDashboardPage';

// Auth guard
import PrivateRoute from './components/auth/PrivateRoute';

// Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header toggleSidebar={toggleSidebar} />
        
        <Box sx={{ display: 'flex', flex: 1 }}>
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route 
                path="/classification" 
                element={
                  <PrivateRoute>
                    <ClassificationPage />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/batch-classification" 
                element={
                  <PrivateRoute>
                    <BatchClassificationPage />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/history" 
                element={
                  <PrivateRoute>
                    <HistoryPage />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/chatbot" 
                element={
                  <PrivateRoute>
                    <ChatbotPage />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/developer" 
                element={
                  <PrivateRoute adminOnly={true}>
                    <DeveloperDashboardPage />
                  </PrivateRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
        </Box>
        
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
