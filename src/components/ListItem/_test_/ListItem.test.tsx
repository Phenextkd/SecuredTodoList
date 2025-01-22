import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ListItem from '../ListItem';

describe('ListItem', () => {
    const item = { id: 1, title: 'Test Todo' };
    const onDelete = jest.fn();
    const onUpdate = jest.fn();

    // Test case for rendering the todo item
    it('should render the todo item', () => {
        const { getByText } = render(<ListItem item={item} onDelete={onDelete} onUpdate={onUpdate} />);
        expect(getByText('Test Todo')).toBeTruthy();
    });

    // Test case for calling onDelete when delete button is pressed
    it('should call onDelete when delete button is pressed', () => {
        const { getByTestId } = render(<ListItem item={item} onDelete={onDelete} onUpdate={onUpdate} />);
        fireEvent.press(getByTestId(`delete-button-${item.id}`));
        expect(onDelete).toHaveBeenCalledWith(1);
    });

    // Test case for calling onUpdate when item is pressed
    it('should call onUpdate when item is pressed', () => {
        const { getByText } = render(<ListItem item={item} onDelete={onDelete} onUpdate={onUpdate} />);
        fireEvent.press(getByText('Test Todo'));
        expect(onUpdate).toHaveBeenCalledWith(item);
    });
});