import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { useEffect } from 'react';
import SplashScreen from './components/common/SplashScreen';
import Layout from './components/layout/Layout';
import Dashboard from './features/dashboard/Dashboard';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import ForgotPassword from './features/auth/ForgotPassword';
import UsersList from './features/users/UsersList';
import AnnoncesList from './features/annonces/AnnoncesList';
import Moderation from './features/moderation/Moderation';
import Settings from './features/settings/Settings';
import StudentLayout from './features/student/StudentLayout';
import StudentHome from './features/student/StudentHome';
import BookDetails from './features/student/BookDetails';
import SearchExplorer from './features/student/SearchExplorer';
import PublishAd from './features/student/PublishAd';
import StudentDashboard from './features/student/StudentDashboard';
import ChatWindow from './features/student/ChatWindow';
import SellerProfile from './features/student/SellerProfile';
import LandingPage from './features/landing/LandingPage';
import { useAuth } from './features/auth/useAuth';

function RoleRedirect({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error('Accès refusé. Redirection en cours...', { id: 'role-redirect' });
    if (user.role === 'ADMIN') navigate('/admin');
    else navigate('/student-dashboard');
  }, [user, navigate]);

  return null;
}

function PublicRoute({ children }) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return <SplashScreen />;

  if (isAuthenticated) {
    if (user.role === 'ADMIN') return <Navigate to="/admin" replace />;
    return <Navigate to="/student-dashboard" replace />;
  }

  return children;
}

function PrivateRoute({ children, allowedRoles = [] }) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return <SplashScreen />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    return <RoleRedirect user={user} />;
  }

  return children;
}

function App() {
  return (
    <>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            fontWeight: '600',
            fontSize: '0.9rem',
            padding: '12px 20px',
            borderRadius: '16px'
          },
          success: {
            iconTheme: { primary: '#10b981', secondary: 'white' },
            style: {
              border: '1px solid rgba(16, 185, 129, 0.3)',
              boxShadow: '0 8px 32px rgba(16, 185, 129, 0.15)',
            }
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: 'white' },
            style: {
              border: '1px solid rgba(239, 68, 68, 0.3)',
              boxShadow: '0 8px 32px rgba(239, 68, 68, 0.15)',
            }
          }
        }}
      />
      <Routes>
        {/* Public Routes with Auto-Redirect */}
        <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />

        {/* Protected Student Routes */}
        <Route path="/student-dashboard" element={<PrivateRoute allowedRoles={['STUDENT']}><StudentLayout /></PrivateRoute>}>
          <Route index element={<StudentHome />} />
          <Route path="book/:id" element={<BookDetails />} />
          <Route path="search" element={<SearchExplorer />} />
          <Route path="publish" element={<PublishAd />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="messages" element={<ChatWindow />} />
          <Route path="user/:id" element={<SellerProfile />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<PrivateRoute allowedRoles={['ADMIN']}><Layout /></PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UsersList />} />
          <Route path="annonces" element={<AnnoncesList />} />
          <Route path="moderation" element={<Moderation />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
