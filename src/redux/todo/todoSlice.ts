import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const TODOS_URL = 'https://62de0ad679b9f8c30ab2290d.mockapi.io/api/v1/todolist'

interface Todo {
	id: string,
	content: string,
  status: string,
}

interface TodosState {
  todos: Todo[],
}

const initialState = {
  todos: [],
} as TodosState;

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  try {
    const response = await axios.get(TODOS_URL);
    return response.data;
  } catch (error) {
    return new Error('an error occurred while fetching todos');
  }
})

export const addTodo = createAsyncThunk('todos/addTodo', async (newTodo : Todo) => {
  try {
    const response = await axios.post(TODOS_URL, newTodo);
    return response.data;
  } catch (error) {
    return new Error('an error occurred while creating a new todo')
  }
})

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async(todoId : string) => {
  try {
    const response = await axios.delete(TODOS_URL + `/${todoId}`);
    return response.data;
  } catch (err) {
    return new Error('an error occurred while deleting todo')
  }
})

export const modifyTodo = createAsyncThunk('todos/modifyTodo', async({todoId, data} : any) => {
  try {
    const response = await axios.put(TODOS_URL + `/${todoId}`, data);
    return response.data;
  } catch (err) {
    return new Error('an error occurred while modifying todo')
  }
})

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        alert('error fetching todos, please try again');
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        alert('error creating todo, please try again');
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        alert('error deleting todo, please try again');
      })
      .addCase(modifyTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map(todo => {
          if (todo.id !== action.payload.id) {
            return todo;
          }
          return action.payload;
        })
      })
  }
})

export default todoSlice.reducer;