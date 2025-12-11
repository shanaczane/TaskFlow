import { useState } from "react";

function LeftSideBar({
  categories,
  tasks,
  currentView,
  onSelectView,
  onAddCategory,
  onDeleteCategory, // New prop
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
    <div style={{ width: "250px", padding: "20px", borderRight: "1px solid #ddd" }}>
      {/* Top: Quick views with visible colors */}
      <button
        onClick={() => onSelectView("Today")}
        style={{
          display: "block",
          width: "100%",
          textAlign: "left",
          background: currentView === "Today" ? "#ddd" : "#f0f0f0", // Light gray for visibility
          color: "#000", // Black text always
          padding: "10px",
          marginBottom: "5px",
          border: "none",
          cursor: "pointer",
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
          background: currentView === "Important" ? "#ddd" : "#f0f0f0",
          color: "#000",
          padding: "10px",
          marginBottom: "5px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Important ({importantCount})
      </button>

      {/* Bottom: My Tasks */}
      <h3>My Tasks</h3>
      {categories.map((cat) => (
        <div key={cat} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
          <button
            onClick={() => onSelectView(cat)}
            style={{
              flex: 1,
              textAlign: "left",
              color: getCategoryColor(cat),
              background: currentView === cat ? "#ddd" : "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            # {cat} ({tasks.filter((task) => task.category === cat).length})
          </button>
          <button
            onClick={() => onDeleteCategory(cat)}
            style={{ marginLeft: "10px", color: "red", border: "none", cursor: "pointer" }}
          >
            x
          </button>
        </div>
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
    // Add more 
  };
  return colors[cat] || "black";
}

export default LeftSideBar;