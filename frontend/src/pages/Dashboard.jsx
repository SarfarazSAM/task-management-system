import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, reset as resetTask } from '../features/tasks/taskSlice';
import Spinner from '../components/Spinner';
import TaskItem from '../components/tasks/TaskItem';
import TaskFilter from '../components/tasks/TaskFilter';
import { FaPlus } from 'react-icons/fa';

const Dashboard = () => {
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    sort: '-createdAt',
  });

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    if (isError) {
      console.error(message);
    }

    dispatch(getTasks(filters));

    return () => {
      dispatch(resetTask());
    };
  }, [user, isError, message, dispatch, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
        <Link
          to="/tasks/new"
          className="btn btn-primary flex items-center space-x-2"
        >
          <FaPlus />
          <span>Add Task</span>
        </Link>
      </div>

      <TaskFilter onFilterChange={handleFilterChange} filters={filters} />

      {tasks.length > 0 ? (
        <div className="mt-6 space-y-4">
          {tasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>
      ) : (
        <div className="mt-8 text-center">
          <h3 className="text-lg font-medium text-gray-900">No tasks found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new task.
          </p>
          <div className="mt-6">
            <Link
              to="/tasks/new"
              className="btn btn-primary inline-flex items-center space-x-2"
            >
              <FaPlus />
              <span>New Task</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
