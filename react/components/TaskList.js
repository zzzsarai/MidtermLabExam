export default function TaskList({ tasks = [], onEdit, onDelete, onComplete }) {
  return (
    <div className="task-list">
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.status === "completed" ? "completed" : ""}>
            
            {/* LEFT SIDE INFO */}
            <div className="task-info">
              <strong>{task.title}</strong>

              {task.description && <span>{task.description}</span>}

              {task.due_date && (
                <span className="due">Due: {task.due_date}</span>
              )}
            </div>

            {/* RIGHT SIDE BUTTONS */}
            <div className="task-buttons">
              <button className="edit-btn" onClick={() => onEdit(task)}>Edit</button>
              <button className="delete-btn" onClick={() => onDelete(task.id)}>Delete</button>

              {task.status !== "completed" && (
                <button className="complete-btn" onClick={() => onComplete(task)}>
                  Complete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
