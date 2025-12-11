// src/components/TaskItem.jsx

function TaskItem({
  task, 
  onToggle, 
  onDelete, 
  onToggleImportant, 
}) {
  return (
    <li key={task.id} style={{ listStyle: "none", margin: "10px 0" }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          color: task.completed ? "gray" : "black",
        }}
      >
        {task.text}
      </span>
      <small style={{ color: "gray" }}>({task.date})</small>
      <button onClick={() => onToggleImportant(task.id)}>
        {task.important ? "★" : "☆"} {/* Filled star if important */}
      </button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
}

export default TaskItem;