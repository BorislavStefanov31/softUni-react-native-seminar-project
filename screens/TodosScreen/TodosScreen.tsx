// TodosScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, Pressable } from 'react-native';
import { styles } from './TodosScreenStyles';
import { useTasks, ITask } from '../../hooks/useTasks';

const keyExtractor = (item: ITask) => item.id;

export default function TodosScreen() {
    const [newTask, setNewTask] = useState('');
    const { tasks, addTask, deleteTask } = useTasks();

    const handleAddTask = () => {
        addTask(newTask);
        setNewTask('');
    };

    const showDeleteTaskModal = (taskId: string) => {
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
    };

    const renderItem = ({ item }: { item: ITask }) => (
        <Pressable
            style={({ pressed }) => [
                {
                    opacity: pressed ? 0.3 : 1,
                },
            ]}
            onLongPress={() => showDeleteTaskModal(item.id)}
        >
            <Text style={styles.task}>{item.text}</Text>
        </Pressable>
    );

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