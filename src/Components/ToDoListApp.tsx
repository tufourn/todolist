import { Container } from '@mantine/core';
import { useEffect, useState } from 'react';
import AddTaskForm from './AddTaskForm';
import TaskList from "./TaskList";

interface Task {
	id: string,
	content: string,
	status: string
}

function ToDoListApp() {
    const [tasks, setTasks] = useState<Task[]>(loadTaskLocal() || []);

	function addTask(newTask : Task) {
		if (!newTask.content) { return; }
		setTasks([
			...tasks,
			newTask
		])
	}

	function deleteTask(taskId : string) {
		setTasks([...tasks].filter(task => task.id !== taskId))
	}

	function toggleTaskCompleteness(taskId: string) {
		setTasks([...tasks].map(task => {
			if (task.id === taskId) {
				const newStatus = task.status === 'completed' ? 'created' : 'completed';
				return {...task, status: newStatus};
			}
			return task;
		}))
	}

	function loadTaskLocal() {
		let loadedTasks = localStorage.getItem('tasks');
		if (loadedTasks) {
			return JSON.parse(loadedTasks);
		}
	}

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks]);

    return (
			<Container>
				<AddTaskForm addTask={addTask}/>
				<TaskList
						tasks={tasks}
						deleteTask={deleteTask}
						toggleTaskCompleteness={toggleTaskCompleteness}
				/>
			</Container>
		)

}

export default ToDoListApp;