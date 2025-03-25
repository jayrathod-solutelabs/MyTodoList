import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Task, toggleTaskCompletion } from "../Screen/AddTodoSlice";
import { formatTime } from "../utils/utilites";
import { useDispatch } from "react-redux";
import { commonStyles } from "../styles/commonStyles";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../Navigation/StackNavigation";
import { useNavigation } from "@react-navigation/native";
const CheckmarkImage = require("../assets/checkmark.png");

// Map category to its corresponding icon
const getCategoryIcon = (category: string) => {
    switch (category) {
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
    switch (category) {
        case 'work':
            return commonStyles.categoryWorkBgColorr;
        case 'personal':
            return commonStyles.categoryPersonalBgColor;
        case 'event':
            return commonStyles.categoryEventBgColor;
        default:
            return commonStyles.categoryOtherBgColor;
    }
};


const TaskListItem = ({ task }: { task: Task }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();


    const dispatch = useDispatch();

    const handleToggleCompletion = () => {
        dispatch(toggleTaskCompletion(task.id));
    };

    const handleEditTask = () => {
        navigation.navigate('EditTask', { task });
    };


    return (
        <TouchableOpacity 
        style={styles.taskItem} 
        onPress={handleEditTask} 
    >
        <View style={styles.taskItem}>
            <View style={styles.taskContent}>
                <View style={[styles.iconsContainer, commonStyles.categoryIconCircle, getCategoryBgColor(task.category)]}>
                    <Image
                        source={getCategoryIcon(task.category)}
                        style={commonStyles.categoryIcon}
                    />
                </View>
                <View style={styles.taskTextContainer}>
                    <View style={styles.titleRow}>
                        <Text style={styles.taskTitle}>{task.title}</Text>
                        <Text style={[styles.taskTime, { marginStart: 8 }]}>{formatTime(task.time)}</Text>
                        </View>
                    <Text style={styles.taskTime}>{task.notes}</Text>
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

})

export default TaskListItem;