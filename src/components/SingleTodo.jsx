import React, { useState } from "react";

const ShowTask = (props) => {
  const { deleteTodo, onUpdateTodo, index, todo } = props;

  const [todoEditing, setTodoEditing] = useState(null);

  const [title, setTitle] = useState(todo.title);
  const [status, setStatus] = useState(todo.status);

  const complete = (todo.status === 'Done') ? 'complete' : ''
  
  //console.log(status);

  const editTodo = () => {
    if (title.length > 0) {
      onUpdateTodo({
        index: index,
        todo: {
          id: todo.id,
          title,
          status,
        },
      });
    }
  };

  return (
    <>
      <li className={`list-group-item tasks mb-2 ${complete}`}>
        <ol className="list-group" width="100%">
          <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold text-white">
                {todo.status === "Pending" && todo.title}             
                {todo.status === "Done" && <del>{todo.title}</del>}
              </div>
            </div>
            <div className="ms-2">
              <div id={`showHide${todo.id}`} className="fw-bold">
                <span
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${todo.id}`}
                  className="clickbtn view"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <i className="fas fa-eye"></i>
                </span>

                <span
                  className="clickbtn update"
                  onClick={() => {
                    setTodoEditing(index);     
                    const btnBox =  document.querySelector(`#showHide${todo.id}`);             
                    btnBox.style.display = "none";
                  }}
                >
                  <i className="fas fa-pen-square"></i>
                </span>
                <span
                  className="clickbtn delete"
                  onClick={() => deleteTodo(index)}
                >
                  <i className="far fa-trash-alt"></i>
                </span>
              </div>
            </div>
          </li>
          {todoEditing === index && (
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 inputBtn">
                <div className="fw-bold">
                  <div className="d-flex">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Task Name"
                      value={todo.title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Done">Complete</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="ms-2">
                <div className="fw-bold">
                  <span className="clickbtn update" onClick={(e) => editTodo()}>
                    <i className="fas fa-save"></i>
                  </span>
                  <span
                    className="clickbtn delete"
                    onClick={() => {                  
                      setTodoEditing(null)
                      const btnBox =  document.querySelector(`#showHide${todo.id}`);
                      btnBox.style.display = "block";
                    }}
                  >
                    <i className="fas fa-times-circle"></i>
                  </span>
                </div>
              </div>
            </li>
          )}
        </ol>
      </li>

      <div id={`collapse${todo.id}`} className="accordion-collapse collapse">
        <div className="accordion-body tasks">
          <ol
            className="list-group list-group-numbered"
            style={{ width: "100%" }}
          >
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold text-white">Task Name:</div>
              </div>
              <span className="badge bg-primary rounded-pill">
                {todo.title}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold text-white">Task Status:</div>
              </div>
              <span className="badge bg-primary rounded-pill">
                {todo.status}
              </span>
            </li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default ShowTask;
