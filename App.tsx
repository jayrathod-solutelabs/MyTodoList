import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/Navigation/StackNavigation';
import { Provider, useSelector } from 'react-redux';
import { store } from './store';
import { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './src/Navigation/StackNavigation';

// Auth-aware navigator component
const AppNavigator = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Select initial route based on auth state
  const getInitialRouteName = () => {
    const authState = store.getState().auth;
    return authState.isAuthenticated ? 'Home' : 'Login';
  };
  
  useEffect(() => {
    setIsInitialized(true);
  }, []);
  
  if (!isInitialized) {
    return null; // Or a loading indicator
  }
  
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
