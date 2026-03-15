import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser } from '../Services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        console.log('🔐 Auth Check - User:', storedUser ? 'Found' : 'Not Found');
        console.log('🔐 Auth Check - Token:', token ? 'Found' : 'Not Found');
        
        if (storedUser && token) {
          try {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser && parsedUser.id) {
              setUser(parsedUser);
              console.log('✅ User loaded:', parsedUser.username);
            } else {
              console.warn('⚠️ Invalid user data, clearing storage');
              localStorage.removeItem('user');
              localStorage.removeItem('token');
            }
          } catch (parseError) {
            console.error('❌ Parse error:', parseError);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
          }
        } else {
          console.log('ℹ️ No stored credentials, user will need to login');
        }
      } catch (error) {
        console.error('❌ Auth initialization error:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    initAuth();
  }, []);

  const login = async (username, password) => {
    try {
      console.log('🔑 Attempting login for:', username);
      const data = await loginUser({ emailId: username, password });
      // If backend returns user info, store it. If not, just set a dummy user or handle as needed.
      if (data && data.user) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
      }
      // If backend returns only a message, you may want to fetch user info separately
      console.log('✅ Login response:', data);
      return data;
    } catch (error) {
      console.error('❌ Login error:', error.message);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      console.log('📝 Attempting registration for:', userData.username);
      // TODO: Integrate with backend register API
      // Example: const newUser = await registerUser(userData)
      const newUser = null;
      setUser(newUser);
      console.log('✅ Register successful:', newUser?.username);
      return newUser;
    } catch (error) {
      console.error('❌ Register error:', error.message);
      throw error;
    }
  };

  const logout = () => {
    console.log('🚪 Logging out');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    console.log('🔄 Updating user:', updatedUser.username);
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // Don't render children until auth is initialized
  if (!initialized) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '4px solid rgba(255,255,255,0.3)',
          borderTop: '4px solid white',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <span style={{color: 'white', marginLeft: '16px', fontSize: '1.1rem'}}>Loading blogapp...</span>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      updateUser,
      isAuthenticated: !!user,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};