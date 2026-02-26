import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import RightSidebar from './components/RightSidebar';
import CreatePostModal from './components/CreatePostModal';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PostDetail from './pages/PostDetail';
import Profile from './pages/Profile';
import SearchResults from './pages/SearchResults';
import SavedPosts from './pages/SavedPosts';
import Trending from './pages/Trending';

import './styles/globals.css';
import './styles/components.css';

function AppShell() {
  const location = useLocation();
  const [showCreate, setShowCreate] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/signup';

  const isFullPage =
    location.pathname.startsWith('/post/') ||
    location.pathname.startsWith('/profile/') ||
    location.pathname === '/search' ||
    location.pathname === '/saved';

  const handleCreated = () => setRefreshKey(k => k + 1);

  return (
    <>
      <Navbar onCreatePost={() => setShowCreate(true)} />

      {isAuthPage ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      ) : isFullPage ? (
        <Routes>
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/saved" element={<SavedPosts />} />
        </Routes>
      ) : (
        <div className="page-layout">
          <Sidebar
            onCategorySelect={setActiveCategory}
            activeCategory={activeCategory}
          />
          <main>
            <Routes>
              <Route
                path="/"
                element={<Home key={refreshKey} activeCategory={activeCategory} />}
              />
              <Route path="/trending" element={<Trending />} />
            </Routes>
          </main>
          <RightSidebar />
        </div>
      )}

      {showCreate && (
        <CreatePostModal
          onClose={() => setShowCreate(false)}
          onCreated={handleCreated}
        />
      )}

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--card)',
            color: 'var(--text)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            fontSize: '0.875rem',
          },
        }}
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </BrowserRouter>
  );
}
