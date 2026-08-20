/**
 * Admin Panel - React Frontend
 * 
 * This is the main entry point for the admin panel.
 * It will be served at /admin and handle all admin routes.
 * 
 * The backend PHP API is in /api directory and handles:
 * - Authentication (sessions)
 * - CRUD operations
 * - Data validation
 * 
 * The frontend React app communicates with the API via fetch/axios.
 */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from '../components/admin/AdminLayout';
import { AdminLogin } from '../components/admin/AdminLogin';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { AdminServices } from '../components/admin/AdminServices';
import { AdminServiceEdit } from '../components/admin/AdminServiceEdit';
import { AdminApplicationTypes } from '../components/admin/AdminApplicationTypes';
import { AdminLocations } from '../components/admin/AdminLocations';
import { AdminBlog } from '../components/admin/AdminBlog';
import { AdminBlogEdit } from '../components/admin/AdminBlogEdit';
import { AdminContactInfo } from '../components/admin/AdminContactInfo';
import { AdminLeads } from '../components/admin/AdminLeads';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}

export default function AdminPanel() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<AdminLogin />} />
      
      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="services/new" element={<AdminServiceEdit />} />
        <Route path="services/:id/edit" element={<AdminServiceEdit />} />
        <Route path="application-types" element={<AdminApplicationTypes />} />
        <Route path="locations" element={<AdminLocations />} />
        <Route path="blog" element={<AdminBlog />} />
        <Route path="blog/new" element={<AdminBlogEdit />} />
        <Route path="blog/:id/edit" element={<AdminBlogEdit />} />
        <Route path="contact-info" element={<AdminContactInfo />} />
        <Route path="leads" element={<AdminLeads />} />
      </Route>
      
      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
