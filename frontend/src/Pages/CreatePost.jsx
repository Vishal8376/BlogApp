import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '../Contexts/AuthContext';
import { createPost, updatePost, getPostById } from '../Services/postService';
import { Image as ImageIcon, X } from 'lucide-react';

export default function CreatePost() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { postId } = useParams();
  const isEditing = !!postId;

  const [formData, setFormData] = useState({
    title: '', content: '', category: 'Tech', image: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      const fetchPost = async () => {
        try {
          const post = await getPostById(postId);
          setFormData({
            title: post.title || '',
            content: post.description || '',
            category: post.category || 'Tech',
            image: post.image || ''
          });
          if (post.image) {
            setImagePreview(post.image);
          }
        } catch (err) {
          setError("Failed to fetch post for editing.");
        }
      };
      fetchPost();
    }
  }, [isEditing, postId]);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({...formData, image: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const postData = {
        description: formData.content,
        category: formData.category,
        image: formData.image || null,
        hashtags: ''
      };
      
      if (isEditing) {
        await updatePost(postId, postData);
      } else {
        await createPost(postData);
      }
      
      navigate('/home');
    } catch (err) {
      console.error('Error saving post:', err);
      setError(err.response?.data?.message || err.response?.data || err.message || 'Failed to save post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    setFormData({...formData, image: ''});
  };

  return (
    <div className="create-post-container">
      <div className="create-post-card">
        <h1 className="create-post-title">{isEditing ? 'Edit Post' : 'Create New Post'}</h1>
        {error && (
          <div style={{background: 'rgba(239,68,68,0.15)', color: '#ef4444', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.9rem'}}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input 
              type="text" 
              placeholder="Post Title" 
              className="input"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>
          
          <div className="input-wrapper">
            <select 
              className="input"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
              style={{cursor: 'pointer'}}
            >
              <option>Tech</option>
              <option>Design</option>
              <option>News</option>
              <option>Lifestyle</option>
              <option>Other</option>
            </select>
          </div>
          
          <div style={{marginBottom: '24px'}}>
            <label className="file-upload">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload}
                style={{display: 'none'}}
              />
              <div className="file-upload-content">
                <ImageIcon size={40} style={{color: 'var(--primary)', marginBottom: '12px'}} />
                <div className="file-upload-text">
                  <span style={{fontWeight: '600', color: 'var(--text-main)'}}>Click or drag image here</span>
                  <span style={{fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px'}}>
                    PNG, JPG, GIF up to 5MB
                  </span>
                </div>
              </div>
            </label>
            
            {imagePreview && (
              <div style={{position: 'relative', marginTop: '16px'}}>
                <img src={imagePreview} alt="Preview" className="file-preview" />
                <button 
                  type="button"
                  onClick={clearImage}
                  className="clear-image-btn"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
          
          <div className="input-wrapper">
            <textarea 
              placeholder="Write your story..." 
              className="input"
              value={formData.content}
              onChange={e => setFormData({...formData, content: e.target.value})}
              required
              rows="8"
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-full btn-lg" disabled={loading}>
            {loading ? (isEditing ? 'Updating...' : 'Publishing...') : (isEditing ? 'Update Post' : 'Publish Post')}
          </button>
        </form>
      </div>
    </div>
  );
}