import { Menu, ActionIcon } from "@mantine/core";
import { useState } from "react";
import { DotsVertical, Trash, Pencil } from "tabler-icons-react";
import { useAppDispatch } from "../redux/store";
import { deleteTodo } from "../redux/todo/todoSlice";
import CreateModifyTodoModal from "./CreateModifyTodoModal";

function TodoMenu({ todo }: any) {
  const dispatch = useAppDispatch();

  const [modifyModalOpened, setModifyModalOpened] = useState(false);

  const onDeleteTodoClicked = () => {
    dispatch(deleteTodo(todo.todoId));
  };

  return (
    <>
      <CreateModifyTodoModal
        opened={modifyModalOpened}
        setOpened={setModifyModalOpened}
        todo={todo}
      />
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <ActionIcon size="sm">
            <DotsVertical />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>actions</Menu.Label>
          <Menu.Item
            icon={<Pencil size={14} />}
            component="button"
            onClick={() => setModifyModalOpened(true)}
          >
            modify todo
          </Menu.Item>
          <Menu.Item
            icon={<Trash size={14} />}
            color="red"
            component="button"
            onClick={onDeleteTodoClicked}
          >
            delete todo
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}

export default TodoMenu;
