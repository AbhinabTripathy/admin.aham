import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/auth/LandingPage';
import AdminLogin from './components/auth/AdminLogin';
import CreatorLogin from './components/auth/CreatorLogin';
import CreatorSignup from './components/auth/CreatorSignup';
import AdminDashboard from './components/Admin/AdminDashboard';
import PostBanner from './components/Admin/PostBanner';
import Profile from './components/Admin/Profile';
import './App.css';
import CreaterDashboard from './components/Creator/CreaterDashboard';
import CreatorProfile from './components/Creator/CreatorProfile';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminAuth') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

// Protected Creator Route Component
const ProtectedCreatorRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('creatorAuth') === 'true';
  const token = localStorage.getItem('creatorToken');
  
  console.log('Creator Route Protection:', {
    isAuthenticated,
    hasToken: !!token
  });
  
  if (!isAuthenticated || !token) {
    console.log('Redirecting to creator login - not authenticated');
    return <Navigate to="/creator-login" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/creator-login" element={<CreatorLogin />} />
        <Route path="/creator-signup" element={<CreatorSignup />} />
        
        {/* Protected Admin Routes */}
        <Route
          path="/admin-dashboard/*"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/post-banner"
          element={
            <ProtectedRoute>
              <PostBanner />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Protected Creator Routes */}
        <Route
          path="/creator-dashboard/*"
          element={
            <ProtectedCreatorRoute>
              <CreaterDashboard />
            </ProtectedCreatorRoute>
          }
        />
        <Route
          path="/creator/profile"
          element={
            <ProtectedCreatorRoute>
              <CreatorProfile />
            </ProtectedCreatorRoute>
          }
        />

        {/* Catch all route - redirect to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
