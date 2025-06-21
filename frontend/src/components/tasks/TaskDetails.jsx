import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import Spinner from '../Spinner';
import { getTask, deleteTask, reset as resetTask } from '../../features/tasks/taskSlice';

const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { task, isLoading, isError, message } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTask(taskId));

    return () => {
      dispatch(resetTask());
    };
  }, [taskId, isError, message, dispatch]);

  const onDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(taskId))
        .unwrap()
        .then(() => {
          toast.success('Task deleted successfully');
          navigate('/tasks');
        })
        .catch((error) => {
          toast.error(error || 'Failed to delete task');
        });
    }
  };

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

  if (isLoading) {
    return <Spinner />;
  }

  if (!task) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Task not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          <span>Back to Tasks</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 leading-7 sm:truncate">
              {task.title}
            </h1>
            <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(task.status)}`}>
                  {task.status}
                </span>
                <span className="mx-2">•</span>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityBadge(task.priority)}`}>
                  {task.priority} priority
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex-shrink-0 flex space-x-3 sm:mt-0">
            <Link
              to={`/tasks/edit/${task._id}`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <FaEdit className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
              Edit
            </Link>
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <FaTrash className="-ml-1 mr-2 h-5 w-5" />
              Delete
            </button>
          </div>
        </div>

        <div className="px-6 py-5">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              {task.description ? (
                <p className="text-gray-700 whitespace-pre-line">{task.description}</p>
              ) : (
                <p className="text-gray-500 italic">No description provided</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Details</h3>
              <div className="bg-white border border-gray-200 rounded-md divide-y divide-gray-200">
                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(task.status)}`}>
                      {task.status}
                    </span>
                  </dd>
                </div>
                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 bg-gray-50">
                  <dt className="text-sm font-medium text-gray-500">Priority</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityBadge(task.priority)}`}>
                      {task.priority}
                    </span>
                  </dd>
                </div>
                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Due Date</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {task.dueDate ? (
                      format(new Date(task.dueDate), 'MMMM d, yyyy')
                    ) : (
                      <span className="text-gray-500">No due date</span>
                    )}
                  </dd>
                </div>
                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 bg-gray-50">
                  <dt className="text-sm font-medium text-gray-500">Created</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {format(new Date(task.createdAt), 'MMMM d, yyyy')}
                  </dd>
                </div>
                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {format(new Date(task.updatedAt), 'MMMM d, yyyy')}
                  </dd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
