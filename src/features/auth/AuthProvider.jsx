import { useState } from 'react';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // In a real app, you would decode the token here
            return { role: 'ADMIN', name: 'Admin Demo' };
        }
        return null;
    });

    const login = async (email, password, role) => {
        // Mock login for UI development
        if (role === 'ADMIN' && email === 'admin@bourse.com' && password === 'admin') {
            localStorage.setItem('token', 'fake-admin-jwt-token');
            setUser({ role: 'ADMIN', name: 'Admin Demo' });
            return true;
        }
        
        // Mock pour authentifier un étudiant très facilement
        if (role === 'STUDENT' && email && password) {
            localStorage.setItem('token', 'fake-student-jwt-token');
            setUser({ role: 'STUDENT', name: 'Étudiant Demo' });
            return true;
        }
        
        return false;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}
