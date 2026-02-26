import { useState, useEffect } from 'react';
import { Bookmark, Package } from 'lucide-react';
import PostCard from '../components/PostCard';
import PostSkeleton from '../components/PostSkeleton';
import { getSavedPosts } from '../api/blogApi';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function SavedPosts() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.id) { setPosts([]); return; }
    setLoading(true);
    getSavedPosts(user.id)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : [];
        const extracted = data.map(sp => sp.post).filter(Boolean);
        setPosts(extracted);
      })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div className="empty-state">
          <Bookmark size={48} className="empty-state-icon" />
          <div className="empty-state-title">Login required</div>
          <div className="empty-state-desc">Please login to view your saved posts.</div>
          <Link to="/login" className="btn btn-primary" style={{ marginTop: '1rem' }}>Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <Bookmark size={22} color="var(--accent)" />
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Saved Posts</h1>
        {!loading && (
          <span className="badge badge-amber">{posts.length}</span>
        )}
      </div>

      {loading ? (
        <div className="posts-feed">
          {[1,2].map(i => <PostSkeleton key={i} />)}
        </div>
      ) : posts.length === 0 ? (
        <div className="empty-state">
          <Package size={48} className="empty-state-icon" />
          <div className="empty-state-title">No saved posts yet</div>
          <div className="empty-state-desc">Posts you save will appear here.</div>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>Explore Posts</Link>
        </div>
      ) : (
        <div className="posts-feed">
          {posts.map(post => <PostCard key={post.id} post={post} />)}
        </div>
      )}
    </div>
  );
}
