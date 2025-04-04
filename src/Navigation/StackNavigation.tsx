import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screen/HomeScreen';
import AddTaskScreen from '../Screen/AddTaskScreen';
import Signup from '../Screen/Signup';
import { Task } from '../Screen/AddTodoSlice';

export type RootStackParamList = {
    Home: undefined;
    AddTask: undefined;
    EditTask: { task: Task };
    Testing: undefined;
    SignUp: undefined;
    Login: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function StackNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SignUp"
                options={{ headerShown: false }}
                component={Signup}
            />
            <Stack.Screen
                name="Home"
                options={{ headerShown: false }}
                component={HomeScreen}
            />
            <Stack.Screen
                name="AddTask"
                component={AddTaskScreen}
                options={{ title: 'Add New Task', headerShown: false }}
            />
            <Stack.Screen
                name="EditTask"
                component={AddTaskScreen}
                options={{ title: 'Edit Task', headerShown: false }}
            />
        </Stack.Navigator>
    );
}