import { useState } from 'react';
import './App.css';

export default function App() {
  const [filter, setFilter] = useState('all');
  const [items, setItems] = useState([
    { id: 1, title: 'Learn React JSX & Props', priority: 'High', completed: true },
    { id: 2, title: 'Master useState & Event Handlers', priority: 'High', completed: true },
    { id: 3, title: 'Practice Conditional Rendering', priority: 'Medium', completed: false },
    { id: 4, title: 'Build Full Todo App with CRUD', priority: 'High', completed: false },
  ]);

  const toggleItem = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const filteredItems = items.filter((item) => {
    if (filter === 'completed') return item.completed;
    if (filter === 'active') return !item.completed;
    return true;
  });

  return (
    <div className="container">
      <div className="card">
        <span className="tag">DAY 11 | CONDITIONAL RENDERING</span>
        <h1>Dynamic Lists & Status Toggle</h1>
        <p className="subtitle">Filtering and conditional rendering in React</p>

        <div className="filter-tabs">
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
            All ({items.length})
          </button>
          <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>
            Active ({items.filter((i) => !i.completed).length})
          </button>
          <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>
            Completed ({items.filter((i) => i.completed).length})
          </button>
        </div>

        <ul className="list">
          {filteredItems.map((item) => (
            <li key={item.id} className={`list-item ${item.completed ? 'done' : ''}`}>
              <div className="item-info">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleItem(item.id)}
                />
                <span className="title">{item.title}</span>
              </div>
              <span className={`priority ${item.priority.toLowerCase()}`}>
                {item.priority}
              </span>
            </li>
          ))}
          {filteredItems.length === 0 && (
            <li className="empty-state">No items found in this filter view.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
