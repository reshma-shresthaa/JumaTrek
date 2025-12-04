import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import AllTreks from './pages/AllTreks';
import TrekDetail from './pages/TrekDetail';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/layout/ScrollProgress';
import './index.css';

function App() {
  return (
    <Router>
      <ScrollProgress />
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/all-treks" element={<AllTreks />} />
          <Route path="/trek/:id" element={<TrekDetail />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;