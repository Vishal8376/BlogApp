import { BookOpen, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TRENDING_TOPICS = ['#Technology', '#Health', '#Science', '#Travel', '#Food', '#Business', '#Art'];

export default function RightSidebar() {
  const navigate = useNavigate();

  return (
    <aside className="sidebar-right" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div className="trending-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <TrendingUp size={16} color="var(--primary-light)" />
          <span className="trending-title" style={{ margin: 0 }}>Trending Topics</span>
        </div>
        {TRENDING_TOPICS.map((topic, i) => (
          <div
            key={i}
            className="trending-item"
            onClick={() => navigate(`/search?q=${topic.slice(1)}`)}
          >
            <span className="trending-num">{i + 1}</span>
            <div style={{ flex: 1 }}>
              <div className="trending-text">{topic}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="trending-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <BookOpen size={16} color="var(--accent)" />
          <span className="trending-title" style={{ margin: 0 }}>About InkSpace</span>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.6 }}>
          A place where ideas come to life. Share your thoughts, follow inspiring writers, and explore content that matters to you.
        </p>
      </div>
    </aside>
  );
}
