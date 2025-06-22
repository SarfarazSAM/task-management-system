// User type
export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// Auth store state
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: { name: string; email: string; password: string }) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
  clearError: () => void;
}

// Task type
export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'in progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  // user: string;
}

// Task store state
export interface TaskState {
  tasks: Task[];
  currentTask: Task | null;
  loading: boolean;
  error: string | null;
  totalTasks: number;
  stats: Record<string, number>;
  getTasks: (filters?: Record<string, any>) => Promise<Task[]>;
  getTask: (id: string) => Promise<Task>;
  createTask: (taskData: Omit<Task, '_id' | 'createdAt' | 'updatedAt' | 'user'>) => Promise<Task>;
  updateTask: (id: string, taskData: Partial<Task>) => Promise<Task>;
  deleteTask: (id: string) => Promise<void>;
  getTaskStats: () => Promise<Record<string, number>>;
  resetCurrentTask: () => void;
  clearError: () => void;
}
