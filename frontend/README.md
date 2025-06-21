# TaskFlow - Task Management Frontend

A modern, responsive task management application built with React, Redux Toolkit, and Tailwind CSS.

## Features

- User authentication (login/register)
- Create, read, update, and delete tasks
- Filter and sort tasks by status, priority, and due date
- Responsive design that works on all devices
- Real-time updates with Redux
- Form validation and error handling
- Clean and intuitive user interface

## Technologies Used

- React 18
- React Router 6
- Redux Toolkit
- Tailwind CSS
- Axios for API requests
- React Icons
- React Toastify for notifications
- Date-fns for date formatting

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API server (see backend README for setup)

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd task-management/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Environment Variables

Create a `.env` file in the root of the frontend directory with the following variables:

```
VITE_API_URL=http://localhost:5000/api
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                  # Redux store configuration
├── assets/               # Static assets
├── components/           # Reusable UI components
│   ├── common/           # Common components (buttons, inputs, etc.)
│   └── tasks/           # Task-related components
├── features/             # Feature modules
│   ├── auth/            # Authentication logic
│   └── tasks/           # Task management logic
├── pages/                # Page components
├── App.jsx               # Main application component
└── main.jsx              # Application entry point
```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
