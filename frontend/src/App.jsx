import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './Contexts/AuthContext';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import CreatePost from './Pages/CreatePost';
import Profile from './Pages/Profile';
import PostDetails from './Pages/PostDetails';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <div style={{minHeight: '100vh'}}>
      <Navbar />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/home" /> : <Register />} />
        
        <Route path="/home" element={
          <ProtectedRoute><Home /></ProtectedRoute>
        } />
        <Route path="/create" element={
          <ProtectedRoute><CreatePost /></ProtectedRoute>
        } />
        <Route path="/edit/:postId" element={
          <ProtectedRoute><CreatePost /></ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute><Profile /></ProtectedRoute>
        } />
        <Route path="/profile/:profileSlug" element={
          <ProtectedRoute><Profile /></ProtectedRoute>
        } />
        <Route path="/post/:id" element={
          <ProtectedRoute><PostDetails /></ProtectedRoute>
        } />
        {/* Catch all invalid routes and redirect to home if logged in, else login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

import { ThemeProvider } from './Contexts/ThemeContext';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}