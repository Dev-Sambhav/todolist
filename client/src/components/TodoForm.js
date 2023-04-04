import {useState} from "react"

const TodoForm = () => {
    const [text, setText] = useState("");

    // handle change
    const handleChange = (e)=>{
        setText(e.target.value);
    }

    // handle submit
    const handleSubmit = (e)=>{
        e.preventdefault();
    }
  return (
    <form className="todo_form" onSubmit={handleSubmit} >
        <input 
            type="text"
            className="todo_input"
            onChange={handleChange}
            value={text}
         />
    </form>
  )
}
export default TodoForm