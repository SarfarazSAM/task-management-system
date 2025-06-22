import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import { FaArrowLeft } from 'react-icons/fa';
import { useTaskStore } from '../../store';
import Spinner from '../Spinner';

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'pending',
    priority: 'medium',
  });

  const { title, description, dueDate, status, priority } = formData;
  const { taskId } = useParams();
  const navigate = useNavigate();
  
  const { 
    currentTask, 
    loading, 
    error, 
    getTask, 
    createTask, 
    updateTask 
  } = useTaskStore();

  // Fetch task if in edit mode
  useEffect(() => {
    const fetchTask = async () => {
      if (taskId) {
        try {
          await getTask(taskId);
        } catch (error) {
          toast.error('Failed to fetch task');
          navigate('/tasks');
        }
      }
    };

    fetchTask();
  }, [taskId, getTask, navigate]);

  // Update form data when currentTask changes
  useEffect(() => {
    if (taskId && currentTask) {
      setFormData({
        title: currentTask.title,
        description: currentTask.description || '',
        dueDate: currentTask.dueDate 
          ? format(parseISO(currentTask.dueDate), 'yyyy-MM-dd') 
          : '',
        status: currentTask.status,
        priority: currentTask.priority,
      });
    }
  }, [currentTask, taskId]);

  // Handle form field changes
  const onChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      dueDate: dueDate || null,
      status,
      priority,
    };

    try {
      if (taskId) {
        await updateTask({ taskId, taskData });
        toast.success('Task updated successfully');
      } else {
        await createTask(taskData);
        toast.success('Task created successfully');
      }
      navigate('/tasks');
    } catch (error) {
      toast.error(error || 'Something went wrong');
    }
  };

  if (loading && taskId) {
    return <Spinner />;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          <span>Back to Tasks</span>
        </button>
        <h1 className="mt-2 text-2xl font-bold text-gray-900">
          {taskId ? 'Edit Task' : 'Create New Task'}
        </h1>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <form onSubmit={onSubmit} className="px-4 py-5 sm:p-6">
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={onChange}
                  className="form-input block w-full"
                  placeholder="Enter task title"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="form-input block w-full"
                  value={description}
                  onChange={onChange}
                  placeholder="Enter task description"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                  Due Date
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={dueDate}
                    onChange={onChange}
                    className="form-input block w-full"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <div className="mt-1">
                  <select
                    id="status"
                    name="status"
                    value={status}
                    onChange={onChange}
                    className="form-select block w-full"
                  >
                    <option value="pending">Pending</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                  Priority
                </label>
                <div className="mt-1">
                  <select
                    id="priority"
                    name="priority"
                    value={priority}
                    onChange={onChange}
                    className="form-select block w-full"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6 space-x-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn btn-secondary"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {taskId ? 'Updating...' : 'Creating...'}
                  </>
                ) : taskId ? (
                  'Update Task'
                ) : (
                  'Create Task'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
