import { useState } from 'react';
import { Button, Divider } from '@mantine/core'
import { Plus } from 'tabler-icons-react'
import CreateModifyTodoModal from './CreateModifyTodoModal';

function AddTodoForm() {
	const [addModalOpened, setAddModalOpened] = useState(false);

	return (
		<>
			<CreateModifyTodoModal
				opened={addModalOpened}
				setOpened={setAddModalOpened}
			/>
			<Button
				fullWidth
				mb="sm"
				color="blue"
				variant="filled"
				onClick={() => setAddModalOpened(true)}
			>
				<Plus />
			</Button>
			<Divider mb="xl" />
		</>
	)
}

export default AddTodoForm;