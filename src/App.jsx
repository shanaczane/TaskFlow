import { useEffect, useState } from "react";
import { loadFromLocalStorage, saveToLocalStorage } from "./utils/LocalStorage";
import LeftSidebar from "./components/LeftSideBar";
import MiddlePanel from "./components/MiddlePanel";
import RightSidebar from "./components/RightSidebar"; 

function App() {
  const [tasks, setTasks] = useState(() => loadFromLocalStorage("tasks", []));
  const [categories, setCategories] = useState(() =>
    loadFromLocalStorage("categories", ["Personal", "Work", "Shopping"])
  );
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Personal");
  const [currentView, setCurrentView] = useState("Today");
  const [isDarkMode, setIsDarkMode] = useState(() =>
    loadFromLocalStorage("theme", "light") === "dark"
  );

  useEffect(() => {
    saveToLocalStorage("tasks", tasks);
  }, [tasks]);

  useEffect(() => {
    saveToLocalStorage("categories", categories);
  }, [categories]);

  useEffect(() => {
    saveToLocalStorage("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const handleChange = (e) => setInputValue(e.target.value);

  const handleClick = () => {
    if (inputValue.trim() === "") return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: inputValue,
        completed: false,
        date: new Date().toISOString().split("T")[0],
        category: selectedCategory,
        important: false,
      },
    ]);
    setInputValue("");
  };

  const handleToggle = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id)); 
  };

  const handleToggleImportant = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, important: !task.important } : task
      )
    );
  };

  const handleAddCategory = (newCategory) => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  const handleDeleteCategory = (categoryToDelete) => {
    setCategories(categories.filter((cat) => cat !== categoryToDelete));
    
    setTasks(tasks.filter((task) => task.category !== categoryToDelete));
    
    if (currentView === categoryToDelete) {
      setCurrentView("Today");
    }
  };

  let filteredTasks = [];
  if (currentView === "Today") {
    const today = new Date().toISOString().split("T")[0];
    filteredTasks = (tasks || []).filter((task) => task.date === today);
  } else if (currentView === "Important") {
    filteredTasks = (tasks || []).filter((task) => task.important);
  } else {
    filteredTasks = (tasks || []).filter((task) => task.category === currentView);
  }

  return (
    <div
      data-theme={isDarkMode ? "dark" : "light"}
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: isDarkMode ? "#121212" : "#f9f9f9",
      }}
    >
      <LeftSidebar
        categories={categories}
        tasks={tasks}
        currentView={currentView}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
        onSelectView={setCurrentView}
      />
      <MiddlePanel
        currentView={currentView}
        filteredTasks={filteredTasks}
        inputValue={inputValue}
        setInputValue={setInputValue}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        onAddTask={handleClick}
        onToggleTask={handleToggle}
        onDeleteTask={handleDelete}
        onToggleImportant={handleToggleImportant}
      />
      <RightSidebar />
    </div>
  );
}

export default App;