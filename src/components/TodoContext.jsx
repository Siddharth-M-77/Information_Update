import React, { createContext, useState } from "react";

export const TodoContext = createContext();

const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState(() => {
        const localTodos = JSON.parse(localStorage.getItem("todos"));
        return localTodos || [];
    });

    const [editingID, setEditingID] = useState(null);

    return (
        <TodoContext.Provider value={[todos, setTodos, editingID, setEditingID]}>
            {children}
        </TodoContext.Provider>
    );
};

export default TodoProvider;
