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

    // Guides
    async getGuides(params = {}) {
        try {
            const response = await adminApi.get('/guides', { params });
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to fetch guides';
        }
    },

    async createGuide(guideData) {
        try {
            let config = {};
            let payload = guideData;

            if (guideData instanceof FormData) {
                config.headers = { 'Content-Type': 'multipart/form-data' };
            }

            const response = await adminApi.post('/guides', payload, config);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to create guide';
        }
    },

    async updateGuide(id, guideData) {
        try {
            let config = {};
            let payload = guideData;

            if (guideData instanceof FormData) {
                config.headers = { 'Content-Type': 'multipart/form-data' };
            }

            const response = await adminApi.put(`/guides/${id}`, payload, config);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to update guide';
        }
    },

    async deleteGuide(id) {
        try {
            const response = await adminApi.delete(`/guides/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to delete guide';
        }
    },

    // Blogs
    async getBlogs(params = {}) {
        try {
            const response = await adminApi.get('/blogs', { params });
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to fetch blogs';
        }
    },

    async getBlogById(id) {
        try {
            const response = await adminApi.get(`/blogs/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to fetch blog';
        }
    },

    async createBlog(blogData) {
        try {
            let config = {};
            let payload = blogData;

            if (blogData instanceof FormData) {
                config.headers = { 'Content-Type': 'multipart/form-data' };
            }

            const response = await adminApi.post('/blogs', payload, config);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to create blog';
        }
    },

    async updateBlog(id, blogData) {
        try {
            let config = {};
            let payload = blogData;

            if (blogData instanceof FormData) {
                config.headers = { 'Content-Type': 'multipart/form-data' };
            }

            const response = await adminApi.put(`/blogs/${id}`, payload, config);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to update blog';
        }
    },

    async deleteBlog(id) {
        try {
            const response = await adminApi.delete(`/blogs/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to delete blog';
        }
    },

    // Custom Trip Requests
    async getCustomTrips(params = {}) {
        try {
            const response = await adminApi.get('/custom-trips', { params });
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to fetch custom trip requests';
        }
    },

    async getCustomTripById(id) {
        try {
            const response = await adminApi.get(`/custom-trips/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to fetch custom trip request';
        }
    },

    async updateCustomTripStatus(id, { status, adminNotes }) {
        try {
            const response = await adminApi.patch(`/custom-trips/${id}/status`, { status, adminNotes });
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to update custom trip request';
        }
    },
};

export default adminApi;
