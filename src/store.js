import { configureStore } from "@reduxjs/toolkit";
import todosReducer, { restoreTodos } from "./todoSlice";

const savedTodos = JSON.parse(localStorage.getItem("todos"));

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  preloadedState: {
    todos: savedTodos || [],
  },
});
if (savedTodos) {
  store.dispatch(restoreTodos(savedTodos));
}

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("todos", JSON.stringify(state.todos));
});

export default store;
