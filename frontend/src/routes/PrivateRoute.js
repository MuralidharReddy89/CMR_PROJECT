
import { Navigate } from 'react-router-dom';
import { getAuth } from '../services/auth';

export default function PrivateRoute({ children }) {
  const auth = getAuth();
  if (!auth) return <Navigate to="/login" replace />;
  return children;
}
