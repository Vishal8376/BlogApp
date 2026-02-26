import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Bookmark, Share2, Clock, User, Image } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toggleLike, savePost } from '../api/blogApi';
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

function getLikeCount(post) {
  if (!post.interactions) return 0;
  return post.interactions.filter(i => i.isLike || i.like).length;
}
function getCommentCount(post) {
  if (!post.interactions) return 0;
  return post.interactions.filter(i => i.comment).length;
}

export default function PostCard({ post, onLiked }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [liking, setLiking] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleLike = async (e) => {
    e.stopPropagation();
    if (!user) { toast.error('Login to like posts'); return; }
    setLiking(true);
    try {
      await toggleLike(post.id, user.id);
      toast.success('Like updated!');
      onLiked?.();
    } catch { toast.error('Failed to like'); }
    finally { setLiking(false); }
  };

  const handleSave = async (e) => {
    e.stopPropagation();
    if (!user) { toast.error('Login to save posts'); return; }
    setSaving(true);
    try {
      await savePost(user.id, post.id);
      toast.success('Post saved!');
    } catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  const hashtags = post.hashtags
    ? post.hashtags.split(/[\s,]+/).filter(Boolean)
    : [];

  return (
    <article className="post-card" onClick={() => navigate(`/post/${post.id}`)}>
      {post.image ? (
        <img src={post.image} alt={post.category} className="post-card-image" onError={e => e.target.style.display='none'} />
      ) : (
        <div className="post-card-image-placeholder">
          <Image size={40} color="var(--text3)" />
        </div>
      )}

      <div className="post-card-body">
        <div className="post-card-meta">
          <span className="badge badge-purple">{post.category}</span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Clock size={12} /> {timeAgo(post.time)}
          </span>
        </div>

        <h2 className="post-card-title">{post.description?.substring(0, 80) || 'Untitled Post'}</h2>
        <p className="post-card-desc">{post.description}</p>

        {hashtags.length > 0 && (
          <div className="post-card-hashtags">
            {hashtags.slice(0, 4).map((tag, i) => (
              <span key={i} className="tag">#{tag.replace(/^#/, '')}</span>
            ))}
          </div>
        )}

        <div className="post-card-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
            <div className="avatar avatar-sm" style={{ background: 'var(--primary)', color: '#fff', flexShrink: 0 }}>
              {post.author?.[0]?.toUpperCase() || 'U'}
            </div>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text2)' }}>
              {post.author || 'Anonymous'}
            </span>
          </div>

          <button className="post-card-action" onClick={handleLike} disabled={liking}>
            <Heart size={14} /> {getLikeCount(post)}
          </button>
          <button className="post-card-action" onClick={e => { e.stopPropagation(); navigate(`/post/${post.id}`); }}>
            <MessageCircle size={14} /> {getCommentCount(post)}
          </button>
          <button className="post-card-action" onClick={handleSave} disabled={saving}>
            <Bookmark size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}
