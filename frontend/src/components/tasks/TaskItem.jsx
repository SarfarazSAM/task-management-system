import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../features/tasks/taskSlice';
import { toast } from 'react-toastify';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      case 'low':
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const onDelete = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task._id))
        .unwrap()
        .then(() => {
          toast.success('Task deleted successfully');
        })
        .catch((error) => {
          toast.error(error || 'Failed to delete task');
        });
    }
  };

  return (
    <Link
      to={`/tasks/${task._id}`}
      className="block hover:bg-gray-50 transition-colors duration-150"
    >
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-sm font-medium text-primary-600 truncate">
              {task.title}
            </p>
            <div className="ml-2 flex-shrink-0 flex">
              <p
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                  task.status
                )}`}
              >
                {task.status}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityBadge(
                task.priority
              )}`}
            >
              {task.priority}
            </span>
            <div className="flex space-x-2">
              <Link
                to={`/tasks/edit/${task._id}`}
                onClick={(e) => e.stopPropagation()}
                className="text-gray-400 hover:text-primary-600"
                title="Edit Task"
              >
                <FaEdit />
              </Link>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(e);
                }}
                className="text-gray-400 hover:text-red-600"
                title="Delete Task"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-2 sm:flex sm:justify-between">
          <div className="sm:flex">
            <p className="flex items-center text-sm text-gray-500">
              {task.description && task.description.length > 100
                ? `${task.description.substring(0, 100)}...`
                : task.description}
            </p>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
            <p>
              Due{' '}
              {task.dueDate
                ? format(new Date(task.dueDate), 'MMM d, yyyy')
                : 'No due date'}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TaskItem;
