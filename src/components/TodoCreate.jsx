import React from "react";
import { useState } from "react/cjs/react.development";

const TodoCreate = ({ onCreateTodo }) => {
  const [title, setTitle] = useState("");
  const createTodo = () => {
    if (title.length > 0) {
      onCreateTodo({
        title: title,
        status: "Pending",
      });
      setTitle("");
    }else{
      alert('Please write a task.')
    }
  };

  return (
    <div className="addTask">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Write Your Task..."
          aria-label="Write Your Task..."
          aria-describedby="button-addon2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          style={{ color: "#FFF" }}
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          onClick={(e) => createTodo()}
        >
          Button
        </button>
      </div>
    </div>
  );
};

export default TodoCreate;
