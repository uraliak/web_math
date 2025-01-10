// screens/ResultsScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResultsScreen = ({ route, navigation }) => {
    const { name, age, score } = route.params;

    let anxietyLevel = '';
    if (score < 80) anxietyLevel = 'Low Anxiety';
    else if (score < 120) anxietyLevel = 'Moderate Anxiety';
    else anxietyLevel = 'High Anxiety';

    const saveResult = async () => {
        const newResult = { name, age, score, anxietyLevel, date: new Date().toISOString() };
        try {
            const storedResults = await AsyncStorage.getItem('results');
            const results = storedResults ? JSON.parse(storedResults) : [];
            results.push(newResult);
            await AsyncStorage.setItem('results', JSON.stringify(results));
        } catch (error) {
            console.error('Error saving result:', error);
        }
    };

    useEffect(() => {
        saveResult();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Results</Text>
            <Text>Name: {name}</Text>
            <Text>Age: {age}</Text>
            <Text>Score: {score}</Text>
            <Text>Level: {anxietyLevel}</Text>
            <Button title="View All Results" onPress={() => navigation.navigate('AllResults')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default ResultsScreen;
