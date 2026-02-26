import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import PostCard from '../components/PostCard';
import PostSkeleton from '../components/PostSkeleton';
import { getAllPosts, getPostsByCategory } from '../api/blogApi';

export default function Home({ activeCategory }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = activeCategory
        ? await getPostsByCategory(activeCategory)
        : await getAllPosts();
      const data = Array.isArray(res.data) ? res.data : [];
      setPosts(data.slice().reverse());
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, [activeCategory]);

  return (
    <div>
      {activeCategory && (
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="badge badge-purple" style={{ fontSize: '0.85rem', padding: '0.3rem 0.9rem' }}>
            {activeCategory}
          </span>
          <span style={{ color: 'var(--text2)', fontSize: '0.875rem' }}>
            {loading ? '—' : `${posts.length} post${posts.length !== 1 ? 's' : ''}`}
          </span>
        </div>
      )}

      {loading ? (
        <div className="posts-feed">
          {[1,2,3].map(i => <PostSkeleton key={i} />)}
        </div>
      ) : posts.length === 0 ? (
        <div className="empty-state">
          <FileText size={48} className="empty-state-icon" />
          <div className="empty-state-title">No posts yet</div>
          <div className="empty-state-desc">
            {activeCategory ? `No posts in ${activeCategory} yet.` : 'Be the first to publish something!'}
          </div>
        </div>
      ) : (
        <div className="posts-feed">
          {posts.map(post => (
            <PostCard key={post.id} post={post} onLiked={fetchPosts} />
          ))}
        </div>
      )}
    </div>
  );
}
