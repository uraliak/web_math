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
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Главная' }} />
                <Stack.Screen name="Test" component={TestScreen} options={{ title: 'Тест тревожности' }} />
                <Stack.Screen name="Results" component={ResultsScreen} options={{ title: 'Результаты' }} />
                <Stack.Screen name="AllResults" component={AllResultsScreen} options={{ title: 'Все результаты' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
