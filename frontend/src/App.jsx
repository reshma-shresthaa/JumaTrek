import React, { useState , useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Booking from './pages/Booking';
import AllTreks from './pages/AllTreks';
import TrekDetail from './pages/TrekDetail';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AuthPage from './pages/AuthPage';
import ScrollProgress from './components/layout/ScrollProgress';
import ScrollToTop from './components/layout/ScrollToTop';
import './index.css';
import { authService } from './services/api';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await authService.verifySession();
      setUser(currentUser); // update state
    };
    fetchUser();
  }, []);
  return (
    
    <Router>
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
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthPage />} />
+         <Route path="/signup" element={<AuthPage />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/all-treks" element={<AllTreks />} />
          <Route path="/trek/:id" element={<TrekDetail />} />
           <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;