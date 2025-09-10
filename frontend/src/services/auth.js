import { jwtDecode } from 'jwt-decode';

export function saveAuth(token) {
  localStorage.setItem('token', token);
}

export function clearAuth() {
  localStorage.removeItem('token');
}

export function getAuth() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = jwtDecode(token);
    return { token, user: payload };
  } catch (e) {
    return null;
  }
}
