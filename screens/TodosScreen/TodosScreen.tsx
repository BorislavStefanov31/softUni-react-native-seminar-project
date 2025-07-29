import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from './TodosScreenStyles';
import { useTasks, ITask } from '../../hooks/useTasks';
import { TodoStackParamList } from '../../App'; // Import the type

type TodosScreenNavigationProp = StackNavigationProp<TodoStackParamList, 'TodosList'>;

const keyExtractor = (item: ITask) => item.id;

export default function TodosScreen() {
    const [newTask, setNewTask] = useState('');
    const { tasks, addTask, deleteTask } = useTasks();
    const navigation = useNavigation<TodosScreenNavigationProp>();

    const handleAddTask = () => {
        addTask(newTask);
        setNewTask('');
    };

    const handleTodoPress = useCallback((todoId: string) => {
        navigation.navigate('Todo', { todoId });
    }, [navigation]);

    const showDeleteTaskModal = useCallback((taskId: string) => {
        Alert.alert(
            'Delete Task',
            'Are you sure you want to delete this task?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => deleteTask(taskId),
                },
            ],
            { cancelable: true }
        );
    }, [deleteTask]);

    const renderItem = useCallback(({ item }: { item: ITask }) => (
        <Pressable
            style={({ pressed }) => [
                {
                    opacity: pressed ? 0.6 : 1,
                },
            ]}
            onPress={() => handleTodoPress(item.id)} // Navigate on press
            onLongPress={() => showDeleteTaskModal(item.id)} // Delete on long press
        >
            <Text style={styles.task}>{item.text}</Text>
        </Pressable>
    ), [showDeleteTaskModal, handleTodoPress]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📝</Text>
            <Text style={styles.title}>To-Do List</Text>
            <TextInput
                style={styles.input}
                placeholder="Write your task here..."
                value={newTask}
                onChangeText={setNewTask}
            />
            <Button title="Add Task to the list +" onPress={handleAddTask} />
            <FlatList
                data={tasks}
                style={styles.flatListContainer}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
            />
        </View>
    );
}