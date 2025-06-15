import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('/api/users/me', {
                    credentials: 'include'
                });
                const data = await response.json();
                if (data.success) {
                    setUser(data.data.user);
                }
            } catch (error) {
                console.error('Auth check failed:', error);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (email, password, rememberMe) => {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, rememberMe })
            });

            const data = await response.json();
            if (data.success) {
                setUser(data.data.user);
            }
            return data;
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Login failed' };
        }
    }

    const logout = async () => {
        await fetch('/api/users/logout', {
            method: 'POST',
            credentials: 'include'
        });
        setUser(null);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);