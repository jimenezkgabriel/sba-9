import React from "react";
import type { TaskListProps } from "../../types";
import TaskItem from "./TaskItem";

import { List, Paper } from "@mui/material";

const TaskList: React.FC<TaskListProps> = ({
    tasks,
    onChangeStatus,
    onDelete,
    onEdit }) => {

    if (tasks.length === 0) {
        return <Paper elevation={2} sx={{ padding: 2, textAlign: 'center' }}>No tasks available.</Paper>;
    }

    return (
        <Paper elevation={2}>
            <List>
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onChangeStatus={onChangeStatus}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                ))}
            </List>
        </Paper>
    );
}
export default TaskList;