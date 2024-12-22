import React, { useContext, useState, useEffect } from 'react';
import { TodoContext } from './TodoContext';

const Todo = () => {
    const [formData, setFormData] = useState({
        feedbackType: '',
        name: '',
        email: '',
        password: '',
        rating: '',
        comment: '',
    });
    const [todos, setTodos, editingID, setEditingID] = useContext(TodoContext);

    useEffect(() => {
        if (editingID) {
            const todoToEdit = todos.find(todo => todo.id === editingID);
            if (todoToEdit) {
                setFormData(todoToEdit);
            }
        }
    }, [editingID, todos]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if any field is empty
        if (!formData.feedbackType || !formData.name || !formData.email || !formData.password || !formData.rating || !formData.comment) {
            alert("Please fill in all fields before submitting.");
            return; // Prevent further execution
        }

        if (editingID) {
            // Edit todo if editing
            const updatedTodos = todos.map(todo =>
                todo.id === editingID ? { ...todo, ...formData } : todo
            );
            setTodos(updatedTodos);

            // Save todos to localStorage right after updating
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            setEditingID(null);
        } else {
            // Add new todo
            const newTodo = { id: Date.now(), ...formData };
            const newTodos = [...todos, newTodo];
            setTodos(newTodos);

            // Save todos to localStorage immediately
            localStorage.setItem('todos', JSON.stringify(newTodos));
        }

        // Clear form fields after submission
        setFormData({
            feedbackType: '',
            name: '',
            email: '',
            password: '',
            rating: '',
            comment: '',
        });
    };


    return (
        <div className='w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6'>
            <form onSubmit={handleSubmit} className='max-w-xl mx-auto p-8 bg-white rounded-lg shadow-xl '>
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    {editingID ? 'Edit Todo' : 'Add New Todo'}
                </h2>

                <select
                    onChange={handleChange}
                    className='w-full p-3 mb-4 bg-gray-100 border border-gray-300 rounded-md text-gray-700'
                    name="feedbackType"
                    value={formData.feedbackType}
                >
                    <option value="">Select Feedback Type</option>
                    <option value="bug">Bug</option>
                    <option value="feature">Feature</option>
                    <option value="performance">Performance</option>
                    <option value="accessibility">Accessibility</option>
                    <option value="security">Security</option>
                    <option value="other">Other</option>
                </select>

                <input
                    onChange={handleChange}
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    className='w-full p-3 mb-4 bg-gray-100 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400'
                />

                <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    className='w-full p-3 mb-4 bg-gray-100 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400'
                />

                <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    className='w-full p-3 mb-4 bg-gray-100 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400'
                />

                <select
                    onChange={handleChange}
                    name="rating"
                    value={formData.rating}
                    className='w-full p-3 mb-4 bg-gray-100 border border-gray-300 rounded-md text-gray-700'
                >
                    <option value="">Select Rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

                <textarea
                    onChange={handleChange}
                    name="comment"
                    cols="30"
                    rows="5"
                    placeholder="Enter your comment"
                    value={formData.comment}
                    className='w-full p-3 mb-6 bg-gray-100 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400'
                ></textarea>

                <button
                    type="submit"
                    className='w-full p-3 bg-indigo-600 text-white rounded-md text-xl hover:bg-indigo-700 transition duration-300'
                >
                    {editingID ? 'Update Todo' : 'Submit Todo'}
                </button>
            </form>
        </div>
    );
};

export default Todo;
