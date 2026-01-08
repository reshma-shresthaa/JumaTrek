import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const bookingApi = axios.create({
  baseURL: 'http://localhost:5000/api/booking',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Public (non-auth) API for general endpoints
const publicApi = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const authService = {
  async login(email, password) {
    try {
      const response = await api.post('/login', { email, password });
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Login failed';
    }
  },

  async signup(userData) {
    try {

      const payload = {
        ...userData,
        contact: userData.contactNo
      };

      const response = await api.post('/signup', payload);
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Signup failed';
    }
  },

  logout() {
    try {
      api.post('/logout').catch(err => console.error("Logout error", err));
    } catch (error) {
      console.error("Logout request error:", error);
    }
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('user');
  }
};

export const bookingService = {
  async createBooking(bookingData) {
    try {
      const response = await bookingApi.post('/', bookingData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Booking failed';
    }
  },

  async getUserBookings() {
    try {
      const response = await bookingApi.get('/my');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch bookings';
    }
  }
};

export const inquiryService = {
  async submitInquiry(payload) {
    try {
      const response = await publicApi.post('/inquiry', payload);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to submit inquiry';
    }
  },
};

export const guideService = {
  async getAllGuides() {
    try {
      const response = await publicApi.get('/guides');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch guides';
    }
  },
  async getGuideById(id) {
    try {
      const response = await publicApi.get(`/guides/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch guide details';
    }
  }
};

export const trekService = {
  async getAllTreks(params = {}) {
    try {
      const response = await publicApi.get('/listing', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch treks';
    }
  },
  async getTrekById(id) {
    try {
      const response = await publicApi.get(`/listing/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch trek details';
    }
  },
  async getFeaturedTreks() {
    try {
      const response = await publicApi.get('/listing?limit=6&sort=rating-desc');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch featured treks';
    }
  }
};

export default api;