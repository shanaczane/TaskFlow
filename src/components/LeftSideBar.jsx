// src/components/LeftSidebar.jsx
import { useState } from "react";

function LeftSideBar({
  categories,
  tasks,
  currentView,
  onSelectView,
  onAddCategory,
  isDarkMode,
}) {
  const [newCategory, setNewCategory] = useState("");

  const todayCount = tasks.filter(
    (task) => task.date === new Date().toISOString().split("T")[0]
  ).length;
  const importantCount = tasks.filter((task) => task.important).length;

  const handleAdd = () => {
    onAddCategory(newCategory);
    setNewCategory("");
  };

  return (
    <div
      style={{
        width: "250px",
        padding: "20px",
        borderRight: "1px solid #ddd",
        backgroundColor: isDarkMode ? "#1e1e1e" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
      }}
    >
      {/* Top: Quick views */}
      <button
        onClick={() => onSelectView("Today")}
        style={{
          display: "block",
          width: "100%",
          textAlign: "left",
          background: currentView === "Today" ? (isDarkMode ? "#333" : "#eee") : "transparent",
        }}
      >
        Today ({todayCount})
      </button>
      <button
        onClick={() => onSelectView("Important")}
        style={{
          display: "block",
          width: "100%",
          textAlign: "left",
          background: currentView === "Important" ? (isDarkMode ? "#333" : "#eee") : "transparent",
        }}
      >
        Important ({importantCount})
      </button>

      {/* Bottom: My Tasks */}
      <h3>My Tasks</h3>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelectView(cat)}
          style={{
            display: "block",
            width: "100%",
            textAlign: "left",
            color: getCategoryColor(cat), 
            background: currentView === cat ? (isDarkMode ? "#333" : "#eee") : "transparent",
          }}
        >
          # {cat} ({tasks.filter((task) => task.category === cat).length})
        </button>
      ))}
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="New category"
      />
      <button onClick={handleAdd}>+</button>
    </div>
  );
}


function getCategoryColor(cat) {
  const colors = {
    Personal: "blue",
    Work: "green",
    Shopping: "orange",
    Education: "purple", 
  };
  return colors[cat] || "black";
}

export default LeftSideBar;