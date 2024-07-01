import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../styles/index.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  const handleDelete = (taskToDelete) => {
    setTasks(tasks.filter((t) => t !== taskToDelete));
  };

  return (
    <div className="container">
      <h1>Lista de Tareas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={handleInputChange}
          placeholder="Agregar una tarea"
          required
        />
        <button type="submit">Agregar</button>
      </form>
      <ul>
        {tasks.length === 0 ? (
          <li className="no-tasks">No hay tareas, añadir tareas</li>
        ) : (
          tasks.map((task, index) => (
            <li key={index}>
              {task}
              <button
                className="delete-button"
                onClick={() => handleDelete(task)}
              >
                X
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}


ReactDOM.render(<App />, document.getElementById("app"));

