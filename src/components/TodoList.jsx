import React, { useContext, useState } from 'react';
import { TodoContext } from './TodoContext';

const TodoList = () => {
    const [todos, setTodos, editingID, setEditingID] = useContext(TodoContext);
    const [serachterm, setSearchTerm] = useState('');

    const handleDelete = (id) => {
        const filteredTodos = todos.filter((todo) => todo.id !== id);
        setTodos(filteredTodos);
        localStorage.setItem('todos', JSON.stringify(filteredTodos));
    };

    const filtered = todos.filter((todo) => todo.name.toLowerCase().includes(serachterm.toLowerCase()));

    return (
        <div className="h-full w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
            <h1 className="text-white text-3xl font-semibold mb-6 text-center">Todo List</h1>

            {/* Search Bar */}
            <div className='flex items-center justify-center'>
                <input
                    value={serachterm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    className="md:w-[40%] w-[80%]  p-4 mb-6 rounded-lg shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    placeholder="Search todos..."
                />

            </div>
            <div className="flex items-center justify-center gap-5 flex-wrap">
                {filtered.length === 0 ? (
                    <p className="text-white text-xl">No todos available.</p>
                ) : (
                    filtered.map((todo) => (
                        <div className="w-72 p-5 mb-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300" key={todo.id}>
                            <h3 className="text-xl font-bold text-gray-800">{todo.name}</h3>
                            <p className="text-gray-600">Email: <span className="text-gray-900">{todo.email}</span></p>
                            <p className="text-gray-600">Password: <span className="text-gray-900">{todo.password}</span></p>
                            <p className="text-gray-600">Comment: <span className="text-gray-900">{todo.comment}</span></p>
                            <p className="text-gray-600">Rating: <span className="text-gray-900">{todo.rating}</span></p>

                            {/* Buttons */}
                            <div className="mt-4 flex justify-between">
                                <button
                                    onClick={() => handleDelete(todo.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition duration-300"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => setEditingID(todo.id)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-300"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TodoList;
