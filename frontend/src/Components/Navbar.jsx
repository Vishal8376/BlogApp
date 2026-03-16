import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import { useTheme } from '../Contexts/ThemeContext';
import { Search, PenSquare, LogOut, Home, Sun, Moon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import api from '../Services/api';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [userResults, setUserResults] = useState([]);
  const [postResults, setPostResults] = useState([]);
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
    const searchAll = async () => {
      if (searchQuery.trim()) {
        try {
          // Fetch users and posts concurrently
          const [usersRes, postsRes] = await Promise.all([
            api.get(`/user/search?q=${searchQuery}`),
            api.get(`/search?q=${searchQuery}`)
          ]);
          setUserResults(usersRes.data || []);
          setPostResults(postsRes.data || []);
          setShowDropdown(true);
        } catch (err) {
          console.error("Search error:", err);
          setUserResults([]);
          setPostResults([]);
        }
      } else {
        setUserResults([]);
        setPostResults([]);
        setShowDropdown(false);
      }
    };

    // basic debounce
    const timeoutId = setTimeout(() => {
        searchAll();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleUserSelect = (selectedUser) => {
    const slug = `${selectedUser.id}-${selectedUser.name.replace(/\s+/g, '-')}`;
    navigate(`/profile/${slug}`);
    setShowDropdown(false);
    setSearchQuery('');
  };

  const handlePostSelect = (selectedPost) => {
    navigate(`/post/${selectedPost.id}`);
    setShowDropdown(false);
    setSearchQuery('');
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to={isAuthenticated ? "/home" : "/login"} className="logo">BlogIt</Link>
        
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
            
            {showDropdown && (userResults.length > 0 || postResults.length > 0) && (
              <div className="search-dropdown">
                {userResults.length > 0 && (
                  <>
                    <div style={{padding: '8px 16px', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--text-muted)'}}>Users</div>
                    {userResults.map(u => (
                      <div 
                        key={`user-${u.id}`} 
                        className="search-result-item"
                        onClick={() => handleUserSelect(u)}
                      >
                        <div className="search-result-avatar">
                          {u.profilePicUrl ? (
                            <img src={u.profilePicUrl} alt={u.name} style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
                          ) : (
                            <div className="search-result-avatar-placeholder">
                              {u.name?.[0] || u.emailId?.[0] || '?'}
                            </div>
                          )}
                        </div>
                        <div className="search-result-info">
                          <div className="search-result-name">{u.name}</div>
                          <div className="search-result-username">{u.emailId}</div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
                
                {postResults.length > 0 && (
                  <>
                    <div style={{padding: '8px 16px', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--text-muted)', borderTop: userResults.length > 0 ? '1px solid var(--border-color)' : 'none'}}>Posts</div>
                    {postResults.map(p => (
                      <div 
                        key={`post-${p.id}`} 
                        className="search-result-item"
                        onClick={() => handlePostSelect(p)}
                      >
                        <div className="search-result-info" style={{paddingLeft: '8px'}}>
                           <div className="search-result-name" style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '250px'}}>{p.description || 'Untitled Post'}</div>
                           <div className="search-result-username" style={{fontSize: '0.8rem'}}>By {p.author}</div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
            
            {showDropdown && searchQuery && userResults.length === 0 && postResults.length === 0 && (
              <div className="search-dropdown">
                <div style={{padding: '20px', textAlign: 'center', color: 'var(--text-muted)'}}>
                  No results found
                </div>
              </div>
            )}
          </div>
        )}

        <div className="nav-links">
          <button 
            onClick={toggleTheme} 
            className="nav-btn"
            title={isDarkMode ? "Light Mode" : "Dark Mode"}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
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
                {user?.profilePicUrl ? (
                  <img src={user.profilePicUrl} alt={user.name} />
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
