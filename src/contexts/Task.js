import React, { createContext, useState } from "react";
import { fbAddTask, fbGetTasks, fbUpdateTask } from "../services/firebase";

const TaskContext = createContext();
export default TaskContext;

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  async function getTasks(userID) {
    await fbGetTasks(userID).then((response) => {
      setTasks(response);
    });
  }

  async function addTask(task) {
    await fbAddTask(task).then((response) => {
      //todo: add the new task you just created to the tasks state

      // spreads existing tasks, and appends new object with id and task info
      setTasks([...tasks, { id: response, task }]);
    });
  }

  async function updateTask(task) {
    await fbUpdateTask(task).then(() => {
      //todo: update the task in the local state that was completed/uncompleted

      // Copy state
      let copyOfTasks = tasks;
      // find the index of the task that changed
      let taskIndex = copyOfTasks.findIndex((item) => item.id === task.id);
      // update the task based on the id variable
      copyOfTasks[taskIndex].task.completed = task.task.completed;
      // spread upated tasks into state
      setTasks([...copyOfTasks]);
    });
  }

  return (
    <TaskContext.Provider
      value={{
        tasks: tasks,
        getTasks,
        addTask,
        updateTask,
      }}>
      {children}
    </TaskContext.Provider>
  );
};
