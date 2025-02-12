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

  // Format the deadline to dd-mm-yyyy format for display purposes
  const formatDeadline = (deadline: string): string => {
    const date = new Date(deadline);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Update the status of a task
  const updateTask = (taskId: string, newStatus: Task['status']) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  // Add a new task
  const addTask = (title: string, description: string, deadline: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      status: "todo",
      deadline, // Store the deadline in its original format
    };

    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
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
    formatDeadline, // Return the formatDeadline function for use in components
  };
};
