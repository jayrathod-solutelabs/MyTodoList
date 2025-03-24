import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Task, toggleTaskCompletion } from "../../AddTodoSlice";
import { formatTime } from "../utils/utilites";
import { useDispatch } from "react-redux";
const CheckmarkImage = require("../assets/checkmark.png");

  // Map category to its corresponding icon
  const getCategoryIcon = (category: string) => {
    switch(category) {
        case 'work':
            return require('../assets/work_icon.png');
        case 'personal':
            return require('../assets/personal_icon.png');
        case 'event':
            return require('../assets/event_icon.png');
        default:
            return require('../assets/other_icon.png');
    }
};


const getCategoryBgColor = (category: string) => {
    switch(category) {
        case 'work':
            return styles.categoryWorkBgColorr; 
        case 'personal':
            return styles.categoryPersonalBgColor;
        case 'event':
            return styles.categoryEventBgColor;
        default:
            return styles.categoryOtherBgColor;
    }
};


const TaskListItem = ({ task }: { task: Task }) => {

    const dispatch = useDispatch();
    
    const handleToggleCompletion = () => {
        dispatch(toggleTaskCompletion(task.id));
    };
    
    return (
        <View style={styles.taskItem}>
            <View style={styles.taskContent}>
            <View style={[styles.iconsContainer, styles.categoryIconCircle, getCategoryBgColor(task.category)]}>
                    <Image
                        source={getCategoryIcon(task.category)}
                        style={styles.categoryIcon}
                    />
                </View>
                <View style={styles.taskTextContainer}>
                    <Text style={styles.taskTitle}>{task.title}</Text>
                    <Text style={styles.taskTime}>{formatTime(task.time)}</Text>
                </View>
            </View>
            <TouchableOpacity 
                style={[styles.checkbox, task.isCompleted ? styles.checkedbox : {}]} 
                onPress={handleToggleCompletion}
            >
                {task.isCompleted && (
                    <Image source={CheckmarkImage} style={styles.checkmarkImage} />
                )}
                
            </TouchableOpacity>

        </View>
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
    inputIcon: {
        width: 20,
        height: 20,
        marginRight: 5
    },
    iconsContainer: {
        flexDirection: 'row'
    },
    categoryWorkBgColorr: {
        backgroundColor: '#DBECF6'
    },
    categoryEventBgColor: {
        backgroundColor: '#E7E2F3'
    },
    categoryPersonalBgColor: {
        backgroundColor: '#FEF5D3'
    },
    categoryOtherBgColor: {
        backgroundColor: '#F5F5F5'
    },
    categoryIconCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: 'white',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    categoryIcon: {
        height: 21,
        width: 21,
        
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

})

export default TaskListItem;