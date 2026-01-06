import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

// Import pages
import Home from './pages/Home';
import Booking from './pages/Booking';
import AllTreks from './pages/AllTreks';
import TrekDetail from './pages/TrekDetail';
import UserProfile from './pages/UserProfile';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AuthPage from './pages/AuthPage';
import DestinationsPage from './pages/DestinationsPage';
import ScrollProgress from './components/layout/ScrollProgress';
import ScrollToTop from './components/layout/ScrollToTop';
import AboutPage from './pages/AboutPage';
import GuidesPage from './pages/GuidesPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import TrekQuiz from './pages/quiz/TrekQuiz';

// Admin components
import AdminLogin from './pages/admin/Login';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import TreksList from './pages/admin/treks/TreksList';
import AddTrek from './pages/admin/treks/AddTrek';
import EditTrek from './pages/admin/treks/EditTrek';
import TrekDetailAdmin from './pages/admin/treks/TrekDetail';
import ProtectedRoute from './components/auth/ProtectedRoute';
import CustomTrip from './pages/CustomTrip';

// New Admin Pages
import UsersList from './pages/admin/users/UsersList';
import BookingsList from './pages/admin/bookings/BookingsList';
import GuidesList from './pages/admin/guides/GuidesList';
import AddGuide from './pages/admin/guides/AddGuide';
import EditGuide from './pages/admin/guides/EditGuide';
import BlogsList from './pages/admin/blogs/BlogsList';
import AddBlog from './pages/admin/blogs/AddBlog';
import EditBlog from './pages/admin/blogs/EditBlog';
import ContactMessagesList from './pages/admin/messages/ContactMessagesList';
import CustomRequestList from './pages/admin/customRequests/CustomRequestList';

import './index.css';
import './assets/styles/globals.css';
import './App.css';

function MainLayout() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Add a simple debug log
  useEffect(() => {
    console.log('Current route:', location.pathname);
  }, [location]);

  // Don't render header/footer for admin routes
  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="custom-requests" element={<CustomRequestList />} />
            <Route path="treks" element={<TreksList />} />
            <Route path="treks/add" element={<AddTrek />} />
            <Route path="treks/:id" element={<TrekDetailAdmin />} />
            <Route path="treks/edit/:id" element={<EditTrek />} />
            <Route path="users" element={<UsersList />} />
            <Route path="bookings" element={<BookingsList />} />
            <Route path="guides" element={<GuidesList />} />
            <Route path="guides/add" element={<AddGuide />} />
            <Route path="guides/edit/:id" element={<EditGuide />} />
            <Route path="blogs" element={<BlogsList />} />
            <Route path="blogs/add" element={<AddBlog />} />
            <Route path="blogs/edit/:id" element={<EditBlog />} />
            <Route path="messages" element={<ContactMessagesList />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    );
  }

  return (
    <>
      <ScrollToTop />
      <ScrollProgress />
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <main className={isHome ? '' : 'container'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/guides" element={<GuidesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/all-treks" element={<AllTreks />} />
          <Route path="/trek/:id" element={<TrekDetail />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/quiz" element={<TrekQuiz />} />
          <Route path="/custom-trip" element={<CustomTrip />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return <MainLayout />;
}

export default App;