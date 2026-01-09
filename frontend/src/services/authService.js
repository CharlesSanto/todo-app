import api from './api';

export const authService = {
    login: async (email, password) => {
        const response = await api.post('/login', { email, password });
        return response.data;
    },

    setToken: (token) => {
        localStorage.setItem('authToken', token);
    },

    getToken: () => {
        return localStorage.getItem('authToken');
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('authToken');
    },

    logout: () => {
        localStorage.removeItem('authToken');
    }
}