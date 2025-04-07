import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/Navigation/StackNavigation';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store';
import { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './src/Navigation/StackNavigation';
import { initializeAuth, selectIsAuthenticated } from './src/Screen/AuthSlice';
import { AppDispatch } from './store';

// Auth-aware navigator component
const AppNavigator = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  // Initialize auth state from storage
  useEffect(() => {
    const init = async () => {
      await dispatch(initializeAuth());
      setIsInitialized(true);
    };
    
    init();
  }, [dispatch]);
  
  if (!isInitialized) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5E35B1" />
      </View>
    );
  }
  
  // Select initial route based on auth state
  const getInitialRouteName = () => {
    return isAuthenticated ? 'Home' : 'Login';
  };
  
  return (
    <NavigationContainer>
      <StackNavigation initialRouteName={getInitialRouteName()} />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
