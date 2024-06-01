import { AddTaskForm } from "./components/AddTaskForm";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useState, useEffect } from "react";
import { API_URL } from "./utils";
import { Task } from "./components/Task"
import CssBaseline from '@mui/material/CssBaseline';
import axios from "axios";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
       const {data} = await axios.get(API_URL)
       setTasks(data);
    } catch (err) {
       console.log(err);
    }
  }

  useEffect(() => {
    fetchTasks(); } ,
    []
  )
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AddTaskForm fetchTasks={fetchTasks}/>
      {tasks.map((task) => <Task task={task} key={task.id} fetchTasks={fetchTasks}/>)}
    </ThemeProvider>
  );
}