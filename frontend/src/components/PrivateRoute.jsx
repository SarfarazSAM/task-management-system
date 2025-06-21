import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const PrivateRoute = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    toast.error('Please log in to access this page');
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
