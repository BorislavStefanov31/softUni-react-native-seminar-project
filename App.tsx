import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import TodosScreen from './screens/TodosScreen/TodosScreen';
import TodoScreen from './screens/TodoScreen/TodoScreen';

const Tab = createBottomTabNavigator();
const TodoStack = createStackNavigator();

export type TodoStackParamList = {
  TodosList: undefined;
  Todo: { todoId: string };
};

function TodosStackNavigator() {
  return (
    <TodoStack.Navigator>
      <TodoStack.Screen 
        name="TodosList" 
        component={TodosScreen}
        options={{ title: 'Todos' }}
      />
      <TodoStack.Screen 
        name="Todo" 
        component={TodoScreen}
        options={{ title: 'Todo Details' }}
      />
    </TodoStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen 
          name="Todos" 
          component={TodosStackNavigator}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}