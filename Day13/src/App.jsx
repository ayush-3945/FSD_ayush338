import { useState } from 'react';
import './App.css';

function App() {
  // State for input text
  const [task, setTask] = useState('');

  // State for tasks list (initial tasks as shown on whiteboard)
  const [tasks, setTasks] = useState([
    { id: 1, text: 'TASK 1' },
    { id: 2, text: 'TASK 2' },
  ]);

  // State to track editing (null means adding new task)
  const [editId, setEditId] = useState(null);

  // Handle Add / Update submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.trim()) return;

    if (editId !== null) {
      // UPDATE: Update existing task
      setTasks(
        tasks.map((item) =>
          item.id === editId ? { ...item, text: task.trim() } : item
        )
      );
      setEditId(null);
    } else {
      // CREATE: Add new task
      const newTask = {
        id: Date.now(),
        text: task.trim(),
      };
      setTasks([...tasks, newTask]);
    }

    setTask('');
  };

  // EDIT: Load task into input field
  const handleEdit = (item) => {
    setTask(item.text);
    setEditId(item.id);
  };

  // DELETE: Remove task by id
  const handleDelete = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
    if (editId === id) {
      setEditId(null);
      setTask('');
    }
  };

  // Cancel edit
  const handleCancel = () => {
    setEditId(null);
    setTask('');
  };

  return (
    <div className="container">
      <div className="todo-box">
        <p className="tag">vite + react</p>
        <h2>TODO list</h2>

        {/* Input & Add/Update Button */}
        <form onSubmit={handleSubmit} className="input-row">
          <input
            type="text"
            placeholder="Enter task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button type="submit" className="btn-main">
            {editId !== null ? 'UPDATE' : 'ADD'}
          </button>
          {editId !== null && (
            <button type="button" onClick={handleCancel} className="btn-cancel">
              CANCEL
            </button>
          )}
        </form>

        {/* Task List */}
        <ul className="task-list">
          {tasks.map((item) => (
            <li key={item.id} className="task-item">
              <span className="task-text">• {item.text}</span>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn-edit"
                  onClick={() => handleEdit(item)}
                >
                  EDIT
                </button>
                <button
                  type="button"
                  className="btn-del"
                  onClick={() => handleDelete(item.id)}
                >
                  DEL
                </button>
              </div>
            </li>
          ))}
          {tasks.length === 0 && (
            <li className="empty-msg">No tasks available. Add one above.</li>
          )}
        </ul>

        {/* CRUD operations list from whiteboard */}
        <div className="crud-section">
          <h4>CRUD operations</h4>
          <ul>
            <li>Create (Add Task)</li>
            <li>Read (Show Tasks)</li>
            <li>Update (Edit Task)</li>
            <li>Delete (Remove Task)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
