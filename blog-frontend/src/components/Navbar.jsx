import { useState, useRef, useEffect } from 'react';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { Search, PenSquare, Bookmark, Bell, LogOut, User, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getSuggestions } from '../api/blogApi';

export default function Navbar({ onCreatePost }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggest, setShowSuggest] = useState(false);
  const suggestRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (suggestRef.current && !suggestRef.current.contains(e.target)) {
        setShowSuggest(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleQueryChange = async (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim().length >= 2) {
      try {
        const res = await getSuggestions(val.trim());
        setSuggestions(res.data || []);
        setShowSuggest(true);
      } catch { setSuggestions([]); }
    } else {
      setSuggestions([]); setShowSuggest(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowSuggest(false);
    }
  };

  const handleSuggest = (s) => {
    setQuery(s);
    navigate(`/search?q=${encodeURIComponent(s)}`);
    setShowSuggest(false);
  };

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">InkSpace</Link>

        <div className="navbar-search-wrap" ref={suggestRef}>
          <form onSubmit={handleSearch}>
            <Search size={15} className="navbar-search-icon" />
            <input
              className="navbar-search-input"
              type="text"
              placeholder="Search posts..."
              value={query}
              onChange={handleQueryChange}
              onFocus={() => suggestions.length > 0 && setShowSuggest(true)}
            />
          </form>
          {showSuggest && suggestions.length > 0 && (
            <div className="navbar-suggestions">
              {suggestions.map((s, i) => (
                <div key={i} className="navbar-suggestion-item" onClick={() => handleSuggest(s)}>
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="navbar-actions">
          {user ? (
            <>
              <button className="btn btn-primary btn-sm" onClick={onCreatePost}>
                <PenSquare size={14} /> Write
              </button>
              <Link to="/saved" className="btn-icon" title="Saved Posts">
                <Bookmark size={17} />
              </Link>
              <Link to={`/profile/${user.id}`} className="navbar-user-btn">
                <div className="avatar avatar-sm" style={{ background: 'var(--primary)', color: '#fff' }}>
                  {user.name?.[0]?.toUpperCase() || 'U'}
                </div>
                {user.name?.split(' ')[0]}
              </Link>
              <button className="btn-icon" onClick={handleLogout} title="Logout">
                <LogOut size={17} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
              <Link to="/signup" className="btn btn-primary btn-sm">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
