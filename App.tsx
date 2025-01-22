import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TodoProvider } from './src/context/TodoContext';
import TodoListScreen from './src/screens/TodoListScreen/TodoListScreen';
import AuthScreen from './src/screens/AuthScreen/AuthScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Create a stack navigator
const Stack = createStackNavigator();

const App = () => {
  // State to manage authentication status
  const [authenticated, setAuthenticated] = useState(false);

  // Function to handle successful authentication
  const handleAuthSuccess = () => {
    setAuthenticated(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setAuthenticated(false);
  };

  return (
    // Wrap the app with GestureHandlerRootView to enable gesture handling
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Provide the Todo context to the app */}
      <TodoProvider>
        {/* Navigation container to manage navigation state */}
        <NavigationContainer>
          {/* Stack navigator to manage screen navigation */}
          <Stack.Navigator>
            {/* Conditionally render AuthScreen or TodoListScreen based on authentication status */}
            {!authenticated ? (
              <Stack.Screen name="Auth">
                {props => (
                  // Pass handleAuthSuccess to AuthScreen as a prop
                  <AuthScreen {...props} onAuthSuccess={handleAuthSuccess} />
                )}
              </Stack.Screen>
            ) : (
              <Stack.Screen name="TodoList">
                {props => (
                  // Pass handleLogout to TodoListScreen as a prop
                  <TodoListScreen {...props} onLogout={handleLogout} />
                )}
              </Stack.Screen>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </TodoProvider>
    </GestureHandlerRootView>
  );
};

export default App;
