import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // First check local storage for immediate UI
                const savedUser = authService.getCurrentUser();
                if (savedUser) {
                    setUser(savedUser);
                }

                // Then verify with backend
                const verifiedUser = await authService.verifySession();
                if (verifiedUser) {
                    setUser(verifiedUser);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Auth verification failed:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const data = await authService.login(email, password);
            setUser(data);
            return data;
        } catch (error) {
            throw error;
        }
    };

    const signup = async (userData) => {
        try {
            const data = await authService.signup(userData);
            setUser(data);
            return data;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
