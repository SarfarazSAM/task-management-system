import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import useAuthStore from "./authStore";

const API_URL = import.meta.env.VITE_API_URL;

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface TaskStore {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  totalTasks: number;
  stats: Record<string, any>;
  getTasks: (filters?: Record<string, any>) => Promise<Task[]>;
  getTask: (taskId: string) => Promise<Task>;
  createTask: (taskData: Task) => Promise<Task>;
  updateTask: ({
    taskId,
    taskData,
  }: {
    taskId: string;
    taskData: Task;
  }) => Promise<Task>;
  deleteTask: (taskId: string) => Promise<boolean>;
  getTaskStats: () => Promise<Record<string, any>>;
  resetCurrentTask: () => void;
  clearError: () => void;
}

const config = {
  headers: {
    Authorization: `Bearer ${useAuthStore.getState().token}`,
  },
};

const taskStore = (set: any, get: any) => ({
  tasks: [],
  currentTask: null,
  loading: false,
  error: null,
  totalTasks: 0,
  stats: {},

  // Get all tasks with optional filters
  getTasks: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(`${API_URL}/tasks`, config);
      console.log(data.data);
      set({
        tasks: data.data,
        totalTasks: data.count,
        loading: false,
      });
      return data.tasks;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }, any>;
      const message =
        axiosError.response?.data?.message || "Failed to fetch tasks";
      set({ error: message, loading: false });
      toast.error(message);
      throw error;
    }
  },

  // Get a single task by ID
  getTask: async (taskId: string) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(`${API_URL}/tasks/${taskId}`, config);
      console.log(data);
      set({
        currentTask: data.data,
        loading: false,
      });
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch task";
      set({ error: message, loading: false });
      toast.error(message);
      throw error;
    }
  },

  // Create a new task
  createTask: async (taskData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post(`${API_URL}/tasks`, taskData, config);
      set((state) => ({
        tasks: [data, ...state.tasks],
        totalTasks: state.totalTasks + 1,
        loading: false,
      }));
      toast.success("Task created successfully");
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to create task";
      set({ error: message, loading: false });
      toast.error(message);
      throw error;
    }
  },

  // Update an existing task
  updateTask: async ({ taskId, taskData }) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.put(`${API_URL}/tasks/${taskId}`, taskData, config);

      set((state) => ({
        tasks: state.tasks.map((task) =>
          task._id === taskId ? { ...task, ...data } : task
        ),
        currentTask: data,
        loading: false,
      }));

      toast.success("Task updated successfully");
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update task";
      set({ error: message, loading: false });
      toast.error(message);
      throw error;
    }
  },

  // Delete a task
  deleteTask: async (taskId) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`, config);

      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== taskId),
        totalTasks: state.totalTasks - 1,
        loading: false,
      }));

      toast.success("Task deleted successfully");
      return true;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete task";
      set({ error: message, loading: false });
      toast.error(message);
      throw error;
    }
  },

  // Get task statistics
  getTaskStats: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(`${API_URL}/tasks/stats`, config);
      set({
        stats: data,
        loading: false,
      });
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch task stats";
      set({ error: message, loading: false });
      toast.error(message);
      throw error;
    }
  },

  // Reset current task
  resetCurrentTask: () => {
    set({ currentTask: null });
  },

  // Clear errors
  clearError: () => {
    set({ error: null });
  },
});

const useTaskStore = create<TaskStore>((set, get) => taskStore(set, get));

export default useTaskStore;
