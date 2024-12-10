import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import User from './pages/user/User';
import Layout from './components/layout/Layout';
import ProtectedRoute from './routes/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<ProtectedRoute><User /></ProtectedRoute>} />
      </Routes>
    </Layout>
  );
};

export default App;
