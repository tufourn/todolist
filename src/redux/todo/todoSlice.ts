import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TODOS_URL = "https://krir0fnlxa.execute-api.us-east-1.amazonaws.com/dev/common";

interface Todo {
  todoId: string;
  content: string;
  status: string;
}

interface TodosState {
  todos: Todo[]
  loadingState: string // idle, loading, completed, failed
}

const initialState = {
  todos: [],
  loadingState: 'idle'
} as TodosState;

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  try {
    const response = await axios.get(TODOS_URL);
    return response.data;
  } catch (error) {
    return new Error("an error occurred while fetching todos");
  }
});

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (newTodo: Todo) => {
    try {
      const response = await axios.post(TODOS_URL, newTodo);
      return response.data;
    } catch (error) {
      return new Error("an error occurred while creating a new todo");
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (todoId: string) => {
    try {
      const response = await axios.delete(TODOS_URL + `/${todoId}`);
      return response.data.Item.Attributes;
    } catch (err) {
      return new Error("an error occurred while deleting todo");
    }
  }
);

export const modifyTodo = createAsyncThunk(
  "todos/modifyTodo",
  async ({ todoId, data }: any) => {
    try {
      const response = await axios.patch(TODOS_URL + `/${todoId}`, data);
      return response.data.Item.Attributes;
    } catch (err) {
      return new Error("an error occurred while modifying todo");
    }
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loadingState = 'completed'
        state.todos = action.payload.todos;
      })
      .addCase(fetchTodos.pending, (state, action) => {
        state.loadingState = 'loading'
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loadingState = 'failed'
        alert("error fetching todos, please try again");
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loadingState = 'completed'
        state.todos.push(action.payload.Item);
      })
      .addCase(addTodo.pending, (state, action) => {
        state.loadingState = 'loading'
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loadingState = 'failed'
        alert("error creating todo, please try again");
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loadingState = 'completed'
        state.todos = state.todos.filter(
          (todo) => todo.todoId !== action.payload.todoId
        );
      })
      .addCase(deleteTodo.pending, (state, action) => {
        state.loadingState = 'loading'
      })
      .addCase(modifyTodo.fulfilled, (state, action) => {
        state.loadingState = 'completed'
        state.todos = state.todos.map((todo) => {
          if (todo.todoId !== action.payload.todoId) {
            return todo;
          }
          return action.payload;
        })
      })
      .addCase(modifyTodo.pending, (state, action) => {
        state.loadingState = 'loading'
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loadingState = 'failed'
        alert("error deleting todo, please try again");
      })
  },
});

export default todoSlice.reducer;
