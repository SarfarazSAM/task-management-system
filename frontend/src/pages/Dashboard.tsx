import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaPlus } from "react-icons/fa";
import { useTaskStore } from "../store";
import Spinner from "../components/Spinner";
import TaskFilter from "../components/tasks/TaskFilter";
import TaskItem from "../components/tasks/TaskItem";

const Dashboard = () => {
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    sort: "-createdAt",
  });

  const { tasks, loading, error, getTasks } = useTaskStore();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        await getTasks(filters);
        console.log(tasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, [filters, getTasks]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
          My Tasks
        </h1>
        <Link
          to="/tasks/new"
          className="btn btn-primary inline-flex items-center justify-center space-x-2 w-full md:w-auto"
        >
          <FaPlus className="h-4 w-4" />
          <span>Add Task</span>
        </Link>
      </div>

      <TaskFilter onFilterChange={handleFilterChange} filters={filters} />

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {tasks?.length > 0 ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {tasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No tasks</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new task.
          </p>
          <div className="mt-6">
            <Link
              to="/tasks/new"
              className="btn btn-primary inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <FaPlus className="-ml-1 mr-2 h-5 w-5" />
              New Task
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
