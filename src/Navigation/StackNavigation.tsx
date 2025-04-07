import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screen/HomeScreen';
import AddTaskScreen from '../Screen/AddTaskScreen';
import { Task } from '../Screen/AddTodoSlice';
import SignUp from '../Screen/SignUp';
import LoginScreen from '../Screen/LoginScreen';

export type RootStackParamList = {
    Home: undefined;
    AddTask: undefined;
    EditTask: { task: Task };
    Testing: undefined;
    SignUp: undefined;
    Login: undefined;
};

interface StackNavigationProps {
    initialRouteName?: keyof RootStackParamList;
}

const Stack = createStackNavigator<RootStackParamList>();

export default function StackNavigation({ initialRouteName = 'SignUp' }: StackNavigationProps) {
    return (
        <Stack.Navigator initialRouteName={initialRouteName}>
            <Stack.Screen
                name="SignUp"
                options={{ headerShown: false }}
                component={SignUp}
            />
            <Stack.Screen
                name="Login"
                options={{ headerShown: false }}
                component={LoginScreen}
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