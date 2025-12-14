import { useRef, useState } from "react";
import { showMessage } from "./assets/Components/SweetAlert";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [buttonLabel, setButtonLabel] = useState("Add Task");

  const inputRef = useRef(null);
  const selectRef = useRef(null);

  const handleAddTask = () => {
    const taskName = inputRef.current.value.trim();
    const priority = selectRef.current.value;

    if (taskName === "") {
      showMessage
      showMessage("Please enter a task name!", "error");
      return;
    }

    if (priority === "") {
      showMessage("Please select a priority!", "error");
      return;
    }

    if (editId) {
      const updatedTasks = tasks.map(task =>
        task.id === editId
          ? { ...task, taskName, priority }
          : task
      );
      setTasks(updatedTasks);
      setEditId(null);
      setButtonLabel("Add Task");
      showMessage("Task Edited Successfully!");
    } else {
      const taskObj = {
        id: Date.now(),
        taskName,
        priority
      };

      setTasks([...tasks, taskObj]);
      showMessage("Task Added Successfully!");
    }

    inputRef.current.value = "";
    selectRef.current.value = "";
  };

  const handleEditTask = (taskName, priority, id) => {
    inputRef.current.value = taskName;
    selectRef.current.value = priority;
    setEditId(id);
    setButtonLabel("Edit Task");
  };

  const handleDeleteTask = (id) => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
    showMessage("Task Deleted Successfully!", "error");
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="card">
        <h4 className="title text-center mb-4 mt-2">To Do List</h4>

        <input
          type="text" ref={inputRef}  placeholder="add your task"/>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="select-wrapper me-3">
            <select className="priority" ref={selectRef}>
              <option value="">Select Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <i className="ri-arrow-down-s-line select-icon"></i>
          </div>

          <button className="task-btn" onClick={handleAddTask}>
            {buttonLabel}
          </button>
        </div>

        <div className="mt-4">
          {tasks.map(task => (
            <ul key={task.id} className="todo-list m-0 p-0">
              <li className="task-row">
                <div className="task-left">{task.taskName}</div>

                <div className="task-right">
                  <button
                    className={`btn priority-chip ${
                      task.priority === "high"
                        ? "priority-high"
                        : task.priority === "medium"
                        ? "priority-medium"
                        : "priority-low"
                    }`}
                  >
                    {task.priority}
                  </button>

                  <button
                    className="btn btn-edit"
                    onClick={() =>
                      handleEditTask(task.taskName, task.priority, task.id)
                    }
                  >
                    <i className="ri-pencil-ai-2-line"></i>
                  </button>

                  <button
                    className="btn btn-delete"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </li>
            </ul>
          ))}
        </div>

      </div>
    </div>
  );
};

export default App;
