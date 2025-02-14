// Import necessary hooks and types
import { useEffect, useState } from "react";
import { Task, statuses } from "./types";

export const useTasks = () => {
  // Initialize tasks state with saved tasks from localStorage or an empty array
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Save tasks to localStorage whenever the tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  
  // Add a new task
  const addTask = (title: string, description: string, deadline: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      status: "todo",
      deadline,
    };

    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  // Update an existing task
  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  // Delete a task
  const deleteTask = (taskId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (confirmed) {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return updatedTasks;
      });
    }
  };

  return {
    tasks,
    updateTask,
    addTask,
    deleteTask,
    // Group tasks by their status
    columns: statuses.map((status) => ({
      title: status,
      tasks: tasks.filter((task) => task.status === status),
    })),
  };
};
