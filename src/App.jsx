import { useState } from "react";

//Create Input Box = done
//Create Button make that button add task to list = done
//display list of tasks = done
//add checkbox to list of task = done
//add delete button for each task = done
//make input clear after adding task = done

function App() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClick = () => {
    setTasks([
      ...tasks,
      { id: Date.now(), text: inputValue, completed: false },
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
      <input type="text" value={inputValue} onChange={handleChange} />
      <button onClick={handleClick}>Click Me</button>

      <ul>
        {tasks.map((task) => (
          <div key ={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(task.id)}
            />
            {task.text}
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
