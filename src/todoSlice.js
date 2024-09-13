import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now().toString(),
        task: action.payload,
        completed: false,
        isEditing: false,
      };
      state.push(newTodo);
    },
    toggleComplete: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    toggleEdit: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.isEditing = !todo.isEditing;
      }
    },
    updateTodo: (state, action) => {
      const { id, task } = action.payload;
      const todo = state.find((todo) => todo.id === id);
      if (todo) {
        todo.task = task;
        todo.isEditing = false;
      }
    },
    restoreTodos: (state, action) => {
      return action.payload;
    },
  },
});

export const {
  addTodo,
  toggleComplete,
  deleteTodo,
  toggleEdit,
  updateTodo,
  restoreTodos,
} = todoSlice.actions;
export default todoSlice.reducer;
