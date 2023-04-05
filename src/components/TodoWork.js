import { AiOutlineDelete } from "react-icons/ai";

import "./TodoWork.css";

const TodoWork = ({ todos, toggleTodoComplete, deleteTodo }) => {
  return (
    <>
      <div className="todo_container">
        {todos.map((todo) => (
          <div
            className={
              todo.completed ? "todo_item item_completed" : "todo_item"
            }
            key={todo.id}
          >
            <div className="todo_item_left">
              <input
                type="checkbox"
                checked={todo.completed ? "checked" : ""}
                className="todo_checkbox"
                onChange={() => toggleTodoComplete(todo)}
              />
              <p
                className={
                  todo.completed ? "todo_text text_completed" : "todo_text"
                }
                onClick={() => toggleTodoComplete(todo)}
              >
                {todo.text}
              </p>
            </div>
            <div className="todo_item_right">
              <div className="btn_delete" onClick={()=>deleteTodo(todo)}>
                <AiOutlineDelete />
              </div>
            </div>
          </div>
        ))}
      </div>
      {todos.length >= 1 && (
        <div className="total_todo">
          <p>{`You have ${todos.length} todos`}</p>
        </div>
      )}
    </>
  );
};
export default TodoWork;
