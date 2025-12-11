import TaskItem from "./TaskItem";

function MiddlePanel({
  currentView,
  filteredTasks,
  inputValue,
  setInputValue,
  selectedCategory,
  setSelectedCategory,
  categories,
  onAddTask,
  onToggleTask,
  onDeleteTask,
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
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="+ Add Task"
        style={{
          marginRight: "10px",
          padding: "5px",
          backgroundColor: isDarkMode ? "#333" : "#fff",
          color: isDarkMode ? "#fff" : "#000",
        }}
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{
          marginRight: "10px",
          padding: "5px",
          backgroundColor: isDarkMode ? "#333" : "#fff",
          color: isDarkMode ? "#fff" : "#000",
        }}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button
        onClick={onAddTask}
        style={{
          padding: "5px 10px",
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Add
      </button>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggleTask}
            onDelete={onDeleteTask}
            onToggleImportant={onToggleImportant}
          />
        ))}
      </ul>
    </div>
  );
}

export default MiddlePanel;