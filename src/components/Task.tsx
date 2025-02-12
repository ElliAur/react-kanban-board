// Import necessary hooks and types
import type { Task } from "../types";
import { useState } from "react";
import { useTasks } from "../useTaskManager";

interface TaskProps {
  task: Task;
  deleteTask: (taskId: string) => void;
}

const Task = ({ task, deleteTask }: TaskProps) => {
  // State to manage the expanded view of the task
  const [expanded, setExpanded] = useState(false);
  const { formatDeadline } = useTasks();

  // Calculate the priority level based on the deadline
  const calculatePriority = (deadline: string): number => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const timeDiff = deadlineDate.getTime() - today.getTime();
    const priorityLevel = Math.floor(timeDiff / (1000 * 3600 * 24));
    return priorityLevel;
  }
  const priorityLevel = calculatePriority(task.deadline);

  // Determine the priority color based on the priority level and status
  const priorityColor = (): string => {
    if (task.status === "done") return "bg-gray-300 border-gray-400";
    if (priorityLevel <= 1) return "bg-rose-100/90 border-rose-300";
    if (priorityLevel <= 3) return "bg-yellow-100/50 border-yellow-200";
    return "bg-teal-100/50 border-teal-200";
  }

  return (
    <div 
      draggable 
      onDragStart={(e) => {
        e.dataTransfer.setData("id", task.id);
      }}
      className={`border-8 rounded-lg px-2 m-2 text-2xl text-indigo-950 ${priorityColor()}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex justify-between">
        <div className="flex">
          <button
          onClick={() => setExpanded(!expanded)}
          className="mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transform ${expanded ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="flex flex-col">
            <div className="font-semibold py-2">{task.title}</div>
            {expanded && (
              <>
            <div>{task.description}</div>
            <div className="py-2">Deadline: {formatDeadline(task.deadline)}</div>
              </>
            )}
          </div>
        </div>
      <div className="flex flex-col self-end p-2">
        <button 
          onClick={() => deleteTask(task.id)}
          className="bg-indigo-900 hover:bg-red-500 text-white px-2 py-1 rounded ml-2"
          >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      </div>
    </div>
  );
};

// Export the Task component as the default export
export default Task;