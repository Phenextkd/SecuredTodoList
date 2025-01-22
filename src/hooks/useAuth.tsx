import * as LocalAuthentication from 'expo-local-authentication';
import { Linking, Platform } from 'react-native';
import * as IntentLauncher from 'expo-intent-launcher';

const useAuth = async () => {
  try {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.supportedAuthenticationTypesAsync();

    if (hasHardware && isEnrolled) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access TODO list',
        fallbackLabel: 'Enter PIN', // This will allow PIN entry as a fallback
      });
      return result.success;
    } else {
      if (Platform.OS === 'ios') {
        Linking.openURL('App-Prefs:root=TOUCHID_PASSCODE').catch(err =>
          console.error('Error opening settings:', err),
        );
      } else if (Platform.OS === 'android') {
        IntentLauncher.startActivityAsync(
          IntentLauncher.ActivityAction.SECURITY_SETTINGS
        ).catch(err => console.error('Error opening settings:', err));
      }
    }
  } catch (error) {
    console.error('Authentication error:', error);
  }
  return false;
};

export default useAuth;