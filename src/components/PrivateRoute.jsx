import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function PrivateRoute({ children }) {
  const { isAuthenticated, token } = useAuthStore();
  
  const cookieToken = typeof document !== 'undefined' ? getCookie('token') : null;
  const hasToken = token || cookieToken || localStorage.getItem('token');
  
  if (isAuthenticated || hasToken) {
    return children;
  }
  
  return <Navigate to="/" replace />;
}

export default PrivateRoute;

