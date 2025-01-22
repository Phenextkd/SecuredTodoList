import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TodoListScreen from '../TodoListScreen';
import useTodos from '../../../hooks/useTodos';

jest.mock('../../../hooks/useTodos');

describe('TodoListScreen', () => {
    const mockUseTodos = useTodos as jest.MockedFunction<typeof useTodos>;
    const onLogout = jest.fn();

    beforeEach(() => {
        mockUseTodos.mockReturnValue({
            todos: [
                { id: 1, title: 'Test Todo 1' },
                { id: 2, title: 'Test Todo 2' },
            ],
            addTodo: jest.fn(),
            deleteTodo: jest.fn(),
            updateTodo: jest.fn(),
        });
    });

    // Test case for rendering the todo list
    it('should render the todo list', () => {
        const { getByText } = render(<TodoListScreen onLogout={onLogout} />);
        expect(getByText('Test Todo 1')).toBeTruthy();
        expect(getByText('Test Todo 2')).toBeTruthy();
    });

    // Test case for adding a new todo item
    it('should add a new todo', () => {
        const { getByPlaceholderText, getByText } = render(<TodoListScreen onLogout={onLogout} />);
        const input = getByPlaceholderText('Add new todo');
        const addButton = getByText('Add');

        fireEvent.changeText(input, 'New Todo');
        fireEvent.press(addButton);

        expect(mockUseTodos().addTodo).toHaveBeenCalledWith('New Todo');
    });

    // Test case for deleting a todo item
    it('should delete a todo', () => {
        const { getByTestId } = render(<TodoListScreen onLogout={onLogout} />);
        fireEvent.press(getByTestId('delete-button-1'));

        expect(mockUseTodos().deleteTodo).toHaveBeenCalledWith(1);
    });

    // Test case for updating a todo item
    it('should update a todo', () => {
        const { getByText, getByPlaceholderText } = render(<TodoListScreen onLogout={onLogout} />);
        const todoItem = getByText('Test Todo 1');

        fireEvent.press(todoItem);

        const input = getByPlaceholderText('Update todo');
        const updateButton = getByText('Update Todo');

        fireEvent.changeText(input, 'Updated Todo');
        fireEvent.press(updateButton);

        expect(mockUseTodos().updateTodo).toHaveBeenCalledWith(1, 'Updated Todo');
    });

    // Test case for calling onLogout when logout button is pressed
    it('should call onLogout when logout button is pressed', () => {
        const { getByText } = render(<TodoListScreen onLogout={onLogout} />);
        const logoutButton = getByText('Logout');

        fireEvent.press(logoutButton);

        expect(onLogout).toHaveBeenCalled();
    });
});