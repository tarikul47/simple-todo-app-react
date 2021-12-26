import { useEffect, useState } from "react";
import shortid from "shortid";
import "./assets/App.css";
import SingleTodo from "./components/SingleTodo";
import TodoCreate from "./components/TodoCreate";
import TodoEmpty from "./components/TodoEmpty";

function App() {
  const [todos, setTodos] = useState([
    {
      id: shortid.generate(),
      title: "Task 1",
      status: "Pending",
    },
    {
      id: shortid.generate(),
      title: "Task 2",
      status: "Done",
    },
    {
      id: shortid.generate(),
      title: "Task 3",
      status: "Pending",
    },
    {
      id: shortid.generate(),
      title: "Task 4",
      status: "Pending",
    },
  ]);

  const [visibility, setVisibility] = useState("All");

  const [NewTodolist, setNewTodolist] = useState(todos);

  useEffect(() => {
    let pendingTasks = todos.filter((item) => item.status === "Pending");
    let doneTasks = todos.filter((item) => item.status === "Done");

    const tasks =
      visibility === "All"
        ? todos
        : visibility === "Pending"
        ? pendingTasks
        : visibility === "Done"
        ? doneTasks
        : [];
    setNewTodolist(tasks);
  }, [todos, visibility]);

  console.log(NewTodolist);

  /**
   * Add todo
   * @param {object} todo
   */
  const addTodo = (todo) => {
    let newTodos = todos.slice();
    newTodos.unshift(todo);
    setTodos(newTodos);
    setVisibility("All");
  };

  /**
   * Todo update
   * @param {Object} param0
   */
  const onUpdateTodo = ({ todo, index }) => {
    let newTodos = todos.slice();
    newTodos[index] = todo;
    setTodos(newTodos);
    setVisibility("All");
  };
  /**
   * Delete Todo
   * @param {Number} index
   */
  const deleteTodo = (index) => {
    if (window.confirm("Do you want to delete?")) {
      let newTodos = todos.slice();
      newTodos.splice(index, 1);
      setTodos(newTodos);
      setVisibility("All");
    }
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-lg-7 mx-auto">
            {/* <!-- Task Area --> */}
            <div className="todo-container mt-5">
              <div className="dots">
                <div className="dot1"></div>
                <div className="dot2"></div>
                <div className="dot3"></div>
              </div>
              <div className="row">
                <div className="col-lg-9 mx-auto text-white">
                  <div className="todo-box py-5">
                    <div className="my-name">
                      <h2>Hello, Guest !!!</h2>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <p>
                          All <span style={{ color: "#FFBD44" }}>Task</span>{" "}
                          List :(
                        </p>
                      </div>
                      <div className="col-lg-6">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          name="visibility"
                          value={visibility}
                          onChange={(e) => setVisibility(e.target.value)}
                        >
                          <option value="All">All</option>
                          <option value="Pending">Pending</option>
                          <option value="Done">Done</option>
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 my-3">
                        {/* Create task  */}
                        <TodoCreate
                          onCreateTodo={(todo) => addTodo(todo)}
                        ></TodoCreate>
                      </div>
                      {/* <!-- todo list start --> */}
                      <div className="col-lg-12 todo-list">
                        <ol className="list-group">
                          {todos?.length === 0 && <TodoEmpty></TodoEmpty>}
                          {NewTodolist.map((todo, index) => (
                            <SingleTodo
                              deleteTodo={deleteTodo}
                              onUpdateTodo={onUpdateTodo}
                              key={index}
                              index={index}
                              todo={todo}
                            ></SingleTodo>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
