// Import necessary hooks from React
import { useState } from "react";

// Define the props interface for TaskForm
interface TaskFormProps {
  addTask: (title: string, description: string, deadline: string) => void;
}

const TaskForm = ({ addTask }: TaskFormProps) => {
  // Define state variables for form fields and error message
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState<string>("");

  // Handle form submission
  const handleSubmit = () => {
    // Validate form fields
    if (!title || !description || !deadline) {
      setError('All fields are required!')
      return;
    }

    // Add the task and reset form fields
    addTask(title, description, deadline);
    setTitle("");
    setDescription("");
    setDeadline("");
    setError("");
  };

  return (
    // Form container with flex layout
    <div className="flex justify-center p-4 w-full">
      <div className="flex flex-col lg:flex-row gap-4 p-4 bg-white rounded-lg shadow-md w-full max-w-5xl">
        <div className="flex flex-col flex-2">
          <input 
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`border p-2 rounded-md ${error && !title ? "border-red-500" : "border-gray-300"}`}
          />
          {error && !title && <span className="text-red-500 text-sm">Title is required</span>}
        </div>
        <div className="flex flex-col flex-3">
          <input 
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`border p-2 rounded-md ${error && !description ? "border-red-500" : "border-gray-300"}`}
          />
          {error && !description && <span className="text-red-500 text-sm">Description is required</span>}
        </div>
        <div className="flex flex-col flex-1">
          <input 
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className={`border p-2 rounded-md ${error && !deadline ? "border-red-500" : "border-gray-300"}`}
            min={new Date().toISOString().split('T')[0]}
          />
          {error && !deadline && <span className="text-red-500 text-sm">Deadline is required</span>}
        </div>
        <button 
          onClick={handleSubmit}
          className="bg-indigo-900 text-white px-4 py-2 rounded-md shadow-md hover:bg-purple-600"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
