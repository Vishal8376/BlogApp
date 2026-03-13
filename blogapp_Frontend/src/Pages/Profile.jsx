import { useEffect, useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { mockApi } from '../Services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { Edit2, Image as ImageIcon, Users, UserCheck, X, Grid3X3, Heart, MessageSquare } from 'lucide-react';

export default function Profile() {
  const { user, isAuthenticated, updateUser } = useAuth();
  const { username } = useParams();
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [isCurrentUser, setIsCurrentUser] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ bio: '', profileImage: null });
  const [imagePreview, setImagePreview] = useState(null);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        
        if (!isAuthenticated || !user) {
          navigate('/login');
          return;
        }

        const targetUsername = username || user.username;
        const profile = await mockApi.getProfile(targetUsername);
        
        if (!profile) {
          setLoading(false);
          return;
        }

        setProfileData(profile);
        setEditData({ bio: profile.bio || '', profileImage: null });
        
        const isCurrent = !username || username === user.username;
        setIsCurrentUser(isCurrent);
        
        const posts = await mockApi.getPostsByUser(profile.id);
        setUserPosts(posts || []);
        
        if (!isCurrent) {
          const following = await mockApi.checkFollowing(profile.id);
          setIsFollowing(following);
        }
        
      } catch (err) {
        console.error('Profile load error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [isAuthenticated, user, username, navigate]);

  const handleImageUpload = (e, isProfile = true) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isProfile) {
          setImagePreview(reader.result);
          setEditData({...editData, profileImage: reader.result});
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const updates = {};
      if (editData.bio) updates.bio = editData.bio;
      if (editData.profileImage) updates.profileImage = editData.profileImage;
      
      const updatedUser = await mockApi.updateUserProfile(user.id, updates);
      updateUser(updatedUser);
      setEditing(false);
      setImagePreview(null);
      
      const profile = await mockApi.getProfile(user.username);
      setProfileData(profile);
    } catch (err) {
      console.error('Save profile error:', err);
    }
  };

  const handleFollow = async () => {
    try {
      const result = await mockApi.toggleFollow(profileData.id);
      setIsFollowing(result.isFollowing);
      setProfileData({...profileData, followers: result.followers});
    } catch (err) {
      console.error('Follow error:', err);
    }
  };

  const openFollowersModal = async () => {
    const followers = await mockApi.getFollowers(profileData.id);
    setFollowersList(followers || []);
    setShowFollowers(true);
  };

  const openFollowingModal = async () => {
    const following = await mockApi.getFollowing(profileData.id);
    setFollowingList(following || []);
    setShowFollowing(true);
  };

  const handleFollowFromModal = async (targetUserId) => {
    await mockApi.toggleFollow(targetUserId);
    const profile = await mockApi.getProfile(profileData.username);
    setProfileData(profile);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <span>Loading Profile...</span>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="profile-container">
        <div className="card text-center">
          <h2 style={{marginBottom: '16px'}}>Profile not found</h2>
          <button onClick={() => navigate('/home')} className="btn btn-primary">Go Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar-container">
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="profile-avatar" />
          ) : profileData.profileImage ? (
            <img src={profileData.profileImage} alt={profileData.name} className="profile-avatar" />
          ) : (
            <div className="profile-avatar-placeholder">
              {profileData.name?.[0] || profileData.username?.[0] || '?'}
            </div>
          )}
          
          {editing && isCurrentUser && (
            <label className="profile-edit-btn">
              <Edit2 size={18} />
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => handleImageUpload(e, true)}
                style={{display: 'none'}}
              />
            </label>
          )}
        </div>
        
        <div className="profile-info">
          <div className="profile-name-row">
            <div>
              <h1 className="profile-username">{profileData.username}</h1>
              {profileData.name && <div className="profile-name">{profileData.name}</div>}
            </div>
            
            {isCurrentUser ? (
              <div className="profile-actions">
                <button 
                  onClick={() => setEditing(!editing)} 
                  className="btn btn-outline"
                >
                  <Edit2 size={16} />
                  {editing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>
            ) : (
              <div className="profile-actions">
                <button 
                  onClick={handleFollow}
                  className={`follow-btn ${isFollowing ? 'following' : 'not-following'}`}
                >
                  {isFollowing ? (
                    <>
                      <UserCheck size={16} /> Following
                    </>
                  ) : (
                    <>
                      <Users size={16} /> Follow
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
          
          {editing && isCurrentUser ? (
            <div style={{maxWidth: '500px', margin: '20px 0'}}>
              <textarea 
                className="input" 
                placeholder="Write your bio..." 
                value={editData.bio}
                onChange={(e) => setEditData({...editData, bio: e.target.value})}
                rows="3"
                style={{marginBottom: '16px'}}
              />
              <div className="flex gap-2">
                <button onClick={handleSaveProfile} className="btn btn-primary">
                  Save Changes
                </button>
                <button 
                  onClick={() => {setEditing(false); setImagePreview(null);}} 
                  className="btn btn-outline"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="profile-bio">{profileData.bio || 'No bio yet'}</p>
          )}
          
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-count">{userPosts.length}</span>
              <span className="stat-label">posts</span>
            </div>
            <div className="stat-item" onClick={openFollowersModal}>
              <span className="stat-count">{profileData.followers || 0}</span>
              <span className="stat-label">followers</span>
            </div>
            <div className="stat-item" onClick={openFollowingModal}>
              <span className="stat-count">{profileData.following || 0}</span>
              <span className="stat-label">following</span>
            </div>
          </div>
        </div>
      </div>

      {/* Followers Modal */}
      {showFollowers && (
        <div className="modal-overlay" onClick={() => setShowFollowers(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Followers</h3>
              <button className="modal-close" onClick={() => setShowFollowers(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              {followersList.length > 0 ? (
                followersList.map(u => (
                  <div key={u.id} className="user-list-item">
                    <div className="user-list-avatar">
                      {u.profileImage ? (
                        <img src={u.profileImage} alt={u.name} style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
                      ) : (
                        u.name?.[0] || u.username?.[0] || '?'
                      )}
                    </div>
                    <div className="user-list-info">
                      <div className="user-list-name">{u.name}</div>
                      <div className="user-list-username">@{u.username}</div>
                    </div>
                    {u.id !== user?.id && (
                      <button 
                        className={`follow-btn btn-sm ${u.followingList?.includes(user?.id) ? 'following' : 'not-following'}`}
                        onClick={() => handleFollowFromModal(u.id)}
                      >
                        {u.followingList?.includes(user?.id) ? 'Following' : 'Follow'}
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div style={{padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)'}}>
                  <Users size={48} style={{margin: '0 auto 16px', opacity: 0.5}} />
                  <p>No followers yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Following Modal */}
      {showFollowing && (
        <div className="modal-overlay" onClick={() => setShowFollowing(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Following</h3>
              <button className="modal-close" onClick={() => setShowFollowing(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              {followingList.length > 0 ? (
                followingList.map(u => (
                  <div key={u.id} className="user-list-item">
                    <div className="user-list-avatar">
                      {u.profileImage ? (
                        <img src={u.profileImage} alt={u.name} style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
                      ) : (
                        u.name?.[0] || u.username?.[0] || '?'
                      )}
                    </div>
                    <div className="user-list-info">
                      <div className="user-list-name">{u.name}</div>
                      <div className="user-list-username">@{u.username}</div>
                    </div>
                    {u.id !== user?.id && (
                      <button 
                        className={`follow-btn btn-sm ${u.followingList?.includes(user?.id) ? 'following' : 'not-following'}`}
                        onClick={() => handleFollowFromModal(u.id)}
                      >
                        {u.followingList?.includes(user?.id) ? 'Following' : 'Follow'}
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div style={{padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)'}}>
                  <Users size={48} style={{margin: '0 auto 16px', opacity: 0.5}} />
                  <p>Not following anyone yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="profile-tabs">
        <button className={`profile-tab active`}>
          <Grid3X3 size={16} /> Posts
        </button>
      </div>

      <div>
        {userPosts && userPosts.length > 0 ? (
          <div className="post-grid">
            {userPosts.map(post => (
              <div key={post.id} className="post-grid-item" onClick={() => navigate('/home')}>
                {post.image ? (
                  <img src={post.image} alt={post.title} className="post-grid-image" />
                ) : (
                  <div style={{
                    width: '100%', 
                    height: '100%', 
                    background: 'var(--gradient-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary)',
                    fontSize: '3rem',
                    fontWeight: '300'
                  }}>
                    {post.title?.[0] || 'P'}
                  </div>
                )}
                <div className="post-overlay">
                  <span>
                    <Heart size={18} fill="white" /> {post.likes || 0}
                  </span>
                  <span>
                    <MessageSquare size={18} fill="white" /> {post.comments?.length || 0}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center" style={{padding: '80px 20px', marginTop: '48px'}}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'var(--gradient-subtle)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: '2.5rem'
            }}>📷</div>
            <h3 style={{marginBottom: '12px', fontSize: '1.5rem'}}>No Posts Yet</h3>
            <p style={{color: 'var(--text-secondary)', marginBottom: '24px'}}>
              Start sharing your thoughts with the community!
            </p>
            {isCurrentUser && (
              <button onClick={() => navigate('/create')} className="btn btn-primary btn-lg">
                Create First Post
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}