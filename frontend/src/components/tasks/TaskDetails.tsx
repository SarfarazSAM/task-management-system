import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import { FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { useTaskStore } from '../../store';
import Spinner from '../Spinner';

const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  
  const { 
    currentTask: task, 
    loading, 
    error, 
    getTask, 
    deleteTask 
  } = useTaskStore();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        await getTask(taskId);
      } catch (error) {
        toast.error('Failed to fetch task');
        navigate('/tasks');
      }
    };

    fetchTask();
  }, [taskId, getTask, navigate]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        setIsDeleting(true);
        await deleteTask(taskId);
        toast.success('Task deleted successfully');
        navigate('/tasks');
      } catch (error) {
        toast.error(error || 'Failed to delete task');
        setIsDeleting(false);
      }
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="sm:flex">
            <p className="text-4xl font-bold text-primary-600 sm:text-5xl">404</p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl">
                  Task not found
                </h1>
                <p className="mt-1 text-base text-gray-500">
                  The task you're looking for doesn't exist or has been moved.
                </p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <Link
                  to="/tasks"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Back to Tasks
                </Link>
                <Link
                  to="/tasks/new"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Create New Task
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          to="/tasks"
          className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          <span>Back to Tasks</span>
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
              <div className="mt-1 flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-1">
                <span>Created on {format(parseISO(task.createdAt), 'MMM d, yyyy')}</span>
                {task.dueDate && (
                  <span className="flex items-center">
                    <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-gray-400 mx-2"></span>
                    Due on {format(parseISO(task.dueDate), 'MMM d, yyyy')}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <Link
                to={`/tasks/edit/${task._id}`}
                className="btn btn-primary"
              >
                <FaEdit className="mr-1.5 h-4 w-4" />
                Edit
              </Link>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="btn btn-danger"
              >
                {isDeleting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </>
                ) : (
                  <>
                    <FaTrash className="mr-1.5 h-4 w-4" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              task.status === 'completed'
                ? 'bg-green-100 text-green-800'
                : task.status === 'in progress'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              task.priority === 'high'
                ? 'bg-red-100 text-red-800'
                : task.priority === 'medium'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800'
            }`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
            </span>
          </div>
        </div>

        <div className="px-4 sm:px-6 py-5">
          <div className="prose max-w-none">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Description</h3>
            {task.description ? (
              <div className="prose max-w-none">
                <p className="whitespace-pre-line text-gray-700">{task.description}</p>
              </div>
            ) : (
              <p className="text-gray-500 italic">No description provided.</p>
            )}
          </div>
        </div>

        <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <dt className="text-sm font-medium text-gray-500">Created</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {format(parseISO(task.createdAt), 'MMM d, yyyy h:mm a')}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {format(parseISO(task.updatedAt), 'MMM d, yyyy h:mm a')}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Due Date</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {task.dueDate ? (
                  format(parseISO(task.dueDate), 'MMM d, yyyy')
                ) : (
                  <span className="text-gray-500">No due date</span>
                )}
              </dd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
