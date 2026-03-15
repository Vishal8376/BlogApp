import { useEffect, useState } from 'react';

import { useAuth } from '../Contexts/AuthContext';
import PostCard from '../Components/PostCard';
import { TrendingUp, Users, Zap, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalPosts: 0, totalUsers: 0, totalLikes: 0 });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);
        // TODO: Replace with real backend API calls
        setPosts([]); // No backend integration yet
        setStats({ totalPosts: 0, totalUsers: 0, totalLikes: 0 });
      } catch (err) {
        console.error('Error loading home ', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isAuthenticated, navigate]);

  const handleLike = (postId, liked, newLikesCount) => {
    setPosts(posts.map(p => 
      p.id === postId 
        ? { ...p, likedByCurrent: liked, likes: newLikesCount } 
        : p
    ));
  };

  const handleDelete = (deletedId) => {
    setPosts(posts.filter(p => p.id !== deletedId));
  };

  if (!isAuthenticated) return null;

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <span>Loading Feed...</span>
      </div>
    );
  }

  return (
    <div className="home-layout">
      <div>
        <div className="home-welcome">
          <h1>Welcome to blogapp</h1>
          <p>Discover amazing stories from our creative community</p>
        </div>

        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div 
              key={post.id}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <PostCard 
                post={post} 
                onLike={handleLike} 
                onCommentAdded={() => {}}
                onDelete={handleDelete}
              />
            </div>
          ))
        ) : (
          <div className="card text-center" style={{padding: '80px 20px'}}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'var(--gradient-subtle)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: '2.5rem'
            }}>📝</div>
            <h3 style={{marginBottom: '12px', fontSize: '1.5rem'}}>No Posts Yet</h3>
            <p style={{color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px'}}>
              Be the first to share your story with the community!
            </p>
            <button onClick={() => navigate('/create')} className="btn btn-primary btn-lg">
              Create Your First Post
            </button>
          </div>
        )}
      </div>

      {/* Sidebar - Updated */}
      <div className="sidebar">
        <div className="sidebar-card">
          <h3 className="sidebar-title">
            <TrendingUp size={16} />
            Trending Tags
          </h3>
          <div className="flex" style={{flexWrap: 'wrap'}}>
            {['#Tech', '#Design', '#News', '#React', '#JavaScript', '#AI'].map(tag => (
              <span key={tag} className="trend-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}