import { useState, useEffect } from "react";

export default function TaskForm({ onSubmit, initialTask, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || "");
      setDescription(initialTask.description || "");
      setDueDate(initialTask.due_date || "");
    }
  }, [initialTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, due_date: dueDate });
    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <div>
        <button type="submit">{initialTask ? "Update Task" : "Add Task"}</button>

        {initialTask && (
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
