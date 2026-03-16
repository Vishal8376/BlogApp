import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, deletePost, toggleLike } from '../Services/postService';
import { useAuth } from '../Contexts/AuthContext';
import { Heart, MessageSquare, ArrowLeft, Trash2, Edit2, Calendar } from 'lucide-react';

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await getPostById(id);
        setPost(data);
      } catch (err) {
        console.error("Failed to fetch post", err);
        setError("Failed to load post. It may have been deleted.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{display: 'flex', justifyContent: 'center', padding: '100px'}}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container" style={{padding: '60px 20px', textAlign: 'center'}}>
        <h2 style={{color: 'var(--danger)', marginBottom: '16px'}}>Oops!</h2>
        <p style={{color: 'var(--text-secondary)', marginBottom: '24px'}}>{error || "Post not found."}</p>
        <button className="btn btn-primary" onClick={() => navigate('/home')}>
          Back to Home
        </button>
      </div>
    );
  }

  // Check if current user is the author
  const isAuthor = isAuthenticated && user && (post.user?.id === user.id || post.author === user.name);

  // Compute interaction stats
  const likesCount = post.interactions?.filter(i => i.like).length || 0;
  const isLikedByMe = post.interactions?.some(i => i.like && i.user?.id === user?.id);

  const handleLikeToggle = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      // Optimistically update UI
      let updatedInteractions = [...(post.interactions || [])];
      if (isLikedByMe) {
        updatedInteractions = updatedInteractions.filter(i => !(i.user?.id === user.id && i.like));
      } else {
        updatedInteractions.push({ like: true, user: { id: user.id } });
      }
      setPost({ ...post, interactions: updatedInteractions });

      // Call API
      await toggleLike(post.id, user.id);
    } catch (err) {
      console.error("Failed to toggle like", err);
      // Revert optimism if needed by refetching
      const data = await getPostById(id);
      setPost(data);
    }
  };

  return (
    <div className="container" style={{maxWidth: '800px', paddingTop: '40px'}}>
      <button 
        onClick={() => navigate(-1)} 
        className="btn btn-outline btn-sm"
        style={{marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px'}}
      >
        <ArrowLeft size={16} /> Back
      </button>

      <article className="card" style={{padding: 0, overflow: 'hidden'}}>
        {post.image && (
          <div style={{width: '100%', maxHeight: '400px', overflow: 'hidden'}}>
            <img 
              src={post.image} 
              alt={post.description || 'Post Image'} 
              style={{width: '100%', height: '100%', objectFit: 'cover'}} 
            />
          </div>
        )}
        
        <div style={{padding: '32px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px'}}>
            <div>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
                <div className="nav-avatar" style={{width: '32px', height: '32px', border: '1px solid var(--primary)'}}>
                  <div className="nav-avatar-placeholder" style={{fontSize: '0.9rem'}}>{post.author?.[0] || 'U'}</div>
                </div>
                <div>
                  <div style={{fontWeight: '600', color: 'var(--text-main)'}}>{post.author || 'Unknown User'}</div>
                  <div style={{fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px'}}>
                    <Calendar size={12} /> {post.time || 'Recently'}
                  </div>
                </div>
              </div>
              
              {post.category && (
                <span style={{
                  background: 'var(--primary-light)', 
                  color: 'var(--primary)', 
                  padding: '4px 10px', 
                  borderRadius: '20px', 
                  fontSize: '0.75rem', 
                  fontWeight: '600',
                  display: 'inline-block'
                }}>
                  {post.category}
                </span>
              )}
            </div>

            {isAuthor && (
              <div style={{display: 'flex', gap: '8px'}}>
                <button 
                  onClick={() => navigate(`/edit/${post.id}`)}
                  className="btn btn-outline btn-sm"
                  title="Edit Post"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={async () => {
                     if (window.confirm("Are you sure you want to delete this post?")) {
                       try {
                         await deletePost(post.id);
                         navigate('/profile');
                       } catch (err) {
                         alert("Failed to delete post");
                       }
                     }
                  }}
                  className="btn btn-outline btn-sm"
                  style={{color: 'var(--danger)', borderColor: 'var(--danger-light)'}}
                  title="Delete Post"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>

          <div style={{
            fontSize: '1.1rem', 
            lineHeight: '1.7', 
            color: 'var(--text-main)', 
            marginBottom: '32px',
            whiteSpace: 'pre-wrap'
          }}>
            {post.description}
          </div>

          {post.hashtags && (
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px'}}>
              {post.hashtags.split(',').map((tag, idx) => (
                <span key={idx} style={{color: 'var(--primary)', fontSize: '0.9rem'}}>
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}

          <div style={{
            display: 'flex', 
            gap: '24px', 
            paddingTop: '20px', 
            borderTop: '1px solid var(--border-light)',
            color: 'var(--text-secondary)'
          }}>
            <button 
              onClick={handleLikeToggle}
              style={{
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                background: 'none', 
                border: 'none', 
                color: isLikedByMe ? 'var(--danger)' : 'inherit', 
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Heart size={20} fill={isLikedByMe ? 'var(--danger)' : 'none'} color={isLikedByMe ? 'var(--danger)' : 'currentColor'} /> 
              <span style={{fontWeight: '500'}}>{likesCount} Likes</span>
            </button>
            <button style={{display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer'}}>
              <MessageSquare size={20} /> <span style={{fontWeight: '500'}}>{post.comments?.length || 0} Comments</span>
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
