import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './features/dashboard/Dashboard';
import Login from './features/auth/Login';
import UsersList from './features/users/UsersList';
import AnnoncesList from './features/annonces/AnnoncesList';
import Moderation from './features/moderation/Moderation';
import Settings from './features/settings/Settings';
import { useAuth } from './features/auth/useAuth';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
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
