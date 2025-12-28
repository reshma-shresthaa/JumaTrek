import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});



export const authService = {
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
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

      const response = await api.post('/auth/signup', payload);
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Signup failed';
    }
  },

  logout() {
    api.post('/auth/logout').catch(err => console.error("Logout error", err));
    localStorage.removeItem('user');
  },

  async verifySession() {
    try {
      const response = await api.get('/user/currentuser');
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      localStorage.removeItem('user');
      return null;
    }
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
      const response = await api.post('/booking', bookingData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Booking failed';
    }
  },

  async getUserBookings() {
    try {
      const response = await api.get('/booking/my');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch bookings';
    }

  }
};

export default api;