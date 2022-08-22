import { Stack, Text } from "@mantine/core";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { fetchTodos } from "../redux/todo/todoSlice";
import Todo from "./Todo";

function Todos() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todoList.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Stack>
      {Array.isArray(todos) && todos.length ? (
        todos.map((todo: any) => <Todo key={todo.id} todo={todo} />)
      ) : (
        <Text> nothing to do </Text>
      )}
    </Stack>
  );
}

export default Todos;
