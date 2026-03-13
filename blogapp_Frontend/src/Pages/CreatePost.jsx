import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockApi } from '../Services/api';
import { useAuth } from '../Contexts/AuthContext';
import { Image as ImageIcon, X, Link as LinkIcon } from 'lucide-react';

export default function CreatePost() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '', content: '', category: 'Tech', image: '', imageUrl: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageType, setImageType] = useState('url');
  const [loading, setLoading] = useState(false);

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

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData({...formData, imageUrl: url});
    if (url) {
      setImagePreview(url);
      setFormData({...formData, image: url});
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await mockApi.createPost(formData);
    setLoading(false);
    navigate('/home');
  };

  const clearImage = () => {
    setImagePreview(null);
    setFormData({...formData, image: '', imageUrl: ''});
  };

  return (
    <div className="create-post-container">
      <div className="create-post-card">
        <h1 className="create-post-title">Create New Post</h1>
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
            <div className="image-type-toggle">
              <button 
                type="button"
                className={`image-type-btn ${imageType === 'url' ? 'active' : ''}`}
                onClick={() => setImageType('url')}
              >
                <LinkIcon size={16} style={{display: 'inline', marginRight: '6px'}} />
                Use URL
              </button>
              <button 
                type="button"
                className={`image-type-btn ${imageType === 'file' ? 'active' : ''}`}
                onClick={() => setImageType('file')}
              >
                <ImageIcon size={16} style={{display: 'inline', marginRight: '6px'}} />
                Upload File
              </button>
            </div>
            
            {imageType === 'url' ? (
              <div className="input-wrapper">
                <input 
                  type="url" 
                  placeholder="Image URL (https://...)" 
                  className="input"
                  value={formData.imageUrl}
                  onChange={handleImageUrlChange}
                />
              </div>
            ) : (
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
            )}
            
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
            {loading ? 'Publishing...' : 'Publish Post'}
          </button>
        </form>
      </div>
    </div>
  );
}