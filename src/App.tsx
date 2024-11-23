import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { StrictMode } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Provider } from 'react-redux';
import './global.css';
import { store } from './redux/store';
import GameScreen from './screens/GameScreen';
import { ResultsScreen } from './screens/ResultsScreen';

export type RootStackParamList = {
  Game: {};
  Results: {};
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  };

  return (
    <StrictMode>
      <Provider store={store}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
          className="bg-white dark:bg-gray-800"
        />
        <NavigationContainer>
          <RootStack.Navigator initialRouteName="Game">
            <RootStack.Screen
              name="Game"
              component={GameScreen}
              options={{
                headerShown: false
              }}
            />
            <RootStack.Screen name="Results" component={ResultsScreen} />
          </RootStack.Navigator>
        </NavigationContainer>
      </Provider>
    </StrictMode>
  );
}
