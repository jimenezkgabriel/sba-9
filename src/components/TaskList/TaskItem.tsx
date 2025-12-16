import React, { useState } from "react";
import type { TaskItemProps } from "../../types";

import { ListItem, ListItemText, TextField, IconButton, Box } from "@mui/material";


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
            <ListItem
                secondaryAction={
                    !isEditing && (
                        <IconButton edge="end" aria-label="delete" onClick={() => {onDelete(task.id); onChangeStatus(task.id);}}>
                            🗑️
                        </IconButton>
                    )
                }
            >
                {isEditing ? (
                    <>
                        <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', gap: 1, pr: 1 }}>
                            <TextField
                                fullWidth
                                size="small"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                            />
                            <IconButton onClick={handleSave} color="primary">
                                💾
                            </IconButton>
                        </Box>
                    </>
                ) : (
                    <>
                        <ListItemText primary={task.title} />
                        <IconButton edge="end" aria-label="edit" onClick={() => setIsEditing(true)}>
                            ✏️
                        </IconButton>
                    </>
                )}
            </ListItem>
        </>
    );
}
export default TaskItem;