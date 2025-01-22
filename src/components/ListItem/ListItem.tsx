import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './ListItemStyles';

interface ListItemProps {
  item: { id: number; title: string };
  onDelete: (id: number) => void;
  onUpdate: (item: { id: number; title: string }) => void;
}

const ListItem: React.FC<ListItemProps> = ({ item, onDelete, onUpdate }) => {
  return (
    <TouchableOpacity onPress={() => onUpdate(item)}>
      <View style={styles.todoContainer}>
        <Text style={styles.todoText}>{item.title}</Text>
        <TouchableOpacity
          onPress={() => onDelete(item.id)}
          style={styles.deleteButton}
          testID={`delete-button-${item.id}`}
        >
          <Text style={styles.deleteButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;