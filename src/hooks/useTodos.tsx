import { useState } from 'react';

interface Todo {
    id: number;
    title: string;
}

const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([
        { id: 1, title: 'List Item 1' },
        { id: 2, title: 'List Item 2' },
        { id: 3, title: 'List Item 3' },
    ]);

    // Function to add a new todo item
    const addTodo = (title: string) => {
        const newTodo = { id: Date.now(), title };
        setTodos([...todos, newTodo]);
    };

    // Function to delete a todo item by id
    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    // Function to update the title of a todo item by id
    const updateTodo = (id: number, title: string) => {
        setTodos(todos.map(todo => (todo.id === id ? { ...todo, title } : todo)));
    };

    return {
        todos,
        addTodo,
        deleteTodo,
        updateTodo,
    };
};

export default useTodos;