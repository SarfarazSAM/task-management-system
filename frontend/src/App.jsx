import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { reset } from './features/auth/authSlice';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import TaskForm from './components/tasks/TaskForm';
import TaskDetails from './components/tasks/TaskDetails';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Clear auth state when component unmounts
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          
          <Route path="/tasks" element={<PrivateRoute />}>
            <Route index element={<Dashboard />} />
            <Route path="new" element={<TaskForm />} />
            <Route path=":taskId" element={<TaskDetails />} />
            <Route path="edit/:taskId" element={<TaskForm />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;
