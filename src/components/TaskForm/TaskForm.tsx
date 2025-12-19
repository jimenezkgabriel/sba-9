import React, { useState } from "react";
import { TextField, Grid, Button, Select, MenuItem, InputLabel, FormControl, FormHelperText } from "@mui/material";

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
        <Grid
            component={"form"}
            container
            spacing={2}
            direction={{ xs: 'column', md: 'row' }}
            alignItems="center"
            onSubmit={handleSubmit}
        >
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    fullWidth
                    required
                    variant="outlined"
                    label="New Task"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    error={text.trim() === ""}
                    helperText={text.trim() === "" ? "Task cannot be empty" : ` `}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
                <FormControl fullWidth>
                    <InputLabel id="prioritySelectLabel">Priority</InputLabel>
                    <Select
                        labelId="prioritySelectLabel"
                        id="prioritySelect"
                        value={priority}
                        label="Priority"
                        onChange={(e) => setPriority(e.target.value as string)}
                    >
                        <MenuItem value="low">Low</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="high">High</MenuItem>
                    </Select>
                    <FormHelperText>&nbsp;</FormHelperText>
                </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 2 }}>
                <TextField
                    type="date"
                    fullWidth
                    value={dueDate ? new Date(dueDate).toISOString().split('T')[0] : ""}
                    onChange={(e) => setDueDate(new Date(e.target.value + "T00:00:00").toISOString())}
                    helperText="&nbsp;"
                />
            </Grid>

            <Grid size={{ xs: 12, md: 1 }} sx={{ display: 'flex', alignItems: 'center', }}>
                <FormControl fullWidth>
                    <Button fullWidth size="large" type="submit" variant="contained" color="primary">
                        Add
                    </Button>
                    <FormHelperText>&nbsp;</FormHelperText>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default TaskForm;