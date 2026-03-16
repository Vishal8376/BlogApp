import { useEffect, useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';

import { useNavigate, useParams } from 'react-router-dom';
import { Edit2, Image as ImageIcon, Users, UserCheck, X, Grid3X3, Heart, MessageSquare, Trash2 } from 'lucide-react';
import { getUserProfile, updateUserProfile } from '../Services/userService';
import { deletePost } from '../Services/postService';
import api from '../Services/api';

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
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({ name: '', bio: '', profileImage: null });
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

        // For now, focus on the current user's profile
        // To support finding by username, the backend would need a findByUsername or findByEmail method
        // Since we only have getUserById, we'll use user.id
        const targetId = user.id; 
        
        console.log("Fetching profile for id:", targetId);
        const profile = await getUserProfile(targetId);
        
        if (!profile) {
          setLoading(false);
          return;
        }

        setProfileData(profile);
        // Map backend's profilePicUrl to frontend's expected format
        setEditData({ name: profile.name || '', bio: profile.bio || '', profileImage: profile.profilePicUrl || null });
        
        const isCurrent = targetId === user.id;
        setIsCurrentUser(isCurrent);
        
        // Fetch posts by user ID
        const postsRes = await api.get(`/posts/user/${targetId}`);
        setUserPosts(postsRes.data || []);
        
        if (!isCurrent) {
          // TODO: Integrate with backend checkFollowing API
          const following = false;
          setIsFollowing(following);
        }
        
      } catch (err) {
        console.error('Profile load error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [isAuthenticated, user, navigate]);

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
      const updates = {
         ...user,
         name: editData.name,
         bio: editData.bio,
         profilePicUrl: editData.profileImage
      };
      
      console.log("Saving updates:", updates);
      const updatedUser = await updateUserProfile(user.id, updates);
      
      updateUser(updatedUser);
      setProfileData(updatedUser);
      
      setShowEditModal(false);
    } catch (err) {
      console.error('Save profile error:', err);
    }
  };

  const handleFollow = async () => {
    try {
      // TODO: Integrate with backend toggleFollow API
      const result = null;
      setIsFollowing(result.isFollowing);
      setProfileData({...profileData, followers: result.followers});
    } catch (err) {
      console.error('Follow error:', err);
    }
  };

  const openFollowersModal = async () => {
    // TODO: Integrate with backend getFollowers API
    const followers = [];
    setFollowersList(followers || []);
    setShowFollowers(true);
  };

  const openFollowingModal = async () => {
    // TODO: Integrate with backend getFollowing API
    const following = [];
    setFollowingList(following || []);
    setShowFollowing(true);
  };

  const handleFollowFromModal = async (targetUserId) => {
    // TODO: Integrate with backend toggleFollow API
    // TODO: Integrate with backend getProfile API
    const profile = null;
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
          ) : profileData.profilePicUrl ? (
            <img src={profileData.profilePicUrl} alt={profileData.name} className="profile-avatar" />
          ) : (
            <div className="profile-avatar-placeholder">
              {profileData.name?.[0] || '?'}
            </div>
          )}
          
          {isCurrentUser && (
            <label className="profile-edit-btn" onClick={() => setShowEditModal(true)}>
              <Edit2 size={18} />
            </label>
          )}
        </div>
        
        <div className="profile-info">
          <div className="profile-name-row">
            <div>
              <h1 className="profile-username">{profileData.name}</h1>
              <div className="profile-name">{profileData.emailId}</div>
            </div>
            
            {isCurrentUser ? (
              <div className="profile-actions">
                <button 
                  onClick={() => setShowEditModal(true)} 
                  className="btn btn-outline"
                >
                  <Edit2 size={16} />
                  Edit Profile
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
          
          <p className="profile-bio">{profileData.bio || 'No bio yet'}</p>
          
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

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{maxWidth: '500px'}}>
            <div className="modal-header">
              <h3 className="modal-title">Edit Profile</h3>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body" style={{padding: '24px'}}>
              <div style={{display: 'flex', justifyContent: 'center', marginBottom: '24px'}}>
                 <div className="profile-avatar-container" style={{width: '100px', height: '100px'}}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="profile-avatar" />
                  ) : profileData.profilePicUrl ? (
                    <img src={profileData.profilePicUrl} alt={profileData.name} className="profile-avatar" />
                  ) : (
                    <div className="profile-avatar-placeholder" style={{fontSize: '2rem'}}>
                      {profileData.name?.[0] || '?'}
                    </div>
                  )}
                  <label className="profile-edit-btn">
                    <Edit2 size={14} />
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleImageUpload(e, true)}
                      style={{display: 'none'}}
                    />
                  </label>
                </div>
              </div>

              <div className="input-wrapper">
                <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: '500'}}>Name</label>
                <input 
                  type="text"
                  className="input" 
                  placeholder="Your Name" 
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                />
              </div>

              <div className="input-wrapper">
                <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: '500'}}>Bio</label>
                <textarea 
                  className="input" 
                  placeholder="Write a short bio..." 
                  value={editData.bio}
                  onChange={(e) => setEditData({...editData, bio: e.target.value})}
                  rows="4"
                />
              </div>

              <div className="flex gap-2" style={{marginTop: '24px'}}>
                <button onClick={handleSaveProfile} className="btn btn-primary" style={{flex: 1}}>
                  Save Changes
                </button>
                <button 
                  onClick={() => {setShowEditModal(false); setImagePreview(null); setEditData({ name: profileData.name || '', bio: profileData.bio || '', profileImage: profileData.profilePicUrl || null });}} 
                  className="btn btn-outline"
                  style={{flex: 1}}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                      {u.profilePicUrl ? (
                        <img src={u.profilePicUrl} alt={u.name} style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
                      ) : (
                        u.name?.[0] || '?'
                      )}
                    </div>
                    <div className="user-list-info">
                      <div className="user-list-name">{u.name}</div>
                      <div className="user-list-username">{u.emailId}</div>
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
                      {u.profilePicUrl ? (
                        <img src={u.profilePicUrl} alt={u.name} style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
                      ) : (
                        u.name?.[0] || '?'
                      )}
                    </div>
                    <div className="user-list-info">
                      <div className="user-list-name">{u.name}</div>
                      <div className="user-list-username">{u.emailId}</div>
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
              <div key={post.id} className="post-grid-item" onClick={() => navigate(`/post/${post.id}`)}>
                {post.image ? (
                  <img src={post.image} alt={post.description || 'Post'} className="post-grid-image" />
                ) : (
                  <div style={{
                    width: '100%', 
                    height: '100%', 
                    background: 'var(--gradient-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary)',
                    fontSize: '1rem',
                    fontWeight: '300',
                    textAlign: 'center',
                    padding: '8px'
                  }}>
                    {post.description ? (post.description.substring(0, 15) + '...') : 'Post'}
                  </div>
                )}
                <div className="post-overlay">
                  <div style={{display: 'flex', gap: '16px'}}>
                    <span>
                      <Heart size={18} fill="white" /> {post.interactions?.filter(i => i.like).length || 0}
                    </span>
                    <span>
                      <MessageSquare size={18} fill="white" /> {post.interactions?.filter(i => i.comment).length || 0}
                    </span>
                  </div>
                  {isCurrentUser && (
                    <div style={{display: 'flex', gap: '16px'}}>
                       <span 
                          onClick={(e) => { e.stopPropagation(); navigate(`/edit/${post.id}`); }}
                          style={{cursor: 'pointer', opacity: 0.8}}
                          title="Edit Post"
                       >
                         <Edit2 size={18} color="white" />
                       </span>
                       <span 
                          onClick={async (e) => { 
                            e.stopPropagation(); 
                            try {
                              await deletePost(post.id);
                              setUserPosts(userPosts.filter(p => p.id !== post.id));
                            } catch (err) {
                              console.error("Failed to delete post", err);
                            }
                          }}
                          style={{cursor: 'pointer', opacity: 0.8}}
                          title="Delete Post"
                       >
                         <Trash2 size={18} color="var(--danger)" />
                       </span>
                    </div>
                  )}
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