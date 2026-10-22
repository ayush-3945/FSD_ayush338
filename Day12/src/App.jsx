
import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  // CREATE and UPDATE
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.trim()) return;

    if (editId !== null) {
      setTasks((prevTasks) =>
        prevTasks.map((item) =>
          item.id === editId
            ? { ...item, text: task.trim() }
            : item
        )
      );
      setEditId(null);
    } else {
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          id: Date.now(),
          text: task.trim(),
          completed: false,
        },
      ]);
    }

    setTask("");
  };

  // DELETE
  const deleteTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.filter((item) => item.id !== id)
    );

    if (editId === id) {
      setEditId(null);
      setTask("");
    }
  };

  // EDIT
  const editTask = (item) => {
    setTask(item.text);
    setEditId(item.id);
  };

  // COMPLETE
  const toggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const pendingCount = tasks.filter(
    (item) => !item.completed
  ).length;

  const completedCount = tasks.filter(
    (item) => item.completed
  ).length;

  return (
    <div className="app">
      <div className="todo-card">
        <p className="subtitle">DAY 12 | REACT</p>

        <h1>My Todo List</h1>

        <p className="description">
          Organize your day, one task at a time.
        </p>

        <form className="todo-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button type="submit" className="add-btn">
            {editId !== null ? "Update" : "Add"}
          </button>

          {editId !== null && (
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                setEditId(null);
                setTask("");
              }}
            >
              Cancel
            </button>
          )}
        </form>

        <div className="task-header">
          <h2>Your Tasks</h2>
          <span>{pendingCount} pending</span>
        </div>

        {tasks.length === 0 ? (
          <div className="empty">
            <p>No tasks yet!</p>
            <span>Add your first task above.</span>
          </div>
        ) : (
          <ul className="task-list">
            {tasks.map((item) => (
              <li key={item.id} className="task-item">
                <label className="task-label">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleComplete(item.id)}
                  />

                  <span
                    className={
                      item.completed ? "completed" : ""
                    }
                  >
                    {item.text}
                  </span>
                </label>

                <div className="actions">
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => editTask(item)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => deleteTask(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <footer>
          {completedCount} of {tasks.length} tasks completed
        </footer>
      </div>
    </div>
  );
}

export default App;
