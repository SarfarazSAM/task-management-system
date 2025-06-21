import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { FaArrowLeft } from 'react-icons/fa';
import Spinner from '../Spinner';
import {
  createTask,
  updateTask,
  getTask,
  reset as resetTask,
} from '../../features/tasks/taskSlice';

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
  const dispatch = useDispatch();

  const { task, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    if (taskId) {
      dispatch(getTask(taskId));
    } else {
      dispatch(resetTask());
    }
  }, [taskId, dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      navigate('/tasks');
      toast.success(taskId ? 'Task updated' : 'Task created');
    }

    if (task && taskId) {
      setFormData({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd') : '',
        status: task.status,
        priority: task.priority,
      });
    }
  }, [task, taskId, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      dueDate,
      status,
      priority,
    };

    if (taskId) {
      dispatch(updateTask({ taskId, taskData }));
    } else {
      dispatch(createTask(taskData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          <span>Back to Tasks</span>
        </button>
        <h1 className="text-2xl font-bold text-gray-800 mt-2">
          {taskId ? 'Edit Task' : 'Create New Task'}
        </h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={onChange}
              placeholder="Enter task title"
              className="form-input"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={onChange}
              rows="4"
              placeholder="Enter task description"
              className="form-input"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={dueDate}
                onChange={onChange}
                className="form-input"
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={onChange}
                className="form-input"
              >
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={priority}
                onChange={onChange}
                className="form-input"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="btn btn-primary w-full md:w-auto px-8"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : taskId ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
