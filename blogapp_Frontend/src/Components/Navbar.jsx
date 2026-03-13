import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import { Search, PenSquare, LogOut, User, Home } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { mockApi } from '../Services/api';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      mockApi.searchUsers(searchQuery).then(setSearchResults);
      setShowDropdown(true);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [searchQuery]);

  const handleUserSelect = (selectedUser) => {
    navigate(`/profile/${selectedUser.username}`);
    setShowDropdown(false);
    setSearchQuery('');
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to={isAuthenticated ? "/home" : "/login"} className="logo">blogapp</Link>
        
        {isAuthenticated && (
          <div className="nav-search" ref={dropdownRef}>
            <Search size={18} className="nav-search-icon" />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery && setShowDropdown(true)}
            />
            
            {showDropdown && searchResults.length > 0 && (
              <div className="search-dropdown">
                {searchResults.map(u => (
                  <div 
                    key={u.id} 
                    className="search-result-item"
                    onClick={() => handleUserSelect(u)}
                  >
                    <div className="search-result-avatar">
                      {u.profileImage ? (
                        <img src={u.profileImage} alt={u.name} style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
                      ) : (
                        <div className="search-result-avatar-placeholder">
                          {u.name?.[0] || u.username?.[0] || '?'}
                        </div>
                      )}
                    </div>
                    <div className="search-result-info">
                      <div className="search-result-username">@{u.username}</div>
                      <div className="search-result-name">{u.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {showDropdown && searchQuery && searchResults.length === 0 && (
              <div className="search-dropdown">
                <div style={{padding: '20px', textAlign: 'center', color: 'var(--text-muted)'}}>
                  No users found
                </div>
              </div>
            )}
          </div>
        )}

        <div className="nav-links">
          {isAuthenticated ? (
            <>
              <button 
                onClick={() => navigate('/home')} 
                className="nav-btn"
                title="Home"
              >
                <Home size={20} />
              </button>
              <button 
                onClick={() => navigate('/create')} 
                className="nav-btn"
                title="Create Post"
              >
                <PenSquare size={20} />
              </button>
              <button 
                onClick={() => navigate('/profile')} 
                className="nav-btn"
                title="Profile"
              >
                <User size={20} />
              </button>
              <button 
                onClick={logout} 
                className="nav-btn"
                title="Logout"
                style={{color: 'var(--danger)'}}
              >
                <LogOut size={20} />
              </button>
              <div 
                className="nav-avatar"
                onClick={() => navigate('/profile')}
              >
                {user?.profileImage ? (
                  <img src={user.profileImage} alt={user.name} />
                ) : (
                  <div className="nav-avatar-placeholder">
                    {user?.name?.[0] || user?.username?.[0] || '?'}
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}