// Import necessary types and components
import { Task } from "../types";
import TaskComponent from "./Task";

// Define the props interface for Column
interface ColumnProps {
  title: string;
  tasks: Task[];
  updateTask: (taskId: string, newStatus: Task['status']) => void;
  deleteTask: (taskId: string) => void;
}

const Column = ({ title, tasks, updateTask, deleteTask }: ColumnProps) => {
  
  // Handle the drop event for drag-and-drop functionality
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    updateTask(id, title as Task['status']);
  }

  return (
    // Column container with styling and drag-and-drop handlers
    <div className="bg-slate-50 rounded-2xl p-4 m-4 flex-1"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}>
      <h2 className="font-[Cherry_Bomb_One] tracking-widest text-3xl pb-4 uppercase text-center text-indigo-950">{title}</h2>
      {tasks.map((task) => (
        <TaskComponent key={task.id} task={task} deleteTask={deleteTask} />
      ))}    
    </div>
  );
};

// Export the Column component as the default export
export default Column;