import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import PostCard from '../components/PostCard';
import PostSkeleton from '../components/PostSkeleton';
import { getAllPosts } from '../api/blogApi';

export default function Trending() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPosts()
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : [];
        // Sort by like count descending
        const sorted = data.slice().sort((a, b) => {
          const la = (a.interactions || []).filter(i => i.isLike || i.like).length;
          const lb = (b.interactions || []).filter(i => i.isLike || i.like).length;
          return lb - la;
        });
        setPosts(sorted);
      })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <TrendingUp size={22} color="var(--primary-light)" />
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Trending Posts</h1>
      </div>

      {loading ? (
        <div className="posts-feed">{[1,2,3].map(i => <PostSkeleton key={i} />)}</div>
      ) : (
        <div className="posts-feed">
          {posts.map(post => <PostCard key={post.id} post={post} />)}
        </div>
      )}
    </div>
  );
}
