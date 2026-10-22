import './App.css';

// Child Component receiving and displaying props
function ChildComponent({ user }) {
  return (
    <div className="profile-card">
      <div className="avatar">{user.name.charAt(0)}</div>
      <h2>{user.name}</h2>
      <p className="email">{user.email}</p>
      <span className="badge">{user.section}</span>
    </div>
  );
}

// Parent Component passing props to Child
function ParentComponent() {
  const users = [
    { id: 1, name: "Ayush Kumar Pandey", email: "ayushpandey781808@gmail.com", section: "CSE-16" },
    { id: 2, name: "Rahul Sharma", email: "rahul.sharma@example.com", section: "CSE-17" },
    { id: 3, name: "Priya Singh", email: "priya.singh@example.com", section: "CSE-16" },
  ];

  return (
    <div className="card-grid">
      {users.map((user) => (
        <ChildComponent key={user.id} user={user} />
      ))}
    </div>
  );
}

export default function App() {
  return (
    <div className="container">
      <header>
        <span className="tag">DAY 09 | REACT</span>
        <h1>React Components & Props</h1>
        <p className="subtitle">Passing data from ParentComponent to ChildComponent using props</p>
      </header>
      <ParentComponent />
    </div>
  );
}
