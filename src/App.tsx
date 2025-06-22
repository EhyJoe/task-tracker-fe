import React, { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

interface TaskType {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    axios
      .post("https://b89b-102-89-68-159.ngrok-free.app/tasks", {
        title: newTask,
      })
      .then(() => {
        setNewTask("");
        getAllTask();
      });
  };

  const removeTask = (id: number) => {
    axios
      .delete("https://b89b-102-89-68-159.ngrok-free.app/tasks/" + id)
      .then(() => {
        getAllTask();
      });
  };

  const getAllTask = () => {
    axios
      .get("https://b89b-102-89-68-159.ngrok-free.app/tasks/all", {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      })
      .then((tasks) => {
        setTasks(tasks.data);
      });
  };
  useEffect(() => {
    getAllTask();
  }, []);

  return (
    <div id="body">
      <h1>Task Tracker</h1>
      <div id="input-wrapper">
        <input
          id="task-input"
          type="text"
          placeholder="Enter a new task"
          value={newTask}
          onChange={handleChange}
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
              <span>{task.title}</span>
            </div>
            <button id="del" onClick={()=>removeTask(task.id)}>
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
