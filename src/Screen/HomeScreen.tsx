import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import CustomCard from '../components/CustomCard';
const logoImg = require("../assets/home-background.png");
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../Navigation/StackNavigation';
import { StatusBar } from 'react-native';
import TaskListItem from '../components/TaskListItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { completedTasks, pendingTasks } from './AddTodoSlice';
import { commonStyles } from '../styles/commonStyles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    // const completedCount = useSelector((state: RootState) => completedTasks(state).length);
    // const pendingCount = useSelector((state: RootState) => pendingTasks(state).length);
    const pendingTasks = useSelector((state: RootState) => state.tasks.tasks.filter(task => !task.isCompleted));
    const completedTasks = useSelector((state: RootState) => state.tasks.tasks.filter(task => task.isCompleted));
    const completedCount = completedTasks.length;
    const pendingCount = pendingTasks.length;


    return (
        <ScrollView style={commonStyles.baseContainer}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

            <View style={styles.backgroundImage}>
                <Image source={logoImg} style={styles.backgroundImage} />
                <View style={styles.textContainer}>
                    <Text style={styles.DateTimeText}>{getFormattedDate()}</Text>
                    <Text style={styles.headerText}>My Todo List</Text>
                </View>
            </View>

            <View style={styles.cardsView}>
                <CustomCard count={completedCount.toString()} backgroundColor="#FFDDC1" message="Completed" />
                <CustomCard count={pendingCount.toString()} backgroundColor="#C1D9FF" message="Pending" />
            </View>
            <View style={styles.taskListContainer}>
                {/* Pending Tasks Section */}
                {pendingTasks.map(task => (
                    <TaskListItem key={task.id.toString()} task={task} />
                ))}
                
                {/* Completed Tasks Section */}
                {completedTasks.length > 0 && (
                        <View style={[styles.completedSectionContainer, completedTasks.length === 1 && { marginTop: 5, paddingTop: 5 }]}>

                        <Text style={styles.completedSectionTitle}>Completed Tasks</Text>
                        {completedTasks.map(task => (
                            <TaskListItem key={task.id.toString()} task={task} />
                        ))}
                    </View>
                )}
                
                {tasks.length === 0 && (
                    <Text style={styles.noTasksText}>No tasks yet. Add a new task!</Text>
                )}
            </View>

            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTask')}>
                <Text style={commonStyles.addButtonText}>Add New Task</Text>
            </TouchableOpacity>
        </ScrollView>

    )

}

export default HomeScreen


const getFormattedDate = () => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return new Date().toLocaleDateString('en-US', options);
};


const styles = StyleSheet.create({
    text: {
        fontSize: 30,
    },
    backgroundImage: {
        width: '100%',
        height: 230
    },
    cardsView: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: -40,
        gap: 10,
        marginHorizontal: 10
    },
    textContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 30,
        fontFamily: 'Inter-Bold',
        color: 'white',
        marginTop: 14
    },
    DateTimeText: {
        fontSize: 18,
        color: 'white',
        textShadowRadius: 10,
        fontFamily: 'Inter-Regular'
    },
    addButton: {
        backgroundColor: '#5E35B1',
        margin: 20,
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: 'center'
    },
    
    completedSectionContainer: {
        marginTop: completedTasks.length > 1 ? 20 : 10, // Reduce margin if only one task
        paddingTop: completedTasks.length > 1 ? 10 : 5,
    },    
    completedSectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1B1B1D',
        marginBottom: 8,
        paddingHorizontal: 5,
    },
    taskListContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        marginTop: 20,
        marginHorizontal: 10,
        elevation: 1,
        padding: 5,

    },
    noTasksText: {
        textAlign: 'center',
        margin: 20,
        fontSize: 16,
        color: '#0000000',
        fontFamily: 'Inter-Bold'
    },
});
