import { useState } from 'react';
import { Button, Modal, TextInput } from '@mantine/core'
import { Plus } from 'tabler-icons-react'
import { v4 as uuidv4 } from 'uuid';

function AddTaskForm({addTask} : any) {
	const [addModalOpened, setAddModalOpened] = useState(false);
	const [newTaskContent, setNewTaskContent] = useState('');

	function closeModalHandler() {
		setAddModalOpened(false);
		setNewTaskContent('');
	}

	return (
		<>
			<Modal
				opened={addModalOpened}
				onClose={() => closeModalHandler()}
				title="add new task"
			>
				<TextInput
					placeholder={"new task"}
					value={newTaskContent}
					onChange={(event) => setNewTaskContent(event.currentTarget.value)}
					required
				/>
				<Button
					mt="sm"
					onClick={() => {
						addTask({
							id: uuidv4(),
							content: newTaskContent,
							status: 'created'
						});
						closeModalHandler()
					}}
				>
					add task
				</Button>
			</Modal>
			<Button
				fullWidth
				mb="sm"
				color="blue"
				variant="filled"
				onClick={() => setAddModalOpened(true)}
			>
				<Plus />
			</Button>
		</>
	)
}

export default AddTaskForm;