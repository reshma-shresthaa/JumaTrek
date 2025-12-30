import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import TreksList from '../pages/admin/treks/TreksList';
import AddTrek from '../pages/admin/treks/AddTrek';
import EditTrek from '../pages/admin/treks/EditTrek';
import TrekDetail from '../pages/admin/treks/TrekDetail';
import UsersList from '../pages/admin/users/UsersList';
import UserDetail from '../pages/admin/users/UserDetail';
import BookingsList from '../pages/admin/bookings/BookingsList';
import BookingDetail from '../pages/admin/bookings/BookingDetail';
import GuidesList from '../pages/admin/guides/GuidesList';
import MediaLibrary from '../pages/admin/media/MediaLibrary';
import Settings from '../pages/admin/settings/Settings';
import Login from '../pages/admin/Login';
import NotFound from '../pages/NotFound';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        
        {/* Treks Routes */}
        <Route path="treks">
          <Route index element={<TreksList />} />
          <Route path="add" element={<AddTrek />} />
          <Route path=":id" element={<TrekDetail />} />
          <Route path="edit/:id" element={<EditTrek />} />
        </Route>
        
        {/* Users Routes */}
        <Route path="users">
          <Route index element={<UsersList />} />
          <Route path=":id" element={<UserDetail />} />
        </Route>
        
        {/* Bookings Routes */}
        <Route path="bookings">
          <Route index element={<BookingsList />} />
          <Route path=":id" element={<BookingDetail />} />
        </Route>
        
        {/* Guides Routes */}
        <Route path="guides" element={<GuidesList />} />
        
        {/* Media Routes */}
        <Route path="media" element={<MediaLibrary />} />
        
        {/* Settings Route */}
        <Route path="settings" element={<Settings />} />
        
        {/* 404 - Keep this at the end */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
