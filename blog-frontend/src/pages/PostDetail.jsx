import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Heart, MessageCircle, Bookmark, ArrowLeft, Clock,
  Send, Trash2, Share2, Image
} from 'lucide-react';
import { getAllPosts, toggleLike, addComment, savePost, deletePost } from '../api/blogApi';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function timeAgo(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date)) return '';
  const diff = Math.floor((Date.now() - date) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function PostDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchPost = async () => {
    try {
      const res = await getAllPosts();
      const found = (res.data || []).find(p => String(p.id) === String(id));
      setPost(found || null);
    } catch {
      setPost(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPost(); }, [id]);

  const handleLike = async () => {
    if (!user) { toast.error('Login to like'); return; }
    try {
      await toggleLike(post.id, user.id);
      toast.success('Like updated!');
      fetchPost();
    } catch { toast.error('Failed'); }
  };

  const handleSave = async () => {
    if (!user) { toast.error('Login to save'); return; }
    try {
      await savePost(user.id, post.id);
      toast.success('Post saved!');
    } catch { toast.error('Failed to save'); }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!user) { toast.error('Login to comment'); return; }
    if (!comment.trim()) return;
    setSubmitting(true);
    try {
      await addComment(post.id, user.id, comment.trim());
      setComment('');
      toast.success('Comment added!');
      fetchPost();
    } catch { toast.error('Failed to comment'); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await deletePost(post.id);
      toast.success('Post deleted');
      navigate('/');
    } catch { toast.error('Failed to delete'); }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied!');
  };

  if (loading) {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div className="skeleton" style={{ width: '100%', height: 400, borderRadius: 14, marginBottom: '2rem' }} />
        <div className="skeleton" style={{ width: '70%', height: 36, marginBottom: '1rem' }} />
        <div className="skeleton" style={{ width: '100%', height: 20, marginBottom: '0.5rem' }} />
        <div className="skeleton" style={{ width: '90%', height: 20 }} />
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1.5rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text2)' }}>Post not found.</p>
        <button className="btn btn-ghost" style={{ marginTop: '1rem' }} onClick={() => navigate('/')}>
          Go Home
        </button>
      </div>
    );
  }

  const likes = (post.interactions || []).filter(i => i.isLike || i.like);
  const comments = (post.interactions || []).filter(i => i.comment);
  const hashtags = post.hashtags ? post.hashtags.split(/[\s,]+/).filter(Boolean) : [];

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Back */}
      <button
        className="btn btn-ghost btn-sm"
        style={{ marginBottom: '1.5rem' }}
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={15} /> Back
      </button>

      {/* Hero Image */}
      {post.image ? (
        <div className="post-detail-hero">
          <img src={post.image} alt={post.category} onError={e => e.target.parentElement.style.display='none'} />
        </div>
      ) : (
        <div className="card" style={{ height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
          <Image size={60} color="var(--text3)" />
        </div>
      )}

      {/* Meta */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <span className="badge badge-purple">{post.category}</span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Clock size={12} /> {timeAgo(post.time)}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
          <div className="avatar avatar-sm" style={{ background: 'var(--primary)', color: '#fff' }}>
            {post.author?.[0]?.toUpperCase() || 'U'}
          </div>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text2)' }}>{post.author}</span>
        </div>
      </div>

      {/* Content */}
      <p className="post-detail-body">{post.description}</p>

      {/* Hashtags */}
      {hashtags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.5rem' }}>
          {hashtags.map((tag, i) => (
            <span key={i} className="tag">#{tag.replace(/^#/, '')}</span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '1rem',
        marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)',
      }}>
        <button className="btn btn-ghost btn-sm" onClick={handleLike}>
          <Heart size={15} /> {likes.length} Like{likes.length !== 1 ? 's' : ''}
        </button>
        <button className="btn btn-ghost btn-sm" onClick={handleSave}>
          <Bookmark size={15} /> Save
        </button>
        <button className="btn btn-ghost btn-sm" onClick={handleShare}>
          <Share2 size={15} /> Share
        </button>
        {user && (
          <button className="btn btn-danger btn-sm" style={{ marginLeft: 'auto' }} onClick={handleDelete}>
            <Trash2 size={15} /> Delete
          </button>
        )}
      </div>

      {/* Comments */}
      <div className="comments-section">
        <h3 className="comments-title">
          <MessageCircle size={16} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
          {comments.length} Comment{comments.length !== 1 ? 's' : ''}
        </h3>

        {comments.map((c, i) => (
          <div key={i} className="comment-item">
            <div className="avatar avatar-sm" style={{ background: 'var(--bg3)', color: 'var(--text2)', flexShrink: 0 }}>
              U
            </div>
            <div className="comment-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className="comment-author">User</span>
                <span className="comment-time">{timeAgo(c.time)}</span>
              </div>
              <p className="comment-text">{c.comment}</p>
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <p style={{ color: 'var(--text3)', fontSize: '0.875rem', padding: '1rem 0' }}>
            No comments yet. Be the first!
          </p>
        )}

        {/* Add Comment */}
        <form className="comment-input-row" onSubmit={handleComment} style={{ marginTop: '1.5rem' }}>
          <input
            className="form-input"
            style={{ flex: 1 }}
            type="text"
            placeholder={user ? 'Add a comment…' : 'Login to comment…'}
            value={comment}
            onChange={e => setComment(e.target.value)}
            disabled={!user}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!user || !comment.trim() || submitting}
          >
            <Send size={15} /> {submitting ? '…' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}
