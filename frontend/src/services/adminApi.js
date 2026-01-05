import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin';

const adminApi = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add response interceptor for error handling
adminApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            // Redirect to admin login on auth errors
            localStorage.removeItem('adminUser');
            window.location.href = '/admin/login';
        }
        return Promise.reject(error);
    }
);

export const adminService = {
    // Authentication
    async login(email, password) {
        try {
            const response = await adminApi.post('/login', { email, password });
            if (response.data.success && response.data.user) {
                localStorage.setItem('adminUser', JSON.stringify(response.data.user));
                if (response.data.token) {
                    localStorage.setItem('adminToken', response.data.token);
                }
                return response.data;
            }
            throw new Error('Invalid response from server');
        } catch (error) {
            throw error.response?.data?.message || 'Login failed';
        }
    },

    getCurrentAdmin() {
        const admin = localStorage.getItem('adminUser');
        return admin ? JSON.parse(admin) : null;
    },

    isAuthenticated() {
        return !!localStorage.getItem('adminUser');
    },

    async logout() {
        try {
            // Clear admin user from localStorage
            localStorage.removeItem('adminUser');
            // Clear cookie by making request to backend if needed
            // For now, just clear local storage
            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            return { success: true }; // Always succeed locally
        }
    },

    getCurrentAdmin() {
        const admin = localStorage.getItem('adminUser');
        return admin ? JSON.parse(admin) : null;
    },

    isAuthenticated() {
        return !!localStorage.getItem('adminUser');
    },

    // Dashboard
    async getDashboardStats() {
        try {
            const response = await adminApi.get('/dashboard');
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to fetch dashboard stats';
        }
    },

    // Users
    async getAllUsers() {
        try {
            const response = await adminApi.get('/users');
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to fetch users';
        }
    },

    async deleteUser(userId) {
        try {
            const response = await adminApi.delete(`/users/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to delete user';
        }
    },

    // Bookings
    async getAllBookings() {
        try {
            const response = await adminApi.get('/bookings');
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to fetch bookings';
        }
    },

    async updateBookingStatus(bookingId, status) {
        try {
            const response = await adminApi.patch(`/bookings/${bookingId}/status`, { status });
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to update booking status';
        }
    },

    // Listings/Treks
    async getAllListings(params = {}) {
        try {
            const response = await adminApi.get('/listing', { params });
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to fetch listings';
        }
    },

    async getListingById(listingId) {
        try {
            const response = await adminApi.get(`/listing/${listingId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to fetch listing';
        }
    },

    async createListing(formData) {
        try {
            const response = await adminApi.post('/listing', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to create listing';
        }
    },

    async updateListing(listingId, formData) {
        try {
            const response = await adminApi.put(`/listing/${listingId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to update listing';
        }
    },

    async deleteListing(listingId) {
        try {
            const response = await adminApi.delete(`/listing/${listingId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to delete listing';
        }
    },
};

export default adminApi;
