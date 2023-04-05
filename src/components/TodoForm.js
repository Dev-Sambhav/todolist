import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

import "./TodoForm.css";
import TodoWork from "./TodoWork";

const TodoForm = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // handle change
  const handleChange = (e) => {
    setText(e.target.value);
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text === "") {
      alert("Please enter a valid todo");
      return;
    }
    // add a todo into database
    const added = await addDoc(collection(db, "todos"), {
      text: text,
      completed: false,
    });
    if (added) setText("");
  };

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todoArr = [];
      querySnapshot.forEach((doc) => {
        todoArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todoArr);
    });
    return () => unsub();
  }, []);

  // update todo
  const toggleTodoComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  // delete todo
  const deleteTodo = async (todo) => {
    if (todo.completed) {
      await deleteDoc(doc(db, "todos", todo.id));
    }else{
      alert("Please complete your todo")
    }
  };

  return (
    <>
      <form className="todo_form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="todo_input"
          onChange={handleChange}
          placeholder="Enter new todo"
          value={text}
        />
        <button className="btn_add">Add</button>
      </form>
      <TodoWork
        todos={todos}
        toggleTodoComplete={toggleTodoComplete}
        deleteTodo={deleteTodo}
      />
    </>
  );
};
export default TodoForm;
