import { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import NetworkAnimation from '../Components/NetworkAnimation';
// import { loginUser } from "../Services/authService";

export default function Login() {
  const [creds, setCreds] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  // handleLogin removed: login is handled via context's login function

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(creds.email, creds.password);
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Left Side - Network Animation */}
      <div className="auth-left">
        <NetworkAnimation />
        <div className="auth-animation-content">
          <h1 className="animate-fadeIn">Welcome to BlogIt</h1>
          <p className="animate-fadeIn" style={{animationDelay: '0.2s'}}>Connect, Share, Inspire</p>
          
          {/* Blog App Logo */}
          <div className="auth-logo-container">
            <div className="auth-logo">
              <span style={{fontSize: '4rem'}}>📝</span>
            </div>
            <p style={{marginTop: '16px', fontSize: '1.5rem', fontWeight: '700', color: 'white', letterSpacing: '-0.5px'}}>BlogIt</p>
          </div>
          
          <div style={{marginTop: '40px', opacity: 0.9}}>
            <p style={{fontSize: '0.95rem'}}>Join thousands of writers sharing their stories</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="auth-right">
        <div className="auth-box">
          <h2>Sign In</h2>
          <p>Enter your credentials to access your account</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <input 
                type="text" 
                placeholder="Email" 
                className="input"
                value={creds.email}
                onChange={(e) => setCreds({...creds, email: e.target.value})}
                disabled={loading}
              />
            </div>
            <div className="input-wrapper">
              <input 
                type="password" 
                placeholder="Password" 
                className="input"
                value={creds.password}
                onChange={(e) => setCreds({...creds, password: e.target.value})}
                disabled={loading}
              />
            </div>
            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <p className="auth-switch-text">
            Don't have an account?{' '}
            <Link to="/register" className="auth-switch-link">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}