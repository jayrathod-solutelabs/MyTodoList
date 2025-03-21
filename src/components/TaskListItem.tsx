import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";


const TaskListItem = () => {
    return (
        <View style={styles.taskItem}>
            <View style={styles.taskContent}>
                <View style={[styles.iconsContainer, styles.categoryIconCircle, styles.categoryWorkBgColorr]}>
                    <Image
                        source={require('../assets/time_icon.png')}
                        style={styles.categoryIcon}
                    />
                </View>
                <View style={styles.taskTextContainer}>
                    <Text style={styles.taskTitle}>Task Title</Text>
                    <Text style={styles.taskTime}>10:00 AM</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.checkbox} onPress={() => { console.log('checkbox pressed') }}>

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
        height: 22,
        width: 22
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
        backgroundColor: '#5E35B1',
        borderColor: '#5E35B1',
    }

})

export default TaskListItem;