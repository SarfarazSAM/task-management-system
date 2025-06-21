import { FaFilter, FaSort } from 'react-icons/fa';

const TaskFilter = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    onFilterChange({ [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-1 flex items-center"
          >
            <FaFilter className="mr-2" /> Status
          </label>
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="form-input w-full"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-700 mb-1 flex items-center"
          >
            <FaFilter className="mr-2" /> Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={filters.priority}
            onChange={handleChange}
            className="form-input w-full"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="sort"
            className="block text-sm font-medium text-gray-700 mb-1 flex items-center"
          >
            <FaSort className="mr-2" /> Sort By
          </label>
          <select
            id="sort"
            name="sort"
            value={filters.sort}
            onChange={handleChange}
            className="form-input w-full"
          >
            <option value="-createdAt">Newest First</option>
            <option value="createdAt">Oldest First</option>
            <option value="dueDate">Due Date (Ascending)</option>
            <option value="-dueDate">Due Date (Descending)</option>
            <option value="priority">Priority (Low to High)</option>
            <option value="-priority">Priority (High to Low)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;
