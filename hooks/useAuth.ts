import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { User } from '@/types';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const logoutLocal = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_role');
    }
    setUser(null);
  };

  const fetchCurrentUser = async () => {
    if (typeof window === 'undefined') return;
    
    const token = localStorage.getItem('auth_token');
    const role = localStorage.getItem('auth_role');
    
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const endpoint = role === 'admin' ? '/admin/me' : '/profile';
      const response = await api.get(endpoint);
      
      const userData = response.data.data;
      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: (role as 'admin' | 'customer') || userData.role || 'customer',
      });
    } catch (err: any) {
      logoutLocal();
      setError(err.message || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const login = async (email: string, password: string, isAdmin: boolean = false) => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = isAdmin ? '/admin/login' : '/login';
      const response = await api.post(endpoint, { email, password });
      const { token, user: customerData, admin: adminData } = response.data.data;
      const userData = isAdmin ? adminData : customerData;
      
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_role', isAdmin ? 'admin' : 'customer');
      
      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: isAdmin ? 'admin' : 'customer',
      });
      
      return { success: true, role: isAdmin ? 'admin' : 'customer' };
    } catch (err: any) {
      const msg = err.message || 'Login failed';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/register', {
        name,
        email,
        password,
        password_confirmation: password,
      });
      
      const { token, user: userData } = response.data.data;
      
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_role', 'customer');
      
      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: 'customer',
      });
      
      return { success: true };
    } catch (err: any) {
      const msg = err.message || 'Registration failed';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };


  const logout = async () => {
    setLoading(true);
    try {
      const role = localStorage.getItem('auth_role');
      const endpoint = role === 'admin' ? '/admin/logout' : '/logout';
      await api.post(endpoint);
    } catch (err) {
      // Ignore network errors on logout, proceed to local cleanup
    } finally {
      logoutLocal();
      setLoading(false);
      router.push('/');
    }
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    checkAuth: fetchCurrentUser,
  };
}
