import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import TestScreen from './screens/TestScreen';
import AllResultsScreen from './screens/AllResultsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Главная">
                <Tab.Screen name="Главная" component={HomeScreen} />
                <Tab.Screen name="Тест" component={TestScreen} />
                <Tab.Screen name="Результаты" component={AllResultsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
