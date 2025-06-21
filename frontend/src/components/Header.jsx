import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaSignInAlt, FaUserPlus, FaTasks } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <FaTasks className="text-primary-600 text-2xl" />
          <h1 className="text-xl font-bold text-gray-800">TaskFlow</h1>
        </Link>

        <nav>
          <ul className="flex items-center space-x-6">
            {user ? (
              <>
                <li>
                  <span className="text-gray-700">Welcome, {user.name}</span>
                </li>
                <li>
                  <Link
                    to="/tasks"
                    className="text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    My Tasks
                  </Link>
                </li>
                <li>
                  <button
                    onClick={onLogout}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <FaSignInAlt />
                    <span>Login</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <FaUserPlus />
                    <span>Register</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
