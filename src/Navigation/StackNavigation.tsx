import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screen/HomeScreen';
import AddTaskScreen from '../Screen/AddTaskScreen';
import Testing from '../Screen/Testing';

export type RootStackParamList = {
    Home: undefined;
    AddTask: undefined;
    Testing: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function StackNavigation() {
    return (
        <Stack.Navigator>
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
        </Stack.Navigator>
    );
}