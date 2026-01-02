import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

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

export default api;