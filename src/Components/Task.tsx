import { useState } from 'react'
import { Group, Card, Text, ActionIcon, Checkbox } from '@mantine/core'
import { Trash } from 'tabler-icons-react'

function Task({ id, content, status, deleteTask, toggleTaskCompleteness }: any) {
	const [completed, setCompleted] = useState(status === 'completed');

	function completeCheckboxHandler(event : any) {
		setCompleted(event.currentTarget.checked);
		toggleTaskCompleteness(id);
	}

	return (
		<Card
			key={id}
			shadow="sm"
			p="lg"
			radius="md"
			withBorder
		>
			<Group position="apart" mt="md" mb="xs">
				<Group>
					<Checkbox
						size="md"
						checked={completed}
						onChange={(event) => completeCheckboxHandler(event)}
					/>
					<Text 
						strikethrough={completed}
						color={completed ? 'dimmed' : ''}
					>
						{content}
					</Text>
				</Group>
				<ActionIcon
					color="red"
					size="xl"
					onClick={() => deleteTask(id)}
				>
					<Trash />
				</ActionIcon>
			</Group>
		</Card>
	)
}

export default Task;