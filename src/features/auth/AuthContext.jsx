import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check local storage for JWT token on mount
        const token = localStorage.getItem('token');
        if (token) {
            // Decode JWT or fetch user profile from API in real scenario
            // Mocking for now:
            setUser({ role: 'ADMIN', name: 'Admin Demo' });
        }
        setIsLoading(false);
    }, []);

    const login = async (email, password) => {
        // Here we will call the auth API
        // const res = await api.post('/auth/login', { email, password });
        // localStorage.setItem('token', res.data.token);

        // Mock login for UI development
        if (email === 'admin@bourse.com' && password === 'admin') {
            localStorage.setItem('token', 'fake-jwt-token');
            setUser({ role: 'ADMIN', name: 'Admin Demo' });
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
