import { useEffect, useState } from 'react';

import { useAuth } from '../Contexts/AuthContext';
import PostCard from '../Components/PostCard';
import { getAllPosts, deletePost as deletePostApi, toggleLike } from '../Services/postService';
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
        const data = await getAllPosts();
        // Map backend entity fields to frontend PostCard fields
        const mappedPosts = (data || []).map(p => ({
          id: p.id,
          title: p.category || 'Untitled',
          content: p.description,
          description: p.description,
          image: p.image,
          author: p.author,
          category: p.category,
          createdAt: p.time,
          likes: p.interactions ? p.interactions.filter(i => i.like).length : 0,
          comments: p.interactions ? p.interactions.filter(i => i.comment).map(c => ({
            id: c.id,
            user: c.user?.name || 'Anonymous',
            text: c.comment,
            createdAt: c.time
          })) : [],
          likedByCurrent: p.interactions ? p.interactions.some(i => i.like && i.user?.id === user?.id) : false,
          authorId: p.user?.id,
          hashtags: p.hashtags
        }));
        setPosts(mappedPosts);
        setStats({ totalPosts: mappedPosts.length, totalUsers: 0, totalLikes: 0 });
      } catch (err) {
        console.error('Error loading home ', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isAuthenticated, navigate]);

  const handleLike = async (postId, currentlyLiked, currentLikesCount) => {
    // 1. Optimistic update
    const newLikedState = !currentlyLiked;
    const newLikesCount = newLikedState ? currentLikesCount + 1 : currentLikesCount - 1;
    
    setPosts(posts.map(p => 
      p.id === postId 
        ? { ...p, likedByCurrent: newLikedState, likes: Math.max(0, newLikesCount) } 
        : p
    ));

    // 2. Call backend API
    try {
      await toggleLike(postId, user.id);
    } catch (err) {
      console.error('Failed to toggle like:', err);
      // Revert optimism if failed
      setPosts(posts.map(p => 
        p.id === postId 
          ? { ...p, likedByCurrent: currentlyLiked, likes: currentLikesCount } 
          : p
      ));
    }
  };

  const handleDelete = async (deletedId) => {
    try {
      await deletePostApi(deletedId);
      setPosts(posts.filter(p => p.id !== deletedId));
    } catch (err) {
      console.error('Error deleting post:', err);
    }
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
    </div>
  );
}