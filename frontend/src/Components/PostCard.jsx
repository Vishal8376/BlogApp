import { Heart, MessageSquare, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { useAuth } from '../Contexts/AuthContext';
import { addComment } from '../Services/postService';

export default function PostCard({ post, onLike, onCommentAdded, onDelete }) {
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const { user } = useAuth();
  const isOwner = user?.id === post.authorId;

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    
    onLike(post.id, post.likedByCurrent, post.likes || 0);
    setTimeout(() => setIsLiking(false), 300);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    // Optimistic update - add comment immediately
    const tempId = Date.now();
    const newComment = {
      id: tempId,
      user: user?.name || 'Anonymous',
      text: commentText,
      authorId: user?.id,
      createdAt: new Date().toISOString()
    };
    
    // Update local state immediately
    setComments([...comments, newComment]);
    setCommentText('');
    setShowComments(true);
    
    // Sync with backend
    try {
      await addComment(post.id, user.id, newComment.text);
      if (onCommentAdded) onCommentAdded();
    } catch (err) {
      console.error("Failed to add comment to backend:", err);
      // Revert optimistic update on failure
      setComments(prev => prev.filter(c => c.id !== tempId));
      alert("Failed to submit comment. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      // TODO: Integrate with backend delete API
      // Example: await deletePost(post.id)
      if (onDelete) onDelete(post.id);
    }
  };

  return (
    <div className="feed-post">
      {post.image && (
        <img src={post.image} alt={post.title || post.category} className="feed-post-image" />
      )}
      
      <div className="feed-post-header">
        <div className="feed-post-avatar">
          {post.author?.[0]}
        </div>
        <span className="feed-post-author">{post.author}</span>
        <span className="feed-post-meta">
          {(post.createdAt || post.time) ? new Date(post.createdAt || post.time).toLocaleDateString() : ''}
        </span>
      </div>
      
      <div className="feed-post-content">
        {post.category && (
          <span className="feed-post-category">{post.category}</span>
        )}
        {post.title && <h3 className="feed-post-title">{post.title}</h3>}
        <p className="feed-post-text">{post.content || post.description}</p>
      </div>
      
      <div className="feed-post-actions">
        <button 
          onClick={handleLike} 
          className={`feed-action-btn ${post.likedByCurrent ? 'liked' : ''}`}
          disabled={isLiking}
          style={{display: 'flex', alignItems: 'center', gap: '6px'}}
        >
          <Heart size={22} fill={post.likedByCurrent ? 'currentColor' : 'none'} />
          <span style={{fontSize: '0.9rem', fontWeight: '500'}}>{post.likes || 0}</span>
        </button>
        <button 
          onClick={() => setShowComments(!showComments)} 
          className="feed-action-btn"
          style={{display: 'flex', alignItems: 'center', gap: '6px'}}
        >
          <MessageSquare size={22} />
          <span style={{fontSize: '0.9rem', fontWeight: '500'}}>{comments.length}</span>
        </button>
        {isOwner && (
          <button onClick={handleDelete} className="feed-action-btn" style={{marginLeft: 'auto', color: 'var(--danger)'}}>
            <Trash2 size={22} />
          </button>
        )}
      </div>
      
      {showComments && (
        <div className="feed-post-comments">
          {comments && comments.length > 0 ? (
            comments.map((c) => (
              <div key={c.id} className="feed-comment">
                <span className="feed-comment-user">{c.user}</span>
                <span className="feed-comment-text">{c.text}</span>
                {c.createdAt && (
                  <span className="feed-comment-time">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            ))
          ) : (
            <div style={{color: 'var(--text-muted)', fontStyle: 'italic'}}>
              No comments yet. Be the first to comment!
            </div>
          )}
        </div>
      )}
      
      {showComments && (
        <div className="comment-section">
          <form onSubmit={handleCommentSubmit} className="comment-input-area">
            <input 
              type="text" 
              className="comment-input" 
              placeholder="Add a comment..." 
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button 
              type="submit" 
              className="btn btn-primary btn-sm"
              disabled={!commentText.trim()}
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
}