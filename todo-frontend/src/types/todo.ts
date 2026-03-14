export type TodoStatus = "not_started" | "in_progress" | "done";

export type Todo = {
  id: number;
  title: string;
  description?: string;
  status: TodoStatus;
  deadline?: string;
};