import React, { Fragment, useState } from "react";
import { TodoForms } from "./TodoForms";
import { Todo } from "./Todo";
import { EditTodoForms } from "./EditTodoForm.js";
import { ConfirmDialog } from "./Huja";
import { MoodCheck } from "./MoodCheck";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleComplete,
  deleteTodo,
  toggleEdit,
  updateTodo,
} from "../todoSlice";

export const TodoWrapper = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const [todoToDelete, setTodoToDelete] = useState(null);

  const handleToggleComplete = (id) => {
    dispatch(toggleComplete(id));
  };

  const handleOpenDeleteModal = (todo) => {
    setTodoToDelete(todo);
  };

  const handleCloseDeleteModal = () => {
    setTodoToDelete(null);
  };

  const confirmDeleteTask = () => {
    if (todoToDelete) {
      dispatch(deleteTodo(todoToDelete.id));
      handleCloseDeleteModal();
    }
  };

  const editTodo = (id) => {
    dispatch(toggleEdit(id));
  };

  const editTask = (task, id) => {
    dispatch(updateTodo({ task, id }));
  };

  return (
    <div className="TodoWrapper">
      <h1>Get tasks done!</h1>
      <TodoForms />
      <div className="mood-check">
        <MoodCheck />
      </div>

      {todos.map((todo) => (
        <Fragment key={todo.id}>
          {todo.isEditing && <EditTodoForms task={todo} editTodo={editTask} />}

          {!todo.isEditing && (
            <Todo
              task={todo}
              toggleComplete={handleToggleComplete}
              deleteTask={() => handleOpenDeleteModal(todo)}
              editTodo={editTodo}
            />
          )}
        </Fragment>
      ))}

      <ConfirmDialog
        open={!!todoToDelete}
        onClose={handleCloseDeleteModal}
        task={todoToDelete?.task}
        onConfirm={confirmDeleteTask}
      />
    </div>
  );
};
