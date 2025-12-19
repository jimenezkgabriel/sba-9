import React, { useState } from "react";
import type { taskItem, TaskItemProps } from "../../types";

import { TextField, IconButton, TableRow, TableCell, Checkbox } from "@mui/material";
import { Delete, Edit, Save } from "@mui/icons-material";


const TaskItem: React.FC<TaskItemProps> = ({
    task,
    onChangeStatus,
    onDelete,
    onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);

    const handleSave = () => {
        onEdit(task.id, editedTitle);
        setIsEditing(false);
    };

    const themeSwitcher = (task: taskItem) => {
        let theme = {
            backgroundColor: '',
            color: ''
        }
        if (task.isCompleted) {
            theme.backgroundColor = "success.light";
            theme.color = "success.contrastText";
            return theme;
        } else if (task.status === "overdue") {
            theme.backgroundColor = "error.light";
            theme.color = "error.contrastText";
            return theme;
        } else {
            // Return nothing so ThemeProvider on App.tsx can override colors to be light or dark theme
            return {   };
        }
    }

    return (
        <>
            <TableRow sx={{ '& .MuiTableCell-root': { ...themeSwitcher(task) } }}>
                <TableCell>
                    <Checkbox
                        checked={task.isCompleted}
                        onChange={() => onChangeStatus(task.id)}
                        sx={{ '& .MuiSvgIcon-root': { ...themeSwitcher(task) } }}
                    />
                </TableCell>
                <TableCell style={{ display: 'flex', alignItems: 'center' }}>
                    {isEditing ? (
                        <>
                            <TextField
                                fullWidth
                                size="small"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                                sx={{ backgroundColor: "white" }}
                            />
                            <IconButton onClick={handleSave} color="primary">
                                <Save fontSize="large" sx={{ color: themeSwitcher(task) }} />
                            </IconButton>
                        </>
                    ) : (
                        <>
                            {task.title}
                            <IconButton edge="end" aria-label="edit" onClick={() => setIsEditing(true)}>
                                <Edit fontSize="large" sx={{ color: themeSwitcher(task) }} />
                            </IconButton>
                        </>
                    )}
                </TableCell>
                <TableCell>{task.priority === 'high' ? 'High' : task.priority === 'medium' ? 'Medium' : 'Low'}</TableCell>
                <TableCell>{task.status === 'in-progress' ? 'In Progress' : task.status === 'completed' ? 'Completed' : 'Overdue'}</TableCell>
                <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                <TableCell>
                    {!isEditing && (
                        <IconButton edge="end" aria-label="delete" onClick={() => { onDelete(task.id); }}>
                            <Delete fontSize="large" sx={{ color: themeSwitcher(task) }} />
                        </IconButton>
                    )}
                </TableCell>
            </TableRow>
        </>
    );
}
export default TaskItem;