// import { useState } from 'react'
import TaskList from './components/TaskList/TaskList.tsx'
import TaskForm from './components/TaskForm/TaskForm.tsx'

import type { taskItem } from './types/index.ts'

function App() {
  const task1: taskItem = { id: 1, title: 'Test Task', status: 'in-progress', dueDate: new Date().toISOString(), priority: 'high' }
  const task2: taskItem = { id: 2, title: 'Another Task', status: 'completed', dueDate: new Date().toISOString(), priority: 'low' }
  const task3: taskItem = { id: 3, title: 'Third Task', status: 'overdue', dueDate: new Date().toISOString(), priority: 'medium' }

  let taskList = [task1, task2, task3];

  return (
    <>
      <TaskForm onAddTask={(text) => { console.log(text) }} />
      <TaskList tasks={taskList}
        onChangeStatus={() => { }}
        onDelete={() => { }}
        onEdit={(id, text) => { console.log(id, text) }} />
    </>
  )
}

export default App
