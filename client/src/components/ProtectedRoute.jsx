// ProtectedRoute.jsx
import { useRequireAuth } from './auth';

function ProtectedRoute({ children }) {
  useRequireAuth(); // This will redirect to login if not authenticated or role doesn't match
  return children;
}

export default ProtectedRoute;
