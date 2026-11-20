
import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "wash dishes", completed: false },
    { id: 2, text: "edit resume", completed: true },
    { id: 3, text: "finish Codedex course", completed: false }
  ]);

  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  // Add or update task
  const handleAdd = () => {
    if (input.trim() === "") return;

    if (editId !== null) {
      setTasks(tasks.map(task =>
        task.id === editId
          ? { ...task, text: input }
          : task
      ));

      setEditId(null);
    } else {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: input,
          completed: false
        }
      ]);
    }

    setInput("");
  };

  // Delete task
  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Complete task
  const handleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  // Edit task
  const handleEdit = (task) => {
    setInput(task.text);
    setEditId(task.id);
  };

  const completed = tasks.filter(
    task => task.completed
  ).length;

  const uncompleted = tasks.length - completed;

  return (
    <div className="container">
      <div className="todo-box">

        <h1>To Do List</h1>

        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
            }}
          />

          <button onClick={handleAdd}>
            {editId !== null ? "Update" : "Add"}
          </button>
        </div>

        <h2>Task List</h2>

        <div className="task-list">
          {tasks.map(task => (
            <div className="task" key={task.id}>

              <label className="task-name">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleComplete(task.id)}
                />

                <span className={
                  task.completed ? "completed" : ""
                }>
                  {task.text}
                </span>
              </label>

              <div className="actions">
                <button
                  className="delete"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>

                <button
                  className="edit"
                  onClick={() => handleEdit(task)}
                >
                  Edit
                </button>
              </div>

            </div>
          ))}
        </div>

        <div className="footer">
          Completed: {completed} | Uncompleted: {uncompleted}
        </div>

      </div>
    </div>
  );
}

export default App;