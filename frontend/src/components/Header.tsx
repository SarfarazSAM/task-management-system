import { Link, useNavigate } from 'react-router';
import { FaSignInAlt, FaSignOutAlt, FaUser, FaTasks } from 'react-icons/fa';
import { useAuthStore } from '../store';

const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <FaTasks className="h-8 w-8 text-primary-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">TaskFlow</span>
            </Link>
            {isAuthenticated && (
              <nav className="ml-10 flex space-x-8">
                <Link
                  to="/"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-primary-500 text-sm font-medium text-gray-900"
                >
                  Dashboard
                </Link>
              </nav>
            )}
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">
                  {user?.name}
                </span>
                <button
                  onClick={onLogout}
                  className="btn btn-primary"
                >
                  <FaSignOutAlt className="mr-1" /> Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="btn btn-secondary"
                >
                  <FaSignInAlt className="mr-1" /> Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary"
                >
                  <FaUser className="mr-1" /> Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
