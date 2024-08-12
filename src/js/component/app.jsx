// App.jsx
import React, { useState, useEffect } from "react";

const API_URL = "https://playground.4geeks.com/todo";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [remainingTasks, setRemainingTasks] = useState(0);

  useEffect(() => {
    fetchTasksFromServer();
  }, []);

  useEffect(() => {
    updateRemainingTasks(tasks);
    syncTasksWithServer(tasks);
  }, [tasks]);

  const fetchTasksFromServer = () => {
    fetch(`${API_URL}/todos/jonathanavl`)
      .then(response => response.json())
      .then(data => {
        // Asegúrate de que data sea un array
        const tasksArray = Array.isArray(data) ? data : [];
        setTasks(tasksArray);
      })
      .catch(error => {
        console.error('Error:', error);
        setTasks([]); // En caso de error, establece un array vacío
      });
  };

  const syncTasksWithServer = (updatedTasks) => {
    fetch(`${API_URL}/todos/jonathanavl`, {
      method: "PUT",
      body: JSON.stringify(updatedTasks),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
      console.log(resp.ok);
      console.log(resp.status);
      console.log(resp.text());
      return resp.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
  };

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      const newTask = {
        id: Date.now(),
        label: task,
        done: false
      };
      setTasks(prevTasks => [...prevTasks, newTask]);
      setTask("");
    }
  };

  const handleDelete = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const handleClearAll = () => {
    setTasks([]);
  };

  const updateRemainingTasks = (updatedTasks) => {
    setRemainingTasks(updatedTasks.length);
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
          style={{ width: "100%" }}
        />
      </form>
      <ul>
        {tasks.length === 0 ? (
          <li className="no-tasks">No hay tareas, añadir tareas</li>
        ) : (
          tasks.map((task) => (
            <li key={task.id}>
              {task.label}
              <button
                className="delete-button"
                onClick={() => handleDelete(task.id)}
              >
                X
              </button>
            </li>
          ))
        )}
      </ul>
      <button className="limpiar" onClick={handleClearAll}>Limpiar todas las tareas</button>
      <div className="remaining-tasks">
        Quedan {remainingTasks} {remainingTasks === 1 ? "nota" : "notas"}
      </div>
    </div>
  );
};

export default App;
