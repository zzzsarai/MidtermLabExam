import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("list"); // "list" or "add"
  const [message, setMessage] = useState("");

  const loadTasks = () => {
    setLoading(true);
    fetch("http://localhost:8082/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAdd = (task) => {
    fetch("http://localhost:8082/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then(() => {
        setMessage("Task added successfully!");
        loadTasks();
        setActiveTab("list"); // Switch to list view after adding
        setTimeout(() => setMessage(""), 3000); // Clear message after 3s
      });
  };

  const handleEditSubmit = (task) => {
    fetch(`http://localhost:8082/api/tasks/${editingTask.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    }).then(() => {
      setEditingTask(null);
      setMessage("Task updated successfully!");
      loadTasks();
      setTimeout(() => setMessage(""), 3000);
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      fetch(`http://localhost:8082/api/tasks/${id}`, { method: "DELETE" }).then(() => {
        setMessage("Task deleted successfully!");
        loadTasks();
        setTimeout(() => setMessage(""), 3000);
      });
    }
  };

  const handleComplete = (task) => {
    fetch(`http://localhost:8082/api/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...task, status: "completed" }),
    }).then(() => {
      setMessage("Task marked as completed!");
      loadTasks();
      setTimeout(() => setMessage(""), 3000);
    });
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "list" ? "active" : ""}
          onClick={() => setActiveTab("list")}
        >
          View Tasks
        </button>
        <button
          className={activeTab === "add" ? "active" : ""}
          onClick={() => setActiveTab("add")}
        >
          Add Task
        </button>
      </div>

      {/* Validation/Success message */}
      {message && <div className="message">{message}</div>}

      {/* Tab content */}
      {activeTab === "add" && (
        <TaskForm
          onSubmit={editingTask ? handleEditSubmit : handleAdd}
          initialTask={editingTask}
          onCancel={() => setEditingTask(null)}
        />
      )}

      {activeTab === "list" && (
        <>
          {loading ? (
            <p>Loading tasks...</p>
          ) : (
            <TaskList
              tasks={tasks}
              onEdit={(task) => {
                setEditingTask(task);
                setActiveTab("add"); // Switch to form tab for editing
              }}
              onDelete={handleDelete}
              onComplete={handleComplete}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
