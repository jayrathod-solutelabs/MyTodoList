import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './StackNavigation';
import { selectIsAuthenticated, selectUser } from '../Screen/AuthSlice';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './StackNavigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AuthRoute = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectUser);
    const navigation = useNavigation<NavigationProp>();

    useEffect(() => {
        if (!isAuthenticated) {
            // If not authenticated, reset navigation to Login screen
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                })
            );
        }
    }, [isAuthenticated, navigation]);

    return <StackNavigation />;
};

export default AuthRoute; 