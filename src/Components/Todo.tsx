import { Group, Divider, Text, Checkbox } from '@mantine/core'
import { useAppDispatch } from '../redux/store';
import { modifyTodo } from '../redux/todo/todoSlice';
import TodoMenu from './TodoMenu';

function Todo({ todo }: any) {
  const dispatch = useAppDispatch();

  const toggleTodo = () => {
    const newStatus = todo.status === 'completed' ? 'created' : 'completed';
    const todoId = todo.id;
    const data = {
      status: newStatus
    }
    dispatch(
      modifyTodo({todoId, data})
    )
  }

	return (
    <>
      <Group style={{flexWrap: 'nowrap', alignItems: 'flex-start'}}>
        <TodoMenu todo={todo} />
        <Checkbox
          size="sm"
          checked={todo.status === 'completed'}
          onChange={toggleTodo}
        />
        <Text
          strikethrough={todo.status === 'completed'}
          color={todo.status === 'completed' ? 'dimmed' : ''}>
          {todo.content}
        </Text>
      </Group>
      <Divider my="xs" />
    </>

	)
}

export default Todo;