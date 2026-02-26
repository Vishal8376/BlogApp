import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  User, Edit3, Save, X, Camera, Mail, Lock,
  Users, UserCheck, FileText, ChevronRight
} from 'lucide-react';
import {
  getUserById, updateUserProfile, updatePassword,
  updateEmail, getFollowersCount, getFollowingCount,
  followUser, unfollowUser, checkFollowing, getAllPosts
} from '../api/blogApi';
import { useAuth } from '../context/AuthContext';
import PostCard from '../components/PostCard';
import toast from 'react-hot-toast';

export default function Profile() {
  const { id } = useParams();
  const { user: authUser, login } = useAuth();
  const navigate = useNavigate();
  const isOwn = authUser && String(authUser.id) === String(id);

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [tab, setTab] = useState('posts');

  // Password change
  const [pwForm, setPwForm] = useState({ oldPassword: '', newPassword: '', confirmNew: '' });
  const [emailForm, setEmailForm] = useState({ newEmail: '' });
  const [savingPw, setSavingPw] = useState(false);
  const [savingEmail, setSavingEmail] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [profileRes, postsRes] = await Promise.all([
        getUserById(id),
        getAllPosts(),
      ]);
      const prof = profileRes.data;
      setProfile(prof);
      setEditForm({ name: prof.name, bio: prof.bio || '', profilePicUrl: prof.profilePicUrl || '' });

      const allPosts = Array.isArray(postsRes.data) ? postsRes.data : [];
      const myPosts = allPosts.filter(p =>
        p.author === prof.name || (p.user && String(p.user.id) === String(id))
      );
      setPosts(myPosts);

      const [fcRes, fgRes] = await Promise.all([
        getFollowersCount(id),
        getFollowingCount(id),
      ]);
      setFollowersCount(fcRes.data);
      setFollowingCount(fgRes.data);

      if (authUser?.id && !isOwn) {
        const chkRes = await checkFollowing(authUser.id, id);
        setIsFollowing(chkRes.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, [id]);

  const handleSaveProfile = async () => {
    try {
      const res = await updateUserProfile(id, editForm);
      setProfile(res.data);
      if (isOwn) login({ ...authUser, name: res.data.name });
      toast.success('Profile updated!');
      setEditing(false);
    } catch { toast.error('Failed to update profile'); }
  };

  const handleFollow = async () => {
    if (!authUser) { navigate('/login'); return; }
    try {
      if (isFollowing) {
        await unfollowUser(authUser.id, id);
        setIsFollowing(false);
        setFollowersCount(c => c - 1);
        toast.success('Unfollowed');
      } else {
        await followUser(authUser.id, id);
        setIsFollowing(true);
        setFollowersCount(c => c + 1);
        toast.success('Following!');
      }
    } catch { toast.error('Action failed'); }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (pwForm.newPassword !== pwForm.confirmNew) { toast.error('Passwords do not match'); return; }
    setSavingPw(true);
    try {
      await updatePassword(id, pwForm.oldPassword, pwForm.newPassword);
      toast.success('Password updated!');
      setPwForm({ oldPassword: '', newPassword: '', confirmNew: '' });
    } catch (err) { toast.error(err.response?.data || 'Failed'); }
    finally { setSavingPw(false); }
  };

  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    setSavingEmail(true);
    try {
      await updateEmail(id, emailForm.newEmail);
      toast.success('Email updated!');
      setEmailForm({ newEmail: '' });
    } catch (err) { toast.error(err.response?.data || 'Failed'); }
    finally { setSavingEmail(false); }
  };

  if (loading) {
    return (
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div className="skeleton" style={{ width: '100%', height: 200, borderRadius: 14, marginBottom: '2rem' }} />
        <div className="skeleton" style={{ width: '60%', height: 28, marginBottom: '1rem' }} />
        <div className="skeleton" style={{ width: '80%', height: 18 }} />
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text2)' }}>
        User not found.
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Profile Header */}
      <div className="profile-header">
        <div style={{ position: 'relative', flexShrink: 0 }}>
          {profile.profilePicUrl ? (
            <img
              src={profile.profilePicUrl}
              alt={profile.name}
              className="avatar avatar-xl"
              onError={e => { e.target.style.display = 'none'; }}
            />
          ) : (
            <div className="avatar avatar-xl" style={{ background: 'var(--primary)', color: '#fff' }}>
              {profile.name?.[0]?.toUpperCase() || 'U'}
            </div>
          )}
        </div>

        <div style={{ flex: 1 }}>
          {editing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <input
                className="form-input"
                placeholder="Name"
                value={editForm.name}
                onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
              />
              <textarea
                className="form-input"
                placeholder="Bio"
                style={{ minHeight: 80 }}
                value={editForm.bio}
                onChange={e => setEditForm(f => ({ ...f, bio: e.target.value }))}
              />
              <input
                className="form-input"
                placeholder="Profile picture URL"
                value={editForm.profilePicUrl}
                onChange={e => setEditForm(f => ({ ...f, profilePicUrl: e.target.value }))}
              />
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-primary btn-sm" onClick={handleSaveProfile}>
                  <Save size={14} /> Save
                </button>
                <button className="btn btn-ghost btn-sm" onClick={() => setEditing(false)}>
                  <X size={14} /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="profile-name">{profile.name}</h1>
              <p className="profile-email">{profile.emailId}</p>
              {profile.bio && <p className="profile-bio">{profile.bio}</p>}

              <div className="profile-stats">
                <div className="profile-stat">
                  <span className="profile-stat-num">{posts.length}</span>
                  <span className="profile-stat-label">Posts</span>
                </div>
                <div className="profile-stat">
                  <span className="profile-stat-num">{followersCount}</span>
                  <span className="profile-stat-label">Followers</span>
                </div>
                <div className="profile-stat">
                  <span className="profile-stat-num">{followingCount}</span>
                  <span className="profile-stat-label">Following</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                {isOwn ? (
                  <button className="btn btn-outline btn-sm" onClick={() => setEditing(true)}>
                    <Edit3 size={14} /> Edit Profile
                  </button>
                ) : (
                  <button
                    className={`btn btn-sm ${isFollowing ? 'btn-ghost' : 'btn-primary'}`}
                    onClick={handleFollow}
                  >
                    <UserCheck size={14} />
                    {isFollowing ? 'Unfollow' : 'Follow'}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '0' }}>
        {[
          { key: 'posts', label: 'Posts', icon: <FileText size={15} /> },
          ...(isOwn ? [
            { key: 'password', label: 'Password', icon: <Lock size={15} /> },
            { key: 'email', label: 'Email', icon: <Mail size={15} /> },
          ] : []),
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.65rem 1.2rem', background: 'none', border: 'none',
              color: tab === t.key ? 'var(--primary-light)' : 'var(--text2)',
              fontWeight: tab === t.key ? 700 : 500, fontSize: '0.875rem',
              borderBottom: tab === t.key ? '2px solid var(--primary)' : '2px solid transparent',
              cursor: 'pointer', transition: 'all 0.2s', marginBottom: '-1px',
            }}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      {tab === 'posts' && (
        posts.length === 0 ? (
          <div className="empty-state">
            <FileText size={48} className="empty-state-icon" />
            <div className="empty-state-title">No posts yet</div>
          </div>
        ) : (
          <div className="posts-feed">
            {posts.map(post => <PostCard key={post.id} post={post} onLiked={fetchAll} />)}
          </div>
        )
      )}

      {tab === 'password' && isOwn && (
        <div className="card" style={{ maxWidth: 480 }}>
          <h3 style={{ fontWeight: 700, marginBottom: '1.25rem' }}>Change Password</h3>
          <form onSubmit={handlePasswordUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Current Password</label>
              <input
                className="form-input" type="password"
                value={pwForm.oldPassword}
                onChange={e => setPwForm(f => ({ ...f, oldPassword: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">New Password</label>
              <input
                className="form-input" type="password"
                value={pwForm.newPassword}
                onChange={e => setPwForm(f => ({ ...f, newPassword: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <input
                className="form-input" type="password"
                value={pwForm.confirmNew}
                onChange={e => setPwForm(f => ({ ...f, confirmNew: e.target.value }))}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={savingPw}>
              {savingPw ? 'Saving…' : 'Update Password'}
            </button>
          </form>
        </div>
      )}

      {tab === 'email' && isOwn && (
        <div className="card" style={{ maxWidth: 480 }}>
          <h3 style={{ fontWeight: 700, marginBottom: '1.25rem' }}>Update Email</h3>
          <form onSubmit={handleEmailUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Current Email</label>
              <input className="form-input" type="email" value={profile.emailId} disabled />
            </div>
            <div className="form-group">
              <label className="form-label">New Email</label>
              <input
                className="form-input" type="email"
                value={emailForm.newEmail}
                onChange={e => setEmailForm({ newEmail: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={savingEmail}>
              {savingEmail ? 'Saving…' : 'Update Email'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
