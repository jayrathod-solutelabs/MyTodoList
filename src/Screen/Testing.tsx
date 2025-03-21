import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo

// Define task type
interface Task {
  id: string;
  title: string;
  time?: string;
  completed: boolean;
  icon: 'document-text' | 'trophy' | 'calendar';
  iconBgColor: string;
}

const Testing = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Study lesson',
      completed: false,
      icon: 'document-text',
      iconBgColor: '#E3EEFF'
    },
    {
        id: '1',
        title: 'Study lesson',
        completed: false,
        icon: 'document-text',
        iconBgColor: '#E3EEFF'
      },
      {
        id: '1',
        title: 'Study lesson',
        completed: false,
        icon: 'document-text',
        iconBgColor: '#E3EEFF'
      },
      {
        id: '1',
        title: 'Study lesson',
        completed: false,
        icon: 'document-text',
        iconBgColor: '#E3EEFF'
      },
    {
      id: '2',
      title: 'Run 5k',
      time: '4:00pm',
      completed: false,
      icon: 'trophy',
      iconBgColor: '#FFF9E3'
    },
    {
      id: '3',
      title: 'Go to party',
      time: '10:00pm',
      completed: false,
      icon: 'calendar',
      iconBgColor: '#EFE3FF'
    },
    {
      id: '4',
      title: 'Game meetup',
      time: '1:00pm',
      completed: true,
      icon: 'calendar',
      iconBgColor: '#EFE3FF'
    },
    {
      id: '5',
      title: 'Take out trash',
      completed: true,
      icon: 'document-text',
      iconBgColor: '#E3EEFF'
    },
  ]);

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getFormattedDate = () => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date().toLocaleDateString('en-US', options);
  };

  const renderTaskItem = (task: Task) => (
    <View key={task.id} style={styles.taskItem}>
      <View style={styles.taskContent}>
        <View style={[styles.iconContainer, { backgroundColor: task.iconBgColor }]}>
          <Ionicons 
            name={task.icon as any} 
            size={22} 
            color="#555" 
          />
        </View>
        <View style={styles.taskTextContainer}>
          <Text style={[
            styles.taskTitle, 
            task.completed && styles.completedTaskText
          ]}>
            {task.title} 
          </Text>
          {task.time && (
            <Text style={[
              styles.taskTime, 
              task.completed && styles.completedTaskText
            ]}>
              {task.time}
            </Text>
          )}
        </View>
      </View>
      <TouchableOpacity
        style={[styles.checkbox, task.completed && styles.checkedBox]}
        onPress={() => toggleTaskCompletion(task.id)}
      >
        {task.completed && <Ionicons name="checkmark" size={18} color="white" />}
      </TouchableOpacity>
    </View>
  );

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <View style={styles.container}>
              <View style={styles.purpleBackground} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.dateText}>{getFormattedDate()}</Text>
      </View>
      
      {/* Title */}
      <Text style={styles.title}>My Todo List</Text>
      
      {/* Task List */}
      <ScrollView style={styles.taskList}>
        <View style={styles.tasksContainer}>
          {pendingTasks.map(task => renderTaskItem(task))}
        </View>
        
        {completedTasks.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Completed</Text>
            <View style={styles.tasksContainer}>
              {completedTasks.map(task => renderTaskItem(task))}
            </View>
          </>
        )}
      </ScrollView>
      
      {/* Add Task Button */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add New Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5E35B1',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  dateText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  taskList: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  tasksContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 5,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  taskTextContainer: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  taskTime: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#DDDDDD',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#5E35B1',
    borderColor: '#5E35B1',
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: '#AAAAAA',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#5E35B1',
    margin: 20,
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  purpleBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%', // Adjust this value based on your design
    backgroundColor: '#5E35B1',
  },
});

export default Testing;
