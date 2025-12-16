import React, { useState } from "react";
import TaskList from "../TaskList/TaskList";
import TaskForm from "../TaskForm/TaskForm";
import type { taskItem } from "../../types";

import { CssBaseline, Container, Grid, } from "@mui/material";

const Dashboard: React.FC = () => {
    const [tasks, setTasks] = useState<taskItem[]>([]);

    const addTask = (text: string, priority: 'low' | 'medium' | 'high', dueDate: string) => {
        if (dueDate === "") {
            dueDate = new Date().toISOString().split('T')[0] + "T00:00:00";
        }
        const newTask: taskItem = {
            id: Date.now(),
            title: text,
            isCompleted: false,
            status: dueDate < new Date().toISOString() ? 'overdue' : 'in-progress',
            dueDate: dueDate,
            priority: priority,
        };
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const deleteTask = (idToDelete: number) => {
        setTasks((prevTasks) => prevTasks.filter(task => task.id !== idToDelete));
    };

    const editTask = (idToEdit: number, updatedText: string) => {
        setTasks((prevTasks) => prevTasks.map(task =>
            task.id === idToEdit ? { ...task, title: updatedText } : task
        ));
    }

    return (
        <>
            <CssBaseline />
            <Container>
                <Grid container flexDirection={"column"} alignItems={"center"} justifyContent={"center"} alignContent={"center"} height={"100vh"} rowSpacing={3}>
                    <Grid size={{ xs: 12, md: 6 }} alignSelf={"flex-start"}>
                        <TaskForm onAddTask={addTask} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 9 }}>
                        <TaskList tasks={tasks}
                            onChangeStatus={() => { }}
                            onDelete={deleteTask}
                            onEdit={editTask} />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default Dashboard;