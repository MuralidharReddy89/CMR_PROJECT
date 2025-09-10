
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Leads from './pages/Leads';
import Opportunities from './pages/Opportunities';
import PrivateRoute from './routes/PrivateRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/leads" element={<PrivateRoute><Leads /></PrivateRoute>} />
      <Route path="/opportunities" element={<PrivateRoute><Opportunities /></PrivateRoute>} />
      <Route path="/" element={<Navigate to="/leads" replace />} />
    </Routes>
  );
}
