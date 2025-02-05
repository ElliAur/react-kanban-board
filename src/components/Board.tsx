// Import necessary components and hooks
import Column from "./Column";
import TaskForm from "./TaskForm";
import { useTasks } from "../useTaskManager";

const Board = () => {
  // Destructure task management functions and columns from the custom hook
  const { updateTask, addTask, deleteTask, columns } = useTasks();
  
  return (
    // Main board container
    <div className="flex flex-col h-full w-[80vw]">
      <div>
        <h1 className="font-[Cherry_Bomb_One] text-9xl p-8 text-center text-indigo-950">Kanban Board</h1>
      </div>
      <TaskForm addTask={addTask} />
      <div className="flex flex-1 overflow-y-auto">
        {columns.map((column) => (
          <Column 
            key={column.title} 
            title={column.title} 
            tasks={column.tasks} 
            updateTask={updateTask} 
            deleteTask={deleteTask} 
          />
        ))}
      </div>
    </div>
  );
};

// Export the Board component as the default export
export default Board;