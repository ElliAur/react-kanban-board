// Import necessary hooks and types
import type { Task } from "../types";
import { useState } from "react";
// import { useTasks } from "../useTaskManager";

interface TaskProps {
  task: Task;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
}

const Task = ({ task, updateTask, deleteTask }: TaskProps) => {
  // State variables for task expansion and editing
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedDeadline, setEditedDeadline] = useState(task.deadline);

  const [error, setError] = useState<string>("");

  // Handle save button click
  const handleSave = () => {
    if (!editedTitle || !editedDescription || !editedDeadline) {
      setError('All fields are required!')
      return;
    }
    updateTask(task.id, {
      title: editedTitle,
      description: editedDescription,
      deadline: editedDeadline,
    });
    setEditing(false); // Exit editing mode
    setError("");
  };

  // Format the deadline to dd-mm-yyyy format for display purposes
  const formatDeadline = (deadline: string): string => {
    const date = new Date(deadline);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Function to get the priority color based on deadline and status
  const getPriorityColor = (deadline: string, status: string): string => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const timeDiff = deadlineDate.getTime() - today.getTime();
    const priorityLevel = Math.floor(timeDiff / (1000 * 3600 * 24));
  
    if (status === "done") return "bg-gray-300 border-gray-400";
    if (priorityLevel <= 1) return "bg-rose-100/90 border-rose-300";
    if (priorityLevel <= 3) return "bg-yellow-100/50 border-yellow-200";
    return "bg-teal-100/50 border-teal-200";
  };
  const priorityColor = getPriorityColor(task.deadline, task.status);

  return (
    <div 
      draggable={!editing} // Allow task to be draggable if not editing
      onDragStart={(e) => {
        // Set the task id when drag starts
        e.dataTransfer.setData("id", task.id);
      }}
      className={`border-8 rounded-lg px-2 m-2 text-2xl text-indigo-950 ${priorityColor}`}
    >
      <div 
        className="flex justify-between items-center">
        <div 
          className="flex w-full"
          // Toggle to expanded/collapsed view when clicked if not in editing mode
          onClick={() => !editing && setExpanded(!expanded)}>
          {/* Arrow button */}
          <button
          className="mr-3">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-6 w-6 transform ${expanded ? 'rotate-90' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {/* Arrow button end */}
          <div className="flex flex-col w-full text-2xl p-1">
            {/* Editable task fields */}
            {editing ? ( // When in editing mode
              <>
                <input // Title input field
                  type="text"
                  className={`border p-1 rounded font-semibold bg-slate-50 
                    ${error && !editedTitle ? "border-red-500" : "border-gray-300"
                  }`}
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                {error && !editedTitle && <span className="text-red-500 text-sm">Title is required</span>}
                <textarea // Description input field
                  className={`border p-1 rounded mt-2 bg-slate-50 resize-none ${
                    error && !editedDescription ? "border-red-500" : "border-gray-300"
                  }`}
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
                {error && !editedDescription && <span className="text-red-500 text-sm">Description is required</span>}
                <input // Date input field
                  type="date"
                  className={`border p-1 rounded mt-2 bg-slate-50 ${
                    error && !editedDeadline ? "border-red-500" : "border-gray-300"
                  }`}
                  value={editedDeadline}
                  onChange={(e) => setEditedDeadline(e.target.value)}
                  min={new Date().toISOString().split('T')[0]} // Prevents past dates
                />
                {error && !editedDeadline && <span className="text-red-500 text-sm">Deadline is required</span>}
              </>
            ) : (
              <>
                {/* Display task details when not editing */}
                <div className="font-semibold py-2">{task.title}</div>
                {expanded && ( // If not expanded only title is shown
                  <>
                    <div>{task.description}</div>
                    <div className="py-2">Deadline: {formatDeadline(task.deadline)}</div>
                  </>
                )}
              </>
            )}
            {/* Editable fields end */}
          </div>
        </div>

      {/* Buttons to toggle between edit/save & delete button */}
      <div className={`flex ${expanded || editing ? 'flex-col' : 'flex-row'}`}>
        {/* Show Save button when in editing mode */}
        {editing ? (
          <button
            onClick={handleSave}
            className="bg-indigo-900 hover:bg-emerald-500 text-white px-2 py-1 rounded m-2"
          >
            Save
          </button>
        ) : (
          // Show Edit button when not in editing mode
          <button
            onClick={() => setEditing(true)}
            className="bg-indigo-900 hover:bg-emerald-500 text-white px-2 py-1 rounded m-2"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-7 w-7" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={3} 
                d="M12 20h9M16.5 3.5a2.121 2.121 0 113 3L7 19.5 3 21l1.5-4L16.5 3.5z" />
            </svg>
          </button>
          )}
        {/* Edit/Save button end */}
        {/* Delete task button */}
        <button
          onClick={() => deleteTask(task.id)}
          className="bg-indigo-900 hover:bg-red-500 text-white px-2 py-1 rounded m-2 flex justify-center"
          >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-7 w-7" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {/* Delete task button end */}
      </div>
      </div>
    </div>
  );
};

export default Task;