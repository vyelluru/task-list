//routes
import express from "express";
import cors from "cors";
import { fetchTasks, createTasks, updateTasks, deleteTasks } from "./task";
import serverless from "serverless-http";
const app = express();
const port = 3001;

app.use(express.json());


if(process.env.DEVELOPMENT) {
    app.use(cors());
}

app.get("/", (req, res) => {
    res.send("Hi")
})

app.get("/task", async (req, res) => {
    try {
        const tasks = await fetchTasks();
        res.send(tasks.items);
    } catch (err) {
        res.status(400).send(`Error: ${err}`)
    }
})
app.post("/task", async (req, res) => {
    try {
        const task = req.body;
        const response = await createTasks(task);
        res.send(response)
    } catch (err) {
        res.status(400).send(`Error: ${err}`)
    }
})
app.put("/task", async (req, res) => {
    try {
        const task = req.body;
        const response = await updateTasks(task);
        res.send(response)
    } catch (err) {
        res.status(400).send(`Error: ${err}`)
    }
})
app.delete("/task/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const response = await deleteTasks(id);
        res.send(response)
    } catch (err) {
        res.status(400).send(`Error: ${err}`)
    }
})

if(process.env.DEVELOPMENT) {
    app.listen(port, () => {
        console.log(`Port ${port}`)
    })
}

export const handler = serverless(app);