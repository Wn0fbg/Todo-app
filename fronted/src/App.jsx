import { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineDone, MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

function App() {
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedText, setEditedText] = useState("");

  const getTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/todos");
      setTodos(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/todos", {
        description,
        completed: false,
      });
      setDescription("");
      getTodos();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex justify-center items-center p-4 text-white">
      <div className="bg-gray-50 rounded-2xl shadow-xl w-full max-w-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Todo App</h1>
        <form
          onSubmit={onSubmitForm}
          className="flex items-center gap-2 shadow-sm p-2 rounded-lg mb-6"
        >
          <input
            className="flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What needs to be done?"
            required
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium cursor-pointer">
            Add Task
          </button>
        </form>
        <div>
          {todos.length === 0 ? (
            <p className="text-gray-600">No tasks avaible. Add a new task</p>
          ) : (
            <div className="flex flex-col gap-y-4">
              {todos.map((todo) => (
                <div key={todo.todo_id} className="pb-4">
                  {editingTodo === todo.todo_id ? (
                    <div className="text-black">hello</div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-x-4">
                        <button
                          className={`h-6 w-6 rounded-full flex items-center justify-center ${todo.completed ? "bg-green-500 border-green-500 text-white" : "bg-gray-300 border-gray-300 hover:border-blue-400 border-2"}`}
                        >
                          {todo.completed && <MdOutlineDone size={16} />}
                        </button>
                        <span className="text-black">{todo.description}</span>
                      </div>
                      <div className="flex gap-x-2">
                        <button
                          onClick={() => {
                            setEditingTodo(todo.todo_id);
                            setEditedText(todo.description);
                          }}
                          className="text-blue-500 p-2 hover:text-blue-700 rounded-lg hover:bg-blue-50 duration-200"
                        >
                          <MdModeEditOutline />
                        </button>
                        <button className="text-red-500 hover:text-red-700 hover:bg-red-50 duration-200">
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
