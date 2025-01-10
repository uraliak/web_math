// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import TestScreen from './screens/TestScreen';
import ResultsScreen from './screens/ResultsScreen';
import AllResultsScreen from './screens/AllResultsScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Welcome' }} />
                <Stack.Screen name="Test" component={TestScreen} options={{ title: 'Anxiety Test' }} />
                <Stack.Screen name="Results" component={ResultsScreen} options={{ title: 'Results' }} />
                <Stack.Screen name="AllResults" component={AllResultsScreen} options={{ title: 'All Results' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
