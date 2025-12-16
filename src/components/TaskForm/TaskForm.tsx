import React, { useState } from "react";
import { TextField, Button, Box, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

import type { TaskFormProps } from "../../types";

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
    const [text, setText] = useState("");
    const [priority, setPriority] = useState("medium");
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onAddTask(text.trim(), priority as 'low' | 'medium' | 'high', dueDate);
            setText("");
        }
    };

    return (
        <>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                <TextField
                    required
                    variant="outlined"
                    label="New Task"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    error={text.trim() === ""}
                    helperText={text.trim() === "" ? "Task cannot be empty" : ""}
                />
                <FormControl>
                    <InputLabel id="prioritySelectLabel">Priority</InputLabel>
                    <Select
                        labelId="prioritySelectLabel"
                        id="prioritySelect"
                        value={priority}
                        label="Priority"
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <MenuItem value="low">Low</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="high">High</MenuItem>
                    </Select>
                </FormControl>
                <TextField onChange={(e) => setDueDate(new Date(e.target.value + "T00:00:00").toISOString())} type="date"></TextField>
                <Button type="submit" variant="contained" color="primary">
                    Add
                </Button>
            </Box>
        </>

    );
};

export default TaskForm;