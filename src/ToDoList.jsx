import "./ToDoList.css";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function ToDoList() {
  const [todos, setToDos] = useState([]);
  const [newToDo, setNewToDo] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("todos"));
    if (savedTasks) {
      setToDos(savedTasks);
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const addNewToDoTask = () => {
    if (newToDo.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }
    const newTask = { task: newToDo, id: uuidv4(), isDone: false };
    setToDos((prevToDos) => [...prevToDos, newTask]);
    setNewToDo("");
  };

  const updateToDoValue = (event) => {
    setNewToDo(event.target.value);
  };

  const deleteToDoTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setToDos((prevToDos) => {
        const updatedTasks = prevToDos.filter((todo) => todo.id !== id);
        localStorage.setItem("todos", JSON.stringify(updatedTasks)); // Update localStorage
        return updatedTasks;
      });
    }
  };

  const markAllAsDone = () => {
    setToDos((prevToDos) =>
      prevToDos.map((todo) => ({ ...todo, isDone: true }))
    );
    localStorage.setItem("todos", JSON.stringify(todos)); // Update localStorage
  };

  const markAsDone = (id) => {
    setToDos((prevToDos) =>
      prevToDos.map((todo) =>
        todo.id === id ? { ...todo, isDone: true } : todo
      )
    );
    localStorage.setItem("todos", JSON.stringify(todos)); // Update localStorage
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  };

  return (
    <div className="container">
      <button onClick={toggleDarkMode} className="toggle-dark">
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      <h1>🚀 ToDo List App</h1>

      <div className="input-container">
        <label>Add your task:</label>
        <input
          placeholder="Enter your task here..."
          onChange={updateToDoValue}
          value={newToDo}
        />
        <button onClick={addNewToDoTask} className="add-btn">
          ➕ Add Task
        </button>
      </div>

      <hr />

      <h2>Your tasks to do:</h2>
      {todos.length === 0 ? (
        <p>No tasks yet! 🎉 Add one above.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className={todo.isDone ? "done" : ""}>
              <span>{todo.task}</span>
              <div className="task-buttons">
                <button
                  onClick={() => deleteToDoTask(todo.id)}
                  className="delete-btn"
                >
                  ❌ Delete
                </button>
                <button
                  onClick={() => markAsDone(todo.id)}
                  className="done-btn"
                >
                  ✅ Mark Done
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <button className="mark-all-btn" onClick={markAllAsDone}>
        ✅ Mark All as Done
      </button>

      <footer className="footer">
        <a href="https://wanderlux.onrender.com/developer">
          <p>
            Made with ❤️ by{" "}
            <span className="developer-name">Satinder Singh Sall</span>
          </p>
        </a>
      </footer>
    </div>
  );
}
