import { Container } from "@mantine/core";
import AddTodoForm from "./AddTodoForm";
import Todos from "./Todos";

function ToDoListApp() {
  return (
    <Container>
      <AddTodoForm />
      <Todos />
    </Container>
  );
}

export default ToDoListApp;
