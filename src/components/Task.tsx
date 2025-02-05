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
    if (priorityLevel <= 2) return "bg-rose-100/90 border-rose-300";
    if (priorityLevel <= 5) return "bg-yellow-100/50 border-yellow-200";
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
      <div className="font-semibold py-2">{task.title}</div>
      <div>
        {expanded ? task.description : task.description.length > 20 ? `${task.description.substring(0, 20)}...` : task.description}
      </div>
      <div className="flex justify-between">
        <div className="py-2">Deadline: {formatDeadline(task.deadline)}</div>
        <div>
          <button 
            onClick={() => deleteTask(task.id)}
            className="bg-indigo-900 text-white px-2 py-1 rounded ml-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Export the Task component as the default export
export default Task;