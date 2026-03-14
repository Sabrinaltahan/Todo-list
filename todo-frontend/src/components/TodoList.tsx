import type { Todo, TodoStatus } from "../types/todo";

type Props = {
  todos: Todo[];
  onDelete: (id: number) => Promise<void>;
  onChangeStatus: (id: number, status: TodoStatus) => Promise<void>;
};

export default function TodoList({ todos, onDelete, onChangeStatus }: Props) {
  if (todos.length === 0) {
    return <p>Inga todos ännu.</p>;
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {todos.map((todo) => (
        <div
          key={todo.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 16,
          }}
        >
          <h3 style={{ marginTop: 0 }}>{todo.title}</h3>

          {todo.description && <p>{todo.description}</p>}

          <p>
            <strong>Status:</strong>{" "}
            {todo.status === "not_started"
              ? "Ej påbörjad"
              : todo.status === "in_progress"
              ? "Pågående"
              : "Avklarad"}
          </p>

          {todo.deadline && (
            <p>
              <strong>Deadline:</strong> {todo.deadline}
            </p>
          )}

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={() => onChangeStatus(todo.id, "not_started")}>Ej påbörjad</button>
            <button onClick={() => onChangeStatus(todo.id, "in_progress")}>Pågående</button>
            <button onClick={() => onChangeStatus(todo.id, "done")}>Avklarad</button>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}