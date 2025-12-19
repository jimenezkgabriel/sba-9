import React from "react";

import { TextField, Select, MenuItem, InputLabel, FormControl, Grid, Paper } from "@mui/material";
import type { TaskFilterProps } from "../../types";

const TaskFilter: React.FC<TaskFilterProps> = ({
    searchTerm,
    statusTerm,
    priorityTerm,
    onSearchChange,
    onStatusChange,
    onPriorityChange }) => {

    const handleSearchChange = (filter: string) => {
        onSearchChange(filter);
    }

    const handleStatusChange = (status: string) => {
        onStatusChange(status);
    }

    const handlePriorityChange = (priority: string) => {
        onPriorityChange(priority);
    }

    return (
        <Paper sx={{ p: 2, width: '100%' }} elevation={1}>
            <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        label="Filter Tasks"
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        variant="outlined"
                        fullWidth
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="task-status-label">Status</InputLabel>
                        <Select
                            labelId="task-status-label"
                            value={statusTerm}
                            onChange={(e) => handleStatusChange(e.target.value as string)}
                            label="Status"
                            fullWidth
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="in-progress">In Progress</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                            <MenuItem value="overdue">Overdue</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="task-priority-label">Priority</InputLabel>
                        <Select
                            labelId="task-priority-label"
                            value={priorityTerm}
                            onChange={(e) => handlePriorityChange(e.target.value as string)}
                            label="Priority"
                            fullWidth
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="high">High</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="low">Low</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Paper>
    );
};
export default TaskFilter;