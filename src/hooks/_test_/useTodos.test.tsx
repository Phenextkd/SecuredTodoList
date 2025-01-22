import { renderHook, act } from '@testing-library/react-hooks';
import useTodos from '../useTodos';

describe('useTodos', () => {
    // Test case for adding a new todo item
    it('should add a new todo', () => {
        const { result } = renderHook(() => useTodos());

        act(() => {
            result.current.addTodo('New Todo');
        });

        expect(result.current.todos).toHaveLength(4);
        expect(result.current.todos[3].title).toBe('New Todo');
    });

    // Test case for deleting a todo item by id
    it('should delete a todo', () => {
        const { result } = renderHook(() => useTodos());

        act(() => {
            result.current.deleteTodo(1);
        });

        expect(result.current.todos).toHaveLength(2);
        expect(result.current.todos.find(todo => todo.id === 1)).toBeUndefined();
    });

    // Test case for updating the title of a todo item by id
    it('should update a todo', () => {
        const { result } = renderHook(() => useTodos());

        act(() => {
            result.current.updateTodo(1, 'Updated Todo');
        });

        expect(result.current.todos.find(todo => todo.id === 1)?.title).toBe('Updated Todo');
    });
});