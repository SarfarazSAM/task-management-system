import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

// Create new task
const createTask = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTY5ZGFjYjJiZTQ3ZmE4N2U2YmViOCIsImlhdCI6MTc1MDUwNjk2NiwiZXhwIjoxNzUzMDk4OTY2fQ.xNPQOu-wBKnsWJ_eYIwasSou3qSz_L3xaSSN4EXHENw`,
    },
  };

  const response = await axios.post(API_URL, taskData, config);
  return response.data.data;
};

// Get user tasks
const getTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTY5ZGFjYjJiZTQ3ZmE4N2U2YmViOCIsImlhdCI6MTc1MDUwNjk2NiwiZXhwIjoxNzUzMDk4OTY2fQ.xNPQOu-wBKnsWJ_eYIwasSou3qSz_L3xaSSN4EXHENw`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data.data;
};

// Get single task
const getTask = async (taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTY5ZGFjYjJiZTQ3ZmE4N2U2YmViOCIsImlhdCI6MTc1MDUwNjk2NiwiZXhwIjoxNzUzMDk4OTY2fQ.xNPQOu-wBKnsWJ_eYIwasSou3qSz_L3xaSSN4EXHENw`,
    },
  };

  const response = await axios.get(`${API_URL}/${taskId}`, config);
  return response.data.data;
};

// Update task
const updateTask = async (taskId, taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTY5ZGFjYjJiZTQ3ZmE4N2U2YmViOCIsImlhdCI6MTc1MDUwNjk2NiwiZXhwIjoxNzUzMDk4OTY2fQ.xNPQOu-wBKnsWJ_eYIwasSou3qSz_L3xaSSN4EXHENw`,
    },
  };

  const response = await axios.put(`${API_URL}/${taskId}`, taskData, config);
  return response.data.data;
};

// Delete task
const deleteTask = async (taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTY5ZGFjYjJiZTQ3ZmE4N2U2YmViOCIsImlhdCI6MTc1MDUwNjk2NiwiZXhwIjoxNzUzMDk4OTY2fQ.xNPQOu-wBKnsWJ_eYIwasSou3qSz_L3xaSSN4EXHENw`,
    },
  };

  const response = await axios.delete(`${API_URL}/${taskId}`, config);
  return response.data.data._id;
};

// Get task statistics
const getTaskStats = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTY5ZGFjYjJiZTQ3ZmE4N2U2YmViOCIsImlhdCI6MTc1MDUwNjk2NiwiZXhwIjoxNzUzMDk4OTY2fQ.xNPQOu-wBKnsWJ_eYIwasSou3qSz_L3xaSSN4EXHENw`,
    },
  };

  const response = await axios.get(`${API_URL}/stats`, config);
  return response.data.data;
};

const taskService = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  getTaskStats,
};

export default taskService;
