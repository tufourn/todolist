import {useEffect, useState} from 'react';
import {
	AppShell, Container,
	Header,
	Text,
	Group,
	useMantineTheme,
} from '@mantine/core';
import AddTaskForm from "./AddTaskForm";
import TaskList from "./TaskList";
import LightDarkButton from "./LightDarkButton";

interface Task {
	id: string,
	content: string,
	status: string
}

export default function ApplicationShell() {
	const theme = useMantineTheme();

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
		<AppShell
			styles={{
				main: {
					background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
				},
			}}
			header={
				<Header height={70} p="md">
					<Group position="apart">
						<Text
							component="span"
							align="center"
							variant="gradient"
							gradient={{ from: 'indigo', to: 'red', deg: 45 }}
							size="xl"
							weight={700}
							style={{ fontFamily: 'Open sans, sans-serif' }}
						>todolist</Text>
						<LightDarkButton />
					</Group>
				</Header>
			}
		>
			<Container>
				<AddTaskForm addTask={addTask}/>
				<TaskList
					tasks={tasks}
					deleteTask={deleteTask}
					toggleTaskCompleteness={toggleTaskCompleteness}
				/>
			</Container>

		</AppShell>
	);
}