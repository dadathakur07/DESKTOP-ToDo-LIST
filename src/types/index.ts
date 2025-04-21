
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: TaskPriority;
  category: string;
  dueDate?: Date;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}
