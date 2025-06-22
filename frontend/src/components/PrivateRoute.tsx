import { Navigate, Outlet } from 'react-router';
import { toast } from 'react-toastify';
import { useAuthStore } from '../store';

const PrivateRoute = () => {
  const { user } = useAuthStore();

  if (!user) {
    toast.error('Please log in to access this page');
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
