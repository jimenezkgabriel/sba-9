export interface taskItem {
    id: number;
    title: string;
    isCompleted: boolean;
    status: 'in-progress' | 'completed' | 'overdue';

    dueDate: string; // ISO date string
    priority: 'low' | 'medium' | 'high';
}

export interface TaskItemProps {
    task: taskItem;
    onChangeStatus: (id: number) => void;
    onDelete: (id: number) => void;
    // partial might need to be changed to string
    onEdit: (id: number, updatedTask: string) => void;
}

export interface TaskListProps {
    tasks: taskItem[];
    onChangeStatus: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number, updatedTask: string) => void;
}

export interface TaskFormProps {
    onAddTask: (text: string, priority: 'low' | 'medium' | 'high', dueDate: string) => void;
}

export interface TaskFilterProps {
    searchTerm: string;
    statusTerm: string;
    priorityTerm: string;
    onPriorityChange: (priority: string) => void;
    onStatusChange: (status: string) => void;
    onSearchChange: (str: string) => void;
}

export interface DashboardProps {
    onThemeChange: (theme: string) => void;
}