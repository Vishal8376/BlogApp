import { useState } from 'react';
import { X, Image, Hash, Tag } from 'lucide-react';
import { createPost } from '../api/blogApi';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const CATEGORIES = ['Technology', 'Science', 'Health', 'Business', 'Art', 'Travel', 'Food', 'Sports', 'Other'];

export default function CreatePostModal({ onClose, onCreated }) {
  const { user } = useAuth();
  const [form, setForm] = useState({
    category: '',
    description: '',
    image: '',
    hashtags: '',
    author: user?.name || '',
  });
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category || !form.description.trim()) {
      toast.error('Category and description are required'); return;
    }
    setLoading(true);
    try {
      await createPost(form);
      toast.success('Post published!');
      onCreated?.();
      onClose();
    } catch (err) {
      toast.error(err.response?.data || 'Failed to create post');
    } finally { setLoading(false); }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Create New Post</h2>
          <button className="btn-icon" onClick={onClose}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Category *</label>
            <select
              className="form-input"
              value={form.category}
              onChange={e => set('category', e.target.value)}
              required
            >
              <option value="">Select a category…</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Content *</label>
            <textarea
              className="form-input"
              style={{ minHeight: 160 }}
              placeholder="Share your thoughts, ideas, or story…"
              value={form.description}
              onChange={e => set('description', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Image size={14} /> Cover Image URL
            </label>
            <input
              className="form-input"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={form.image}
              onChange={e => set('image', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Hash size={14} /> Hashtags
            </label>
            <input
              className="form-input"
              type="text"
              placeholder="tech react programming (space separated)"
              value={form.hashtags}
              onChange={e => set('hashtags', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Author Name</label>
            <input
              className="form-input"
              type="text"
              value={form.author}
              onChange={e => set('author', e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button type="button" className="btn btn-ghost w-full" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? 'Publishing…' : 'Publish Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
