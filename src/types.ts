// Define the possible statuses for a task
export type Status = "todo" | "in-progress" | "done";

// Define the structure of a Task object
export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  deadline: string;
}

// List of all possible statuses
export const statuses: Status[] = ["todo", "in-progress", "done"];