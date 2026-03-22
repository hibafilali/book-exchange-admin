import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './features/dashboard/Dashboard';
import Login from './features/auth/Login';
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
import LandingPage from './features/landing/LandingPage';
import { useAuth } from './features/auth/useAuth';

function PrivateRoute({ children, allowedRoles = [] }) {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
      return <Navigate to="/login" replace />;
  }
  
  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Student Routes */}
      <Route path="/student-dashboard" element={<PrivateRoute allowedRoles={['STUDENT']}><StudentLayout /></PrivateRoute>}>
        <Route index element={<StudentHome />} />
        <Route path="book/:id" element={<BookDetails />} />
        <Route path="search" element={<SearchExplorer />} />
        <Route path="publish" element={<PublishAd />} />
        <Route path="dashboard" element={<StudentDashboard />} />
      </Route>

      {/* Protected Admin Routes */}
      <Route path="/" element={<PrivateRoute allowedRoles={['ADMIN']}><Layout /></PrivateRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<UsersList />} />
        <Route path="annonces" element={<AnnoncesList />} />
        <Route path="moderation" element={<Moderation />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
