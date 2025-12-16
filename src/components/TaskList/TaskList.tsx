import React from "react";
import type { TaskListProps } from "../../types";
import TaskItem from "./TaskItem";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

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
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{/* Checkbox */}</TableCell>
                            <TableCell>Task</TableCell>
                            <TableCell>Priority</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell>{/* Buttons to edit and delete task */}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onChangeStatus={onChangeStatus}
                                onDelete={onDelete}
                                onEdit={onEdit}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
export default TaskList;