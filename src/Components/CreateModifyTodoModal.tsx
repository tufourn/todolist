import { Modal, TextInput, Button } from "@mantine/core";
import { useAppDispatch } from "../redux/store";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";

import { addTodo, modifyTodo } from "../redux/todo/todoSlice";

function CreateModifyTodoModal({ opened, setOpened, todo }: any) {
  const dispatch = useAppDispatch();

  const [content, setContent] = useState(todo ? todo.content : "");

  const onCreateTodoClicked = () => {
    if (content) {
      dispatch(
        addTodo({
          todoId: nanoid(),
          content: content,
          status: "created",
        })
      );
    }
    setContent("");
    setOpened(false);
  };

  const onModifyTodoClicked = () => {
    const todoId = todo.todoId;
    const data = {
      content: content,
    };
    dispatch(modifyTodo({ todoId, data }));
    setOpened(false);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={todo ? "modify todo" : "add todo"}
    >
      <TextInput
        placeholder={"new todo"}
        value={content}
        onChange={(event) => setContent(event.currentTarget.value)}
        required
      />
      {todo ? (
        <Button mt="sm" onClick={onModifyTodoClicked}>
          modify
        </Button>
      ) : (
        <Button mt="sm" onClick={onCreateTodoClicked}>
          create
        </Button>
      )}
    </Modal>
  );
}

export default CreateModifyTodoModal;
