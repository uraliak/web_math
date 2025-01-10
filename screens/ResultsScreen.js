import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResultsScreen = ({ route, navigation }) => {
    const { name, age, score } = route.params;

    const anxietyLevel =
        score < 80 ? 'Низкий уровень тревожности' :
            score < 120 ? 'Средний уровень тревожности' :
                'Высокий уровень тревожности';

    const saveResult = async () => {
        const newResult = { name, age, score, anxietyLevel, date: new Date().toISOString() };
        try {
            const storedResults = await AsyncStorage.getItem('results');
            const results = storedResults ? JSON.parse(storedResults) : [];
            results.push(newResult);
            await AsyncStorage.setItem('results', JSON.stringify(results));
        } catch (error) {
            console.error('Ошибка сохранения результата:', error);
        }
    };

    useEffect(() => {
        saveResult();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ваш результат</Text>
            <Text>ФИО: {name}</Text>
            <Text>Возраст: {age}</Text>
            <Text>Общий балл: {score}</Text>
            <Text>Уровень тревожности: {anxietyLevel}</Text>
            <Button title="Просмотреть все результаты" onPress={() => navigation.navigate('AllResults')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
});

export default ResultsScreen;
