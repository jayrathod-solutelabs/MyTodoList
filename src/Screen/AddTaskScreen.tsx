import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, Platform, Keyboard , ToastAndroid, ActivityIndicator } from "react-native"
const logoImg = require("../assets/home-background.png");
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from "react-redux";
import { addTask, fetchTasks, updateTask } from "./AddTodoSlice";
import { commonStyles } from "../styles/commonStyles";
import { RootStackParamList } from "../Navigation/StackNavigation";
import { StackScreenProps } from "@react-navigation/stack";
import CategoryUtils, { CategoryType } from "../utils/categoryUtils";
import { AppDispatch, RootState } from "../../store";
import { Task } from "./AddTodoSlice";

type AddTaskScreenProps = StackScreenProps<RootStackParamList, 'AddTask' | 'EditTask'>;



const AddTaskScreen: React.FC<AddTaskScreenProps> = ({ route, navigation }) => {

    const dispatch = useDispatch<AppDispatch>();
    const existingTask = route.params?.task;
    const isEditMode = !!existingTask;
    

    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const loading = useSelector((state: RootState) => state.tasks.loading);
    const error = useSelector((state: RootState) => state.tasks.error);

    const [title, setTitle] = useState(existingTask?.meta.title || '');
    const [notes, setNotes] = useState(existingTask?.description || '');
    const [selectedCategory, setSelectedCategory] = useState(existingTask?.meta.category || CategoryUtils.defaultCategory);

    // State for date and time
    const [date, setDate] = useState(existingTask?.meta.date ? new Date(existingTask.meta.date) : new Date());
    const [time, setTime] = useState(existingTask?.meta.time ? new Date(existingTask.meta.time) : new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    // Formatted values for display
    const formattedDate = format(date, 'MMM dd, yyyy');
    const formattedTime = format(time, 'hh:mm a');

    const handleCategoryPress = (category: CategoryType) => {
        setSelectedCategory(category);
    }


    // Date picker handler
    const onDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    // Time picker handler
    const onTimeChange = (event: any, selectedTime?: Date) => {
        const currentTime = selectedTime || time;
        setShowTimePicker(Platform.OS === 'ios');
        setTime(currentTime);
    };

    // Show date picker
    const showDatePickerModal = () => {
        Keyboard.dismiss();
        setShowDatePicker(true);
    };

    // Show time picker
    const showTimePickerModal = () => {
        Keyboard.dismiss();
        setShowTimePicker(true);
    };

    const handleAddTask = async () => {
        if (!title.trim()) {
            if (Platform.OS === 'android') {
                ToastAndroid.show("Please enter a title", ToastAndroid.SHORT);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Validation Error',
                    text2: 'Please enter a title',
                });
            }
            return;
        }
    
  
        const taskData: Omit<Task, "id"> & { meta: { isCompleted: boolean } } = {
            description: notes,
            completed : false,
            meta: {
              title,
              category: selectedCategory,
              date: date.toISOString(),
              time: time.toISOString(),
              isCompleted: false, 
            },
          };
        
          try {
            if (isEditMode && existingTask) {
                await dispatch(updateTask({ ...existingTask, ...taskData })).unwrap();
            } else {
                console.log("Task data:", taskData);
                await dispatch(addTask({ ...taskData })).unwrap();
            }
            dispatch(fetchTasks());
    
            navigation.goBack();
        } catch (error) {
            console.error("Task operation failed:", error);
        }

    }



    return (

        <View style={commonStyles.baseContainer}>
            <View style={styles.headerContainer}>
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />


                <Image source={logoImg} style={styles.backgroundImage} />
                <View style={styles.textContainer}>
                    <Text style={styles.headerTitle}>{isEditMode ? 'Edit Task' : 'Add New Task'}</Text>
                    
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => navigation.goBack()}>
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={styles.formContainer}>
                <Text style={styles.labelText}>Task Title</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInputContainer}
                        placeholder="Task Title"
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>
                <Text style={styles.labelText}>Category</Text>
                <View style={styles.iconsContainer}>
                    {CategoryUtils.categories.map((category) => (
                        <TouchableOpacity
                            key={category}
                            style={[
                                commonStyles.categoryIconCircle,
                                CategoryUtils.getBgColor(category),
                                selectedCategory === category && styles.selectedCategory
                            ]}
                            onPress={() => setSelectedCategory(category)}
                        >
                            <Image source={CategoryUtils.getIcon(category)} style={commonStyles.categoryIcon} />
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.dateTimeContainer}>
                    <View style={styles.dateContainer}>
                        <Text style={styles.labelText} >Date</Text>
                        <View style={styles.inputWithIcon}>
                            <TextInput
                                style={styles.dateTimeInput}
                                placeholder="Date"
                                value={formattedDate}
                                onFocus={showDatePickerModal}
                            />
                            <Image
                                source={require('../assets/date_icon.png')}
                                style={commonStyles.inputIcon}
                            />
                        </View>
                        {showDatePicker && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                onChange={onDateChange}
                            />
                        )}
                    </View>
                    <View style={styles.timeContainer}>
                        <Text style={styles.labelText}>Time</Text>
                        <View style={styles.inputWithIcon}>
                            <TextInput
                                style={styles.dateTimeInput}
                                placeholder="Time"
                                value={formattedTime}
                                onFocus={showTimePickerModal}
                            />
                            <Image
                                source={require('../assets/time_icon.png')}
                                style={commonStyles.inputIcon}
                            />
                        </View>
                        {showTimePicker && (
                            <DateTimePicker
                                value={time}
                                mode="time"
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                onChange={onTimeChange}
                            />
                        )}
                    </View>
                </View>




                <Text style={styles.labelText}>Notes</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.NotesInputContainer}
                        placeholder="Notes"
                        multiline={true}
                        numberOfLines={4}
                        value={notes}
                        onChangeText={setNotes}
                    />
                </View>
                <TouchableOpacity
                    style={[styles.addButton, loading && styles.disabledButton]}
                    onPress={handleAddTask}
                    disabled={loading}
                    >
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={commonStyles.addButtonText}>
                        {isEditMode ? "Update Task" : "Add New Task"}
                        </Text>
                    )}
                    </TouchableOpacity>

            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({

    headerContainer: {
        height: 100,
        width: '100%',
        position: 'relative'
    },
    backgroundImage: {
        width: '100%',
        height: '100%'
    },
    headerTitle: {
        fontSize: 20,
        color: 'white',
        textShadowRadius: 10,
        fontFamily: 'Inter-Bold'
    },
    textContainer: {
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 24,
        left: 20,
        height: 34,
        width: 36,
        borderRadius: 40,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    closeButtonText: {
        fontSize: 20,
        color: 'black'
    },
    formContainer: {
        flex: 1,
        padding: 20,
    },
    labelText: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 10,
        marginTop: 15,
        fontFamily: 'Inter-Regular'
    },
    inputContainer: {
        marginBottom: 10
    },
    iconsContainer: {
        marginBottom: 10,
        flexDirection: 'row'
    },
    textInputContainer: {
        borderWidth: 0.1,
        shadowColor: 'black',
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 15,
        fontSize: 14
    },
    NotesInputContainer: {
        borderWidth: 0.1,
        shadowColor: 'black',
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 15,
        fontSize: 14,
        height: 150,
        textAlignVertical: 'top'
    },
    disabledButton: {
        backgroundColor: "#A9A9A9", 
    },
    addButton: {
        backgroundColor: '#5E35B1',
        marginTop: 20,
        marginBottom: 50,
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: 'center'
    },
    dateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateContainer: {
        flex: 1,
        marginRight: 10
    },
    timeContainer: {
        flex: 1,
        marginLeft: 10
    },
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10
    },
    dateTimeInput: {
        flex: 1,
        fontSize: 16
    },

    selectedCategory: {
        borderColor: '#5E35B1',
        borderWidth: 2
    }
});

export default AddTaskScreen