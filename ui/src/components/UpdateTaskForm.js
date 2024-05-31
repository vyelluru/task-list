import { DialogTitle, Dialog, TextField, Button, Checkbox } from '@mui/material';
import CheckIcon from "@mui/icons-material/Check";
import React, { useState } from 'react';
import axios from "axios";
import { API_URL } from '../utils';

export const UpdateTaskForm = ({ fetchTasks, isDialogOpen, setIsDialogOpen, task }) => {
    const {id, completed} = task;
    const [taskName, setTaskName] = useState("")

    const handleUpdateTaskName = async () => {
        try {
            await axios.put(API_URL, {
                id,
                name: taskName,
                completed
            })
            await fetchTasks();
            setTaskName("");
        } catch (err) {
            console.log(err);
        }
    }

  return <Dialog open={isDialogOpen}>
    <DialogTitle>Edit Task</DialogTitle>
    <div className="dialog">
        <TextField onChange = {(e) => setTaskName(e.target.value)} variant="outlined" size="small" label="Task"></TextField>
        <Button variant="contained" onClick={async () => {
            await handleUpdateTaskName();
            setIsDialogOpen(false);
            }}>
            <CheckIcon></CheckIcon>
        </Button>
    </div>
  </Dialog>
}