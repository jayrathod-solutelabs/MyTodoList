import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, Platform, Keyboard } from "react-native"
const logoImg = require("../assets/home-background.png");
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { useState } from "react";
import { format } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch } from "react-redux";
import { addTask } from "../../AddTodoSlice";
import { commonStyles } from "../styles/commonStyles";


const AddTaskScreen = () => {
    const navigation = useNavigation();

    const dispatch = useDispatch();

    const [title, setTitle] = useState('')
    const [notes, setNotes] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('work');

    // State for date and time
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    // Formatted values for display
    const formattedDate = format(date, 'MMM dd, yyyy');
    const formattedTime = format(time, 'hh:mm a');

    const handleCategoryPress = (category: string) => {
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

    const handleAddTask = () => {

        let taskCategory: 'work' | 'personal' | 'event' | 'other';

        if (selectedCategory === 'work' || selectedCategory === 'personal' || selectedCategory === 'event') {
            taskCategory = selectedCategory;
        } else {
            taskCategory = 'other';
        }

        const newTask = {
            id: Date.now().toString(),
            title,
            category: taskCategory,
            date: date.toISOString(),
            time: time.toISOString(),
            notes,
            isCompleted: false
        }

        dispatch(addTask(newTask))
        navigation.goBack()
    }



    return (

        <View style={commonStyles.baseContainer}>
            <View style={styles.headerContainer}>
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />


                <Image source={logoImg} style={styles.backgroundImage} />
                <View style={styles.textContainer}>
                    <Text style={styles.headerTitle}>Add New Task</Text>
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
                        onChangeText={setTitle}
                    />
                </View>
                <Text style={styles.labelText}>Category</Text>
                <View style={styles.iconsContainer}>
                    <TouchableOpacity style={[commonStyles.categoryIconCircle, commonStyles.categoryWorkBgColorr, selectedCategory === 'work' && styles.selectedCategory]} onPress={() => handleCategoryPress('work')}>
                        <Image source={require("../assets/work_icon.png")} style={commonStyles.categoryIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[commonStyles.categoryIconCircle, commonStyles.categoryEventBgColor, selectedCategory === 'event' && styles.selectedCategory]} onPress={() => handleCategoryPress('event')}>
                        <Image source={require("../assets/event_icon.png")} style={commonStyles.categoryIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[commonStyles.categoryIconCircle, commonStyles.categoryPersonalBgColor, selectedCategory === 'personal' && styles.selectedCategory]} onPress={() => handleCategoryPress('personal')}>
                        <Image source={require("../assets/personal_icon.png")} style={commonStyles.categoryIcon} />
                    </TouchableOpacity>
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
                        onChangeText={setNotes}
                    />
                </View>
                <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
                    <Text style={commonStyles.addButtonText}>Add New Task</Text>
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