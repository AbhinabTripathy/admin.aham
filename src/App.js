import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/auth/LandingPage';
import AdminLogin from './components/auth/AdminLogin';
import CreatorLogin from './components/auth/CreatorLogin';
import CreatorSignup from './components/auth/CreatorSignup';
import AdminDashboard from './components/Admin/AdminDashboard';
import './App.css';
import CreaterDashboard from './components/Creator/CreaterDashboard';
import CreatorProfile from './components/Creator/CreatorProfile';
// import CreaterDashboard from './components/Creator/CreaterDashboard';

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
  
  if (!isAuthenticated) {
    return <Navigate to="/creator-login" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/creator-login" element={<CreatorLogin />} />
        <Route path="/signup" element={<CreatorSignup />} />
        
        {/* Protected Admin Dashboard Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard/articles"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard/videos"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard/all-content"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard/pending"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard/rejected"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard/users"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard/add-users"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Creator Dashboard Routes */}
        <Route
          path="/creator-dashboard"
          element={
            <ProtectedCreatorRoute>
              <CreaterDashboard />
            </ProtectedCreatorRoute>
          }
        />
        <Route
          path="/creator-dashboard/create-content/graphic-novel"
          element={
            <ProtectedCreatorRoute>
              <CreaterDashboard />
            </ProtectedCreatorRoute>
          }
        />
        <Route
          path="/creator-dashboard/create-content/audio-book"
          element={
            <ProtectedCreatorRoute>
              <CreaterDashboard />
            </ProtectedCreatorRoute>
          }
        />
        <Route
          path="/creator-dashboard/graphic-novels"
          element={
            <ProtectedCreatorRoute>
              <CreaterDashboard />
            </ProtectedCreatorRoute>
          }
        />
        <Route
          path="/creator-dashboard/audio-books"
          element={
            <ProtectedCreatorRoute>
              <CreaterDashboard />
            </ProtectedCreatorRoute>
          }
        />
        <Route
          path="/creator-dashboard/all-content"
          element={
            <ProtectedCreatorRoute>
              <CreaterDashboard />
            </ProtectedCreatorRoute>
          }
        />
        <Route
          path="/creator-dashboard/pending"
          element={
            <ProtectedCreatorRoute>
              <CreaterDashboard />
            </ProtectedCreatorRoute>
          }
        />
        <Route
          path="/creator-dashboard/rejected"
          element={
            <ProtectedCreatorRoute>
              <CreaterDashboard />
            </ProtectedCreatorRoute>
          }
        />
        <Route
          path="/creator-dashboard/profile"
          element={
            <ProtectedCreatorRoute>
              <CreatorProfile />
            </ProtectedCreatorRoute>
          }
        />
        <Route
          path="/creator-dashboard/create-content"
          element={
            <ProtectedCreatorRoute>
              <CreaterDashboard />
            </ProtectedCreatorRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
