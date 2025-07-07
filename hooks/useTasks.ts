import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

const TASKS_ASYNC_KEY = '@tasks';

export interface ITask {
  id: string;
  text: string;
}

export function useTasks() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem(TASKS_ASYNC_KEY);
        if (storedTasks) {
          const parsed: ITask[] = JSON.parse(storedTasks);
          setTasks(parsed);
        }
      } catch (error) {
        console.error('Failed to load tasks:', error);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem(TASKS_ASYNC_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.error('Failed to save tasks:', error);
      }
    };
    saveTasks();
  }, [tasks]);

  const addTask = (text: string) => {
    const trimmed = text.trim();
    if (trimmed) {
      const newTask = { id: uuidv4(), text: trimmed };
      setTasks(prev => [...prev, newTask]);
    }
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  return {
    tasks,
    addTask,
    deleteTask,
  };
}