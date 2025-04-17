import './App.css';
import { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit, FaTrash } from 'react-icons/fa';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("pending");


  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);


  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const handleAdd = () => {
    if (todo.trim().length < 3) return;
    if (editingId) {
      const updated = todos.map(item =>
        item.id === editingId ? { ...item, todo } : item
      );
      setTodos(updated);
      setEditingId(null);
    } else {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    }
    setTodo("");
  };

  const handleChange = (e) => setTodo(e.target.value);

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const updatedTodos = todos.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      const filteredTodos = todos.filter(item => item.id !== id);
      setTodos(filteredTodos);
    }
  };

  const handleEdit = (id) => {
    const selectedTodo = todos.find(item => item.id === id);
    if (selectedTodo && !editingId) {
      setTodo(selectedTodo.todo);
      setEditingId(id);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.isCompleted;
    if (filter === "pending") return !todo.isCompleted;
    return true;
  });

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl shadow-lg bg-violet-100 p-5 min-h-[80vh] max-w-3xl">
        <div className="addTodo my-5">
          <h2 className='text-xl font-bold mb-3'>Add a Todo</h2>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input
              onChange={handleChange}
              value={todo}
              onKeyDown={handleKeyDown}
              className='w-full sm:w-3/4 rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500'
              type="text"
              placeholder="Enter at least 3 characters"
            />
            <button
              onClick={handleAdd}
              className='cursor-pointer bg-violet-800 hover:bg-violet-950 px-5 py-2 text-white rounded-full shadow-sm text-sm font-semibold'
            >
              {editingId ? "Save" : "Add"}
            </button>
          </div>
        </div>

        <div className="filter mb-4">
          <label className='font-semibold text-sm mr-2'>Filter:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className='rounded-md px-3 py-1 bg-white border border-gray-300 text-sm shadow-sm'
          >
            <option value="all">All</option>
            <option value="completed">Finished</option>
            <option value="pending">Not Finished</option>
          </select>
        </div>

        <h2 className='text-lg font-bold mb-3'>Your Todos</h2>
        <div className="todos flex flex-col overflow-auto gap-4 h-[45vh]">
          {filteredTodos.length === 0 ? (
            <div className="text-center text-gray-500 text-sm mt-5">
              No record found.
            </div>
          ) : (
            filteredTodos.map(item => (
              <div
                key={item.id}
                className="todo flex justify-between items-center bg-white p-3 rounded-lg shadow-md"
              >
                <div className="flex items-center gap-3">
                  <input
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    name={item.id}
                    className="w-4 h-4"
                  />
                  <span className={`text-sm ${item.isCompleted ? "line-through text-gray-400" : "text-gray-800"}`}>
                    {item.todo}
                  </span>
                </div>
                <div className="flex gap-2 text-white">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className='cursor-pointer bg-blue-600 hover:bg-blue-800 p-2 rounded-full'
                    disabled={editingId !== null && editingId !== item.id}
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className='cursor-pointer bg-red-600 hover:bg-red-800 p-2 rounded-full'
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </>
  );
}

export default App;
