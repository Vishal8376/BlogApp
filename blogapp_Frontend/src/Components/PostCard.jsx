import { Heart, MessageSquare, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { mockApi } from '../Services/api';
import { useAuth } from '../Contexts/AuthContext';

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
    
    const result = await mockApi.toggleLike(post.id);
    onLike(post.id, result.liked, result.likes);
    
    setTimeout(() => setIsLiking(false), 300);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    // Optimistic update - add comment immediately
    const newComment = {
      id: Date.now(),
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
    await mockApi.addComment(post.id, commentText);
    
    // Notify parent to refresh
    if (onCommentAdded) onCommentAdded();
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await mockApi.deletePost(post.id);
      if (onDelete) onDelete(post.id);
    }
  };

  return (
    <div className="feed-post">
      {post.image && (
        <img src={post.image} alt={post.title} className="feed-post-image" />
      )}
      
      <div className="feed-post-header">
        <div className="feed-post-avatar">
          {post.author?.[0]}
        </div>
        <span className="feed-post-author">{post.author}</span>
        <span className="feed-post-meta">
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>
      
      <div className="feed-post-content">
        {post.category && (
          <span className="feed-post-category">{post.category}</span>
        )}
        <h3 className="feed-post-title">{post.title}</h3>
        <p className="feed-post-text">{post.content}</p>
      </div>
      
      <div className="feed-post-actions">
        <button 
          onClick={handleLike} 
          className={`feed-action-btn ${post.likedByCurrent ? 'liked' : ''}`}
          disabled={isLiking}
        >
          <Heart size={22} fill={post.likedByCurrent ? 'currentColor' : 'none'} />
        </button>
        <button onClick={() => setShowComments(!showComments)} className="feed-action-btn">
          <MessageSquare size={22} />
        </button>
        {isOwner && (
          <button onClick={handleDelete} className="feed-action-btn" style={{marginLeft: 'auto', color: 'var(--danger)'}}>
            <Trash2 size={22} />
          </button>
        )}
      </div>
      
      <div className="feed-post-likes">
        {post.likes} likes
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