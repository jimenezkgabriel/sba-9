import React, { useState } from "react";
import type { TaskItemProps } from "../../types";

import { TextField, IconButton, TableRow, TableCell } from "@mui/material";


const TaskItem: React.FC<TaskItemProps> = ({ task,
    onChangeStatus,
    onDelete,
    onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);

    const handleSave = () => {
        onEdit(task.id, editedTitle);
        setIsEditing(false);
    };

    return (
        <>
            <TableRow>
                <TableCell><input type="checkbox" checked={task.isCompleted} onChange={() => onChangeStatus(task.id)} /></TableCell>
                <TableCell style={{ display: 'flex', alignItems: 'center' }}>
                    {isEditing ? (
                        <>
                            <TextField
                                fullWidth
                                size="small"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                            />
                            <IconButton onClick={handleSave} color="primary">
                                💾
                            </IconButton>
                        </>
                    ) : (
                        <>
                            {task.title}
                            <IconButton edge="end" aria-label="edit" onClick={() => setIsEditing(true)}>
                                ✏️
                            </IconButton>
                        </>
                    )}
                </TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                <TableCell>
                    {!isEditing && (
                        <IconButton edge="end" aria-label="delete" onClick={() => { onDelete(task.id); onChangeStatus(task.id); }}>
                            🗑️
                        </IconButton>
                    )}
                </TableCell>
            </TableRow>
        </>
    );
}
export default TaskItem;