import { useEffect, useState } from "react";

//prevent adding empty task = done
// make completed task look different (strikthrough/gray) = done
//add date to each task = done
// save tasks to localstorage = done

function App() {
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Personal");
  const [currentView, setCurrentView] = useState("Personal");

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClick = () => {
    if (inputValue.trim() === "") {
      return;
    }
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: inputValue,
        completed: false,
        date: new Date().toISOString().split("T")[0],
        category: selectedCategory,
      },
    ]);
    setInputValue("");
  };

  const handleToggle = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const handleDelete = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  return (
    <div>
      <div>
        <h3> My Tasks</h3>
        <button onClick={() => setCurrentView("Personal")}> Personal </button>
        <button onClick={() => setCurrentView("Work")}> Work </button>
        <button onClick={() => setCurrentView("Shopping")}> Shopping </button>
      </div>
      <input type="text" value={inputValue} onChange={handleChange} />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="Personal"> Personal </option>
        <option value="Work"> Work </option>
        <option value="Shopping"> Shopping </option>
      </select>

      <button onClick={handleClick}>Add Task</button>
      <ul>
        {tasks
          .filter((task) => task.category === currentView)
          .map((task) => (
            <div key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle(task.id)}
              />
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "gray" : "black",
                }}
              >
                {task.text}
              </span>
              <small>({task.date})</small>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          ))}
      </ul>
    </div>
  );
}

export default App;
