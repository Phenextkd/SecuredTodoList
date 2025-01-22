import React, { createContext, useContext, useState } from 'react';
import { Todo } from '../types/Todo';

interface TodoContextType {
    todos: Todo[];
    addTodo: (title: string) => void;
    updateTodo: (id: string, completed: boolean) => void;
    deleteTodo: (id: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodo = (title: string) => {
        const newTodo: Todo = { id: Date.now().toString(), title, completed: false };
        setTodos(prev => [...prev, newTodo]);
    };

    const updateTodo = (id: string, completed: boolean) => {
        setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, completed } : todo));
    };

    const deleteTodo = (id: string) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodos = () => {
    const context = useContext(TodoContext);
    if (!context) throw new Error('useTodos must be used within a TodoProvider');
    return context;
};