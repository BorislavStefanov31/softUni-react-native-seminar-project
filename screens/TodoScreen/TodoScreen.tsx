import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { TodoStackParamList } from '../../App';
import { styles } from './TodoScreenStyles';

type TodoScreenRouteProp = RouteProp<TodoStackParamList, 'Todo'>;

export default function TodoScreen() {
    const route = useRoute<TodoScreenRouteProp>();
    const { todoId } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.idText}>{`ID: ${todoId}`}</Text>
        </View>
    );
}