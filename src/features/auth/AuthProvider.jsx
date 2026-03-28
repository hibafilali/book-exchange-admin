import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Validation simulée du token au montage avec petit effet de délai visuel
        const verifyToken = async () => {
            const token = localStorage.getItem('token');
            const role = localStorage.getItem('user_role');
            
            await new Promise(r => setTimeout(r, 1000)); // Simuler la latence réseau
            
            if (token && role) {
                // Hydrate the user
                setUser({ 
                    name: role === 'ADMIN' ? 'Admin yTera' : 'Étudiant yTera' 
                });
            }
            setLoading(false);
        };
        verifyToken();
    }, []);

    const login = async (email, password, role) => {
        // Simuler latence de login
        await new Promise(r => setTimeout(r, 1200));

        if (role === 'ADMIN' && email === 'admin@ytera.ma' && password === 'admin') {
            localStorage.setItem('token', 'fake-admin-jwt-token');
            localStorage.setItem('user_role', 'ADMIN');
            setUser({ role: 'ADMIN', name: 'Admin yTera' });
            return true;
        }
        
        // Mock pour authentifier un étudiant
        if (role === 'STUDENT' && email && password) {
            localStorage.setItem('token', 'fake-student-jwt-token');
            localStorage.setItem('user_role', 'STUDENT');
            setUser({ role: 'STUDENT', name: 'Étudiant yTera' });
            return true;
        }
        
        return false;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_role');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
