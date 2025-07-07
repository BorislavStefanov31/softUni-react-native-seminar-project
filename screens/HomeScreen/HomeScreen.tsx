import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './HomeScreenStyles';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>👋</Text>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.subtitle}>This is the Home screen.</Text>
        </View>
    );
}