import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

import type { TaskFormProps } from "../../types";

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
    const [text, setText] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onAddTask(text.trim());
            setText("");
        }
    };

    return (
        <>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="New Task"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    size="small"
                />
                <Button type="submit" variant="contained" color="primary">
                    Add
                </Button>
            </Box>
        </>
    );
};

export default TaskForm;