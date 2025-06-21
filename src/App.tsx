import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<string[]>([
    "Buy Groceries",
    "Wake up early",
    "Go to class",
  ]);
  const [newTask, setNewTask] = useState<string>("");
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()]);
      setNewTask("");
    }
  };
  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div id="body">
      <h1>Task Tracker</h1>
      <div id='input-wrapper'>
        <input
          id="task-input"
          type="text"
          placeholder="Enter a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button id="add-button" onClick={addTask}>
          Add
        </button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <div>
              <input id="check" type="checkbox" />
              <span>{task}</span>
            </div>
            <button id="del" onClick={() => removeTask(index)}>
              {" "}
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
