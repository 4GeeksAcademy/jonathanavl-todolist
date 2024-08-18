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
  }, [tasks]);

  const fetchTasksFromServer = async () => {
    try {
      const response = await fetch(`${API_URL}/users/jonathanavl`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setTasks(data.todos || []); 
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]);
    }
  };

  const syncTasksWithServer = async (taskId, updatedTask) => {
    try {
      const response = await fetch(`${API_URL}/todos/${taskId}`, {
        method: "PUT",
        body: JSON.stringify(updatedTask),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      await response.json();
    } catch (error) {
      console.error("Error syncing task:", error);
    }
  };

  const deleteUserAndTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/users/jonathanavl`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTasks([]);
      } else {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error deleting user and tasks:", error);
    }
  };

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.trim()) {
      const newTask = {
        label: task,
        is_done: false,
      };

      try {
        const response = await fetch(`${API_URL}/todos/jonathanavl`, {
          method: "POST",
          body: JSON.stringify(newTask),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const createdTask = await response.json();
        setTasks([...tasks, createdTask]);
        setTask("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };


  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/todos/${taskId}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      // Remove the deleted task from the local state
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleClearAll = () => {
    deleteUserAndTasks();
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
      <button className="limpiar" onClick={handleClearAll}>
        Limpiar todas las tareas
      </button>
      <div className="remaining-tasks">
        Quedan {remainingTasks} {remainingTasks === 1 ? "nota" : "notas"}
      </div>
    </div>
  );
};

export default App;
