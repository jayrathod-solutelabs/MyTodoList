import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { fetchTasks, Task, toggleTaskCompletion, updateTask } from "../Screen/AddTodoSlice";
import { formatTime } from "../utils/utilites";
import { useDispatch } from "react-redux";
import { commonStyles } from "../styles/commonStyles";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../Navigation/StackNavigation";
import { useNavigation } from "@react-navigation/native";
import CategoryUtils, { CategoryType } from "../utils/categoryUtils";
import { AppDispatch } from "../../store";
const CheckmarkImage = require("../assets/checkmark.png");


const TaskListItem = ({ task }: { task: Task }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();


    const dispatch = useDispatch<AppDispatch>();

    const handleToggleCompletion = async () => {
        await dispatch(updateTask({ 
            ...task, 
            meta: { ...task.meta, isCompleted: !task.meta.isCompleted } 
        })).unwrap();
    
        dispatch(fetchTasks()); // Fetch updated tasks after update
    };
    
  

    const handleEditTask = () => {
        if (task.meta.isCompleted) {
            return; // Prevent navigation if the task is completed
        }
        navigation.navigate('EditTask', { task });
    };


    return (
        <TouchableOpacity 
        style={styles.taskItem} 
        onPress={handleEditTask} 
    >
        <View style={styles.taskItem}>
            <View style={styles.taskContent}>
                <View style={[styles.iconsContainer, commonStyles.categoryIconCircle, CategoryUtils.getBgColor(task.meta.category as CategoryType)]}>
                    <Image
                        source={CategoryUtils.getIcon(task.meta.category as CategoryType)}
                        style={commonStyles.categoryIcon}
                    />
                </View>
                <View style={styles.taskTextContainer}>
                    <View style={styles.titleRow}>
                        <Text style={task.meta.isCompleted ? styles.completedTaskTitle : styles.taskTitle}>{task.meta.title}</Text>
                        <Text style={[task.meta.isCompleted ? styles.completedTaskTime : styles.taskTime, { marginStart: 8 }]}>{formatTime(task.meta.time)}</Text>
                        </View>
                    <Text style={task.meta.isCompleted ? styles.completedTaskTime : styles.taskTime}>{task.description}</Text>
                </View>
            </View>
            <TouchableOpacity
                style={[styles.checkbox, task.meta.isCompleted ? styles.checkedbox : {}]}
                onPress={handleToggleCompletion}
            >
                {task.meta.isCompleted ? (
                    <Image source={CheckmarkImage} style={styles.checkmarkImage} />
                    ) : (
                        <View style={{ minWidth: 20, minHeight: 20 }} />
                    )}

            </TouchableOpacity>

        </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
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
    titleRow: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    iconsContainer: {
        flexDirection: 'row'
    },
  
    

    taskTextContainer: {
        flex: 1,
    },
    taskTitle: {
        fontSize: 17,
        fontFamily: 'Inter-Regular',
        fontWeight: 700,
        color: '#1B1B1D'
    },
    taskTime: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        marginTop: 2,
        color: '#1B1B1D'
    },
    checkbox: {
        height: 24,
        width: 24,
        borderWidth: 2,
        borderRadius: 6,
        borderColor: '#4A3780',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkedbox: {
        height: 24,
        width: 24,
        borderWidth: 2,
        borderRadius: 6,
        backgroundColor: '#4A3780',
        borderColor: '#4A3780',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',

    },
    checkmarkImage: {
        width: 18,
        height: 18,
        tintColor: 'white',
        resizeMode: 'contain',
    },
    completedTaskTitle : {
        fontSize: 17,
        fontFamily: 'Inter-Regular',
        fontWeight: 600,
        color: '#999',
        textDecorationLine: 'line-through'
    },
    completedTaskTime: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        marginTop: 2,
        color: '#999',
        textDecorationLine: 'line-through'
    },

})

export default TaskListItem;