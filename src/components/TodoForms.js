import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { addTodo } from "../todoSlice";
import { useDispatch } from "react-redux";

export const TodoForms = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = value.trim();
    if (trimmedValue) {
      dispatch(addTodo(value));
      setValue("");
    } else alert("Cant add empty task to todo list");
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <TextField
        type="text"
        className="todo-input"
        placeholder="What the task today "
        onChange={(e) => setValue(e.target.value)}
        value={value}
        style={{ marginBottom: "1rem", color: "red" }}
        sx={{
          "& .MuiInputBase-input": {
            color: "#1556ff",
          },
          "& .MuiInputBase-input::placeholder": {
            color: "#1556ff",
            opacity: 1,
          },
        }}
      />
      <Button
        type="submit"
        className="todo-btn"
        variant="contained"
        color="primary"
        fullWidth
      >
        Add Task
      </Button>
    </form>
  );
};
