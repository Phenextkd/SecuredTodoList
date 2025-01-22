import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Alert, Modal, TouchableOpacity } from 'react-native';
import useTodos from '../../hooks/useTodos';
import styles from './TodoListScreenStyles';
import ListItem from '../../components/ListItem/ListItem';

const TodoListScreen: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
    const { todos, addTodo, deleteTodo, updateTodo } = useTodos();
    const [title, setTitle] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState<{ id: number, title: string } | null>(null);
    const [updatedTitle, setUpdatedTitle] = useState('');

    // Function to handle adding a new todo item
    const handleAddTodo = () => {
        if (title.trim()) {
            addTodo(title);
            setTitle('');
        } else {
            Alert.alert('Please enter a valid TODO title');
        }
    };

    // Function to handle updating an existing todo item
    const handleUpdateTodo = () => {
        if (selectedTodo && updatedTitle.trim()) {
            updateTodo(selectedTodo.id, updatedTitle);
            setModalVisible(false);
            setUpdatedTitle('');
        } else {
            Alert.alert('Please enter a valid TODO title');
        }
    };

    // Function to handle deleting a todo item
    const handleDeleteTodo = (id: number) => {
        deleteTodo(id);
    };

    // Function to open the modal for updating a todo item
    const openUpdateModal = (todo: { id: number, title: string }) => {
        setSelectedTodo(todo);
        setUpdatedTitle(todo.title);
        setModalVisible(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setModalVisible(false);
        setUpdatedTitle('');
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add new todo"
                    value={title}
                    onChangeText={setTitle}
                />
                <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={todos}
                renderItem={({ item }) => (
                    <ListItem
                        item={item}
                        onDelete={handleDeleteTodo}
                        onUpdate={openUpdateModal}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
            <Modal
                visible={modalVisible}
                onRequestClose={closeModal}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Update todo"
                            value={updatedTitle}
                            onChangeText={setUpdatedTitle}
                        />
                        <TouchableOpacity style={styles.modalButton} onPress={handleUpdateTodo}>
                            <Text style={styles.modalButtonText}>Update Todo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                            <Text style={styles.modalButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity style={styles.actionButton} onPress={onLogout}>
                <Text style={styles.actionButtonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default TodoListScreen;
