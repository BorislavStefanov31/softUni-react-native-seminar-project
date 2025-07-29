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

  const saveTasks = useCallback(async (tasksToSave: ITask[]) => {
    try {
      await AsyncStorage.setItem(TASKS_ASYNC_KEY, JSON.stringify(tasksToSave));
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  }, []);

  const addTask = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (trimmed) {
      const newTask = { id: uuidv4(), text: trimmed };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      await saveTasks(updatedTasks);
    }
  }, [tasks, saveTasks]);
  
  const deleteTask = useCallback(async (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  }, [tasks, saveTasks]);
  
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

  return {
    tasks,
    addTask,
    deleteTask,
  };
}