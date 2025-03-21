import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function AddTaskScreen() {
  const [taskTitle, setTaskTitle] = useState('');
  const navigation = useNavigation();

  const handleAddTask = () => {
    // TODO: Implement task addition logic
    console.log('Adding task:', taskTitle);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />
      <TouchableOpacity 
        style={styles.button}
        onPress={handleAddTask}
      >
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 