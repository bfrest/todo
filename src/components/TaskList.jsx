import React, { useState, useContext, useEffect } from "react";
import TaskContext from "../contexts/Task";
import AuthContext from "../contexts/Auth";

function TaskList() {
  const { user, logout } = useContext(AuthContext);
  const emptyTask = {
    // set category and name to null so the empty string didn't show as a value in the handleChange function
    category: "",
    name: "",
    completed: false,
    uid: user.uid,
  };
  const [newTask, setNewTask] = useState(false);
  const [task, setTask] = useState(emptyTask);
  const { tasks, addTask, updateTask, getTasks } = useContext(TaskContext);

  useEffect(() => {
    getTasks(user.uid);
  }, [user]);

  const updateCompleted = (task) => {
    task.task.completed = !task.task.completed;
    updateTask(task);
  };

  const saveTask = () => {
    addTask(task).then(() => cancelTask(/*complete the cancel task todo*/));
  };

  const cancelTask = () => {
    //todo: reset the task state and hide the form

    setTask(emptyTask);
    setNewTask(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // todo: update the task state with these variables

    // Copy the task object
    let copyOfTask = { ...task };

    if (name === "category") {
      // change the category to the input value
      copyOfTask.category = value;
      // spread the updated object to state
      setTask({ ...copyOfTask });
    } else if (name === "name") {
      // change the name to the input value
      copyOfTask.name = value;
      // spread the updated object to state
      setTask({ ...copyOfTask });
    }
    // Spread the new task to update state
    setTask(copyOfTask);
  };

  return (
    <div className="TaskList">
      <nav>
        <button onClick={() => setNewTask(!newTask)}> create task &#43;</button>
        <button onClick={logout}>Logout</button>
      </nav>

      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Name</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr className="row" key={task.id}>
              <td>{task.task.category}</td>
              <td>{task.task.name}</td>
              <td>
                <input
                  type="checkbox"
                  checked={task.task.completed}
                  onChange={() => updateCompleted(task)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {newTask && (
        <div className="newTask">
          <div>
            <h2>New Task</h2>
            <input type="text" onChange={handleChange} name="category" />

            <input type="text" onChange={handleChange} name="name" />

            <button
              disabled={task.name.length === 0 || task.category.length === 0 ? true : false}
              onClick={saveTask}>
              save
            </button>
            <br />
            <button onClick={cancelTask}>cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;
