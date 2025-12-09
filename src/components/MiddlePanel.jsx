// src/components/MiddlePanel.jsx
function MiddlePanel({
  currentView,
  filteredTasks,
  inputValue,
  onChange,
  selectedCategory,
  setSelectedCategory,
  categories,
  onAddTask,
  onToggle,
  onDelete,
  onToggleImportant,
  isDarkMode,
}) {
  return (
    <div
      style={{
        flex: 1,
        padding: "20px",
        backgroundColor: isDarkMode ? "#121212" : "#f9f9f9",
        color: isDarkMode ? "#fff" : "#000",
      }}
    >
      <h2>{currentView}</h2>
      <input type="text" value={inputValue} onChange={onChange} placeholder="+ Add Task" />
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button onClick={onAddTask}>Add</button>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id} style={{ listStyle: "none", margin: "10px 0" }}>
            <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "gray" : (isDarkMode ? "#fff" : "#000"),
              }}
            >
              {task.text}
            </span>
            <small style={{ color: "gray" }}>({task.date})</small>
            <button onClick={() => onToggleImportant(task.id)}>
              {task.important ? "★" : "☆"} {/* Star for important */}
            </button>
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MiddlePanel;