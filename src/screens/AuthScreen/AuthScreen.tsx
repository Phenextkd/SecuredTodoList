import React from 'react';
import { View, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import useAuth from '../../hooks/useAuth';
import styles from './AuthScreenStyles';

// Define the AuthScreen component with a prop for handling authentication success
const AuthScreen: React.FC<{ onAuthSuccess: () => void }> = ({ onAuthSuccess }) => {
    // Function to handle authentication
    const handleAuth = async () => {
        // Call the useAuth hook to perform authentication
        const success = await useAuth();
        // If authentication is successful, call the onAuthSuccess prop
        if (success) {
            onAuthSuccess();
        }
    };

    return (
        // Main container for the screen
        <View style={styles.container}>
            {/* Container for the icon */}
            <View style={styles.iconContainer}>
                {/* Display a lock icon */}
                <FontAwesome name="lock" size={100} color="#4CAF50" />
            </View>
            {/* Container for the button */}
            <View style={styles.buttonContainer}>
                {/* Button to trigger authentication */}
                <Button title="Authenticate" onPress={handleAuth} />
            </View>
        </View>
    );
};

export default AuthScreen;