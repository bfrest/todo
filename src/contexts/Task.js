import React, { createContext, useState } from 'react';
import {fbAddTask, fbGetTasks, fbUpdateTask, fbSnapshot} from '../services/firebase';


const TaskContext = createContext();
export default TaskContext;

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  async function getTasks() {
    await fbGetTasks().then(response => {
      setTasks(response);
    });
  };

  async function addTask(task) {
    await fbAddTask(task).then(response => {
      //todo: add the new task you just created to the tasks state
    });
  }

  async function updateTask(task) {
    await fbUpdateTask(task).then(() => {
      //todo: update the task in the local state that was completed/uncompleted
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: tasks,
        getTasks,
        addTask,
        updateTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
