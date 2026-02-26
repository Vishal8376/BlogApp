import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, FileSearch } from 'lucide-react';
import PostCard from '../components/PostCard';
import PostSkeleton from '../components/PostSkeleton';
import { searchPosts } from '../api/blogApi';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) { setPosts([]); return; }
    setLoading(true);
    searchPosts(query)
      .then(res => setPosts(Array.isArray(res.data) ? res.data : []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Search size={20} color="var(--primary-light)" />
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Search Results</h1>
        </div>
        {query && (
          <p style={{ color: 'var(--text2)', fontSize: '0.9rem' }}>
            Results for <span style={{ color: 'var(--primary-light)', fontWeight: 600 }}>"{query}"</span>
          </p>
        )}
      </div>

      {loading ? (
        <div className="posts-feed">
          {[1,2,3].map(i => <PostSkeleton key={i} />)}
        </div>
      ) : posts.length === 0 ? (
        <div className="empty-state">
          <FileSearch size={56} className="empty-state-icon" />
          <div className="empty-state-title">No results found</div>
          <div className="empty-state-desc">
            Try different keywords or check the spelling.
          </div>
        </div>
      ) : (
        <>
          <p style={{ color: 'var(--text2)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            Found {posts.length} post{posts.length !== 1 ? 's' : ''}
          </p>
          <div className="posts-feed">
            {posts.map(post => <PostCard key={post.id} post={post} />)}
          </div>
        </>
      )}
    </div>
  );
}
