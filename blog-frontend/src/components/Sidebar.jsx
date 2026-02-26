import { NavLink, useNavigate } from 'react-router-dom';
import { Home, TrendingUp, Bookmark, User, Settings, Tag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CATEGORIES = ['Technology', 'Science', 'Health', 'Business', 'Art', 'Travel', 'Food', 'Sports'];

export default function Sidebar({ onCategorySelect, activeCategory }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="sidebar-left">
      <NavLink to="/" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
        <Home size={18} className="sidebar-link-icon" />
        Home
      </NavLink>
      <NavLink to="/trending" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
        <TrendingUp size={18} className="sidebar-link-icon" />
        Trending
      </NavLink>
      {user && (
        <>
          <NavLink to="/saved" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <Bookmark size={18} className="sidebar-link-icon" />
            Saved
          </NavLink>
          <NavLink to={`/profile/${user.id}`} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <User size={18} className="sidebar-link-icon" />
            Profile
          </NavLink>
        </>
      )}

      <div className="divider" style={{ margin: '0.75rem 0' }} />
      <div className="sidebar-section-title">Topics</div>
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          className={`sidebar-link ${activeCategory === cat ? 'active' : ''}`}
          onClick={() => onCategorySelect(cat === activeCategory ? null : cat)}
        >
          <Tag size={14} className="sidebar-link-icon" />
          {cat}
        </button>
      ))}
    </aside>
  );
}
