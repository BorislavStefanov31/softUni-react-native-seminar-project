import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const TASKS_ASYNC_KEY = '@tasks';

export interface ITask {
  id: string;
  text: string;
}

export function useTasks() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const addTask = useCallback((text: string) => {
    const trimmed = text.trim();
    if (trimmed) {
      const newTask = { id: uuidv4(), text: trimmed };
      setTasks(prevTasks => [...prevTasks, newTask]);
    }
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }, []);

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
      } finally {
        setIsLoaded(true);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const saveTasks = async () => {
        try {
          await AsyncStorage.setItem(TASKS_ASYNC_KEY, JSON.stringify(tasks));
        } catch (error) {
          console.error('Failed to save tasks:', error);
        }
      };
      saveTasks();
    }
  }, [tasks, isLoaded]);

  return {
    tasks,
    addTask,
    deleteTask,
  };
}