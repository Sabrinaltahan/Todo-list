import { useEffect, useState } from "react";
import { api } from "./api/client";
import type { Todo, TodoStatus } from "./types/todo";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTodos = async () => {
    setError(null);
    setLoading(true);

    try {
      const data = await api<Todo[]>("/todos");
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const createTodo = async (data: Omit<Todo, "id">) => {
    const created = await api<Todo>("/todos", {
      method: "POST",
      body: JSON.stringify(data),
    });
    setTodos((prev) => [created, ...prev]);
  };

  const deleteTodo = async (id: number) => {
    await api<void>(`/todos/${id}`, { method: "DELETE" });
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const changeStatus = async (id: number, status: TodoStatus) => {
    const updated = await api<Todo>(`/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <h1>Todo App (React + TS)</h1>

      <TodoForm onCreate={createTodo} />

      {loading && <p>Laddar...</p>}

      {error && (
        <p style={{ color: "crimson" }}>
          {error} <button onClick={loadTodos}>Försök igen</button>
        </p>
      )}

      {!loading && !error && (
        <TodoList todos={todos} onDelete={deleteTodo} onChangeStatus={changeStatus} />
      )}
    </div>
  );
}