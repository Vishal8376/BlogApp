import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, deletePost, toggleLike, addComment } from '../Services/postService';
import { useAuth } from '../Contexts/AuthContext';
import { Edit2, Image as ImageIcon, Trash2, Calendar, Heart, MessageSquare, ArrowLeft, Send } from 'lucide-react';

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLikedByMe, setIsLikedByMe] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isLiking, setIsLiking] = useState(false);
  
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [isCommenting, setIsCommenting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await getPostById(id);
        setPost(data);
        
        // Calculate likes
        const currentLikesCount = data.interactions?.filter(i => i.isLike).length || 0;
        setLikesCount(currentLikesCount);
        
        // Check if current user liked it
        if (user && data.interactions) {
          const hasLiked = data.interactions.some(i => i.user?.id === user.id && i.isLike);
          setIsLikedByMe(hasLiked);
        }
        
        // Map comments
        if (data.interactions) {
            const postComments = data.interactions
                .filter(i => i.comment != null && i.comment.trim() !== '')
                .map(i => ({
                    id: i.id,
                    user: i.user?.name || 'Anonymous',
                    text: i.comment,
                    createdAt: i.createdAt || new Date().toISOString()
                }));
            setComments(postComments);
        }

      } catch (err) {
        console.error("Failed to fetch post", err);
        setError("Failed to load post. It may have been deleted.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, user]); // Added user to dependency array to re-evaluate likes/comments if user changes

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || isCommenting || !user) return;
    
    setIsCommenting(true);
    const tempId = Date.now();
    const newComment = {
      id: tempId,
      user: user.name,
      text: commentText,
      createdAt: new Date().toISOString()
    };
    
    setComments([...comments, newComment]);
    setCommentText('');
    
    try {
      await addComment(post.id, user.id, newComment.text);
    } catch (err) {
      console.error("Failed to add comment:", err);
      // Revert optimistic update
      setComments(prev => prev.filter(c => c.id !== tempId));
      alert("Failed to submit comment.");
    } finally {
        setIsCommenting(false);
    }
  };

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

  const handleLikeToggle = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (isLiking) return;

    setIsLiking(true);
    try {
      // Optimistically update UI
      setIsLikedByMe(prev => !prev);
      setLikesCount(prev => (isLikedByMe ? prev - 1 : prev + 1));

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
            color: 'var(--text-secondary)',
            marginBottom: '24px'
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
                transition: 'all 0.2s ease',
                padding: '8px 0'
              }}
              disabled={isLiking}
            >
              <Heart size={20} fill={isLikedByMe ? 'var(--danger)' : 'none'} color={isLikedByMe ? 'var(--danger)' : 'currentColor'} /> 
              <span style={{fontWeight: '500'}}>{likesCount}</span>
            </button>
            <div style={{
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                color: 'inherit',
                padding: '8px 0'
            }}>
              <MessageSquare size={20} /> 
              <span style={{fontWeight: '500'}}>{comments.length}</span>
            </div>
          </div>

          <div style={{marginTop: '32px'}}>
            <h3 style={{fontSize: '1.2rem', marginBottom: '20px', color: 'var(--text-main)', borderBottom: '2px solid var(--border-light)', paddingBottom: '10px'}}>
              Comments ({comments.length})
            </h3>
            
            <form onSubmit={handleCommentSubmit} style={{display: 'flex', gap: '12px', marginBottom: '32px'}}>
              <div className="nav-avatar" style={{width: '40px', height: '40px', flexShrink: 0}}>
                <div className="nav-avatar-placeholder">{user?.name?.[0] || 'U'}</div>
              </div>
              <div style={{flexGrow: 1, position: 'relative'}}>
                <input 
                  type="text" 
                  style={{
                    width: '100%', 
                    padding: '12px 48px 12px 16px', 
                    borderRadius: '24px', 
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-main)'
                  }}
                  placeholder="Add a comment..." 
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  disabled={isCommenting}
                />
                <button 
                  type="submit" 
                  disabled={!commentText.trim() || isCommenting}
                  style={{
                    position: 'absolute',
                    right: '6px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: commentText.trim() ? 'var(--primary)' : 'var(--bg-main)',
                    color: commentText.trim() ? 'white' : 'var(--text-muted)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: commentText.trim() ? 'pointer' : 'default',
                    transition: 'all 0.2s'
                  }}
                >
                  <Send size={16} style={{marginLeft: '-2px'}} />
                </button>
              </div>
            </form>

            <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
              {comments.map(c => (
                <div key={c.id} style={{display: 'flex', gap: '16px'}}>
                  <div className="nav-avatar" style={{width: '36px', height: '36px', flexShrink: 0}}>
                    <div className="nav-avatar-placeholder" style={{fontSize: '0.9rem'}}>{c.user?.[0] || 'U'}</div>
                  </div>
                  <div style={{
                    background: 'var(--bg-secondary)', 
                    padding: '16px', 
                    borderRadius: '0 16px 16px 16px',
                    flexGrow: 1
                  }}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center'}}>
                      <span style={{fontWeight: '600', color: 'var(--text-main)'}}>{c.user}</span>
                      <span style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>
                        {new Date(c.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p style={{color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0}}>{c.text}</p>
                  </div>
                </div>
              ))}
              
              {comments.length === 0 && (
                <div style={{textAlign: 'center', padding: '40px', color: 'var(--text-muted)', background: 'var(--bg-secondary)', borderRadius: '12px'}}>
                  <MessageSquare size={32} style={{margin: '0 auto 12px', opacity: 0.5}} />
                  <p>No comments yet. Start the conversation!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
