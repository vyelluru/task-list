import React, { useState } from 'react'
import TextField from "@mui/material/TextField";
import { Button, Typography } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { API_URL } from '../utils';
import { fetchTasks } from '../task';

export const AddTaskForm = ({ fetchTasks }) => {
    const [newTask, setNewTask] = useState("")
    const addNewTask = async () => {
        try {
            await axios.post(API_URL, 
                {
                    name: newTask,
                    completed: false
                })
            await fetchTasks();
            setNewTask("");
        } catch (err) {
            console.log(err)
        }
    }
  return (
    <div>
        <Typography My Task List></Typography>
        <div className="addTaskForm">
            <TextField size="small" label="Task" varaint="outlined" value={newTask} onChange={(e) => setNewTask(e.target.value)}/>
            <Button disabled={!newTask.length} variant="outlined" onClick = {addNewTask}>
                <AddIcon />
            </Button>
        </div>
    </div>
  )
}