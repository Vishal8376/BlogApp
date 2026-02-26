export default function PostSkeleton() {
  return (
    <div className="post-card" style={{ overflow: 'hidden' }}>
      <div className="skeleton" style={{ width: '100%', height: 220 }} />
      <div className="post-card-body">
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div className="skeleton" style={{ width: 70, height: 22, borderRadius: 100 }} />
          <div className="skeleton" style={{ width: 60, height: 22, borderRadius: 100 }} />
        </div>
        <div className="skeleton" style={{ width: '85%', height: 22, marginBottom: '0.5rem' }} />
        <div className="skeleton" style={{ width: '60%', height: 18, marginBottom: '1rem' }} />
        <div className="skeleton" style={{ width: '100%', height: 16, marginBottom: '0.4rem' }} />
        <div className="skeleton" style={{ width: '70%', height: 16 }} />
      </div>
    </div>
  );
}
