import { useState } from "react";
import type { Todo, TodoStatus } from "../types/todo";

type Props = {
  onCreate: (todo: Omit<Todo, "id">) => Promise<void>;
};

export default function TodoForm({ onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TodoStatus>("not_started");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (title.trim().length < 3) {
      setError("Titel måste vara minst 3 tecken lång.");
      return;
    }

    if (description.length > 200) {
      setError("Beskrivning får max vara 200 tecken.");
      return;
    }

    setSubmitting(true);

    try {
      await onCreate({
        title: title.trim(),
        description: description.trim(),
        status,
        deadline,
      });

      setTitle("");
      setDescription("");
      setStatus("not_started");
      setDeadline("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create todo");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "grid",
        gap: 12,
        marginBottom: 24,
        padding: 16,
        border: "1px solid #ddd",
        borderRadius: 8,
      }}
    >
      <h2>Add Todo</h2>

      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={200}
          style={{ width: "100%", padding: 8, marginTop: 4, minHeight: 90 }}
        />
      </div>

      <div>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as TodoStatus)}
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        >
          <option value="not_started">Ej påbörjad</option>
          <option value="in_progress">Pågående</option>
          <option value="done">Avklarad</option>
        </select>
      </div>

      <div>
        <label htmlFor="deadline">Deadline</label>
        <input
          id="deadline"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        />
      </div>

      {error && <p style={{ color: "crimson", margin: 0 }}>{error}</p>}

      <button type="submit" disabled={submitting} style={{ padding: 10 }}>
        {submitting ? "Sparar..." : "Add Todo"}
      </button>
    </form>
  );
}