import { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import NetworkAnimation from '../Components/NetworkAnimation';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    phone: '',
    dob: ''
  });
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(formData);
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Registration failed');
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
          <h1 className="animate-fadeIn">Create Account</h1>
          <p className="animate-fadeIn" style={{animationDelay: '0.2s'}}>Start Your Journey Today</p>
          
          {/* Blog App Logo */}
          <div className="auth-logo-container">
            <div className="auth-logo">
              <span style={{fontSize: '4rem'}}>📝</span>
            </div>
            <p style={{marginTop: '16px', fontSize: '1.5rem', fontWeight: '700', color: 'white', letterSpacing: '-0.5px'}}>blogapp</p>
          </div>
          
          <div style={{marginTop: '40px', opacity: 0.9}}>
            <p style={{fontSize: '0.95rem'}}>Free to join • No credit card required</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="auth-right">
        <div className="auth-box">
          <h2>Get Started</h2>
          <p>Create your account to start sharing</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <input 
                type="text" 
                placeholder="Full Name" 
                className="input"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                disabled={loading}
                required
              />
            </div>
            <div className="input-wrapper">
              <input 
                type="text" 
                placeholder="Username" 
                className="input"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                disabled={loading}
                required
              />
            </div>
            <div className="input-wrapper">
              <input 
                type="email" 
                placeholder="Email ID" 
                className="input"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                disabled={loading}
                required
              />
            </div>
            <div className="input-wrapper">
              <input 
                type="tel" 
                placeholder="Phone Number" 
                className="input"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                disabled={loading}
                required
              />
            </div>
            <div className="input-wrapper">
              <input 
                type="date" 
                placeholder="Date of Birth" 
                className="input"
                value={formData.dob}
                onChange={(e) => setFormData({...formData, dob: e.target.value})}
                disabled={loading}
                required
                style={{colorScheme: 'light'}}
              />
            </div>
            <div className="input-wrapper">
              <input 
                type="password" 
                placeholder="Password" 
                className="input"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                disabled={loading}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          
          <p className="auth-switch-text">
            Already have an account?{' '}
            <Link to="/login" className="auth-switch-link">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}