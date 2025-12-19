import React, { useEffect, useState } from "react";
import TaskList from "../TaskList/TaskList";
import TaskForm from "../TaskForm/TaskForm";
import TaskFilter from "../TaskFilter/TaskFilter";
import type { taskItem, DashboardProps } from "../../types";

import { CssBaseline, Container, Grid, Switch, FormGroup, FormControlLabel } from "@mui/material";

const Dashboard: React.FC<DashboardProps> = ({ onThemeChange }) => {
    const [tasks, setTasks] = useState<taskItem[]>(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterByStatus, setFilterByStatus] = useState<string>("");
    const [filterByPriority, setFilterByPriority] = useState<string>("");
    const [theme, setTheme] = useState<string>("light");

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

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

    const toggleCompleted = (idToToggle: number) => {
        setTasks((prevTasks) => prevTasks.map(task =>
            task.id === idToToggle ? { ...task, isCompleted: !task.isCompleted } : task
        ));
        handleStatus(idToToggle);
    };

    const handleStatus = (idToChange: number) => {
        setTasks((prevTasks) => prevTasks.map(task =>
            task.id === idToChange ? { ...task, status: task.isCompleted ? 'completed' : (task.dueDate < new Date().toISOString() ? 'overdue' : 'in-progress') } : task
        ));
    };

    const filteredTasks = tasks.filter(task => {
        const titleMatch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
        const statusMatch = filterByStatus === "" || task.status === filterByStatus;
        const priorityMatch = filterByPriority === "" || task.priority === filterByPriority;
        if (!statusMatch || !priorityMatch) return false;
        return titleMatch && statusMatch && priorityMatch;
    });

    const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTheme = event.target.checked ? "dark" : "light";
        setTheme(newTheme);
        onThemeChange(theme);
    }

    return (
        <>
            <CssBaseline />
            <Container maxWidth="md">
                <Grid
                    container
                    spacing={3}
                    direction="column"
                    alignItems="center"
                    justifyContent="flex-start"
                    sx={{ minHeight: '100vh', py: 4 }}
                >
                    <Grid size={{ xs: 12, md: 10 }}>
                        <FormGroup>
                            <FormControlLabel control={<Switch onChange={handleThemeChange} />} label={`Turn on ${theme == "dark" ? "Light" : "Dark"} Theme`} />
                        </FormGroup>
                        <TaskForm onAddTask={addTask} />
                    </Grid>

                    <Grid size={{ xs: 12, md: 10 }}>
                        <TaskFilter
                            searchTerm={searchTerm}
                            statusTerm={filterByStatus}
                            priorityTerm={filterByPriority}
                            onSearchChange={setSearchTerm}
                            onStatusChange={setFilterByStatus}
                            onPriorityChange={setFilterByPriority}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 10 }}>
                        <TaskList
                            tasks={filteredTasks}
                            onChangeStatus={toggleCompleted}
                            onDelete={deleteTask}
                            onEdit={editTask}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default Dashboard;