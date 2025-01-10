import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AllResultsScreen = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const storedResults = await AsyncStorage.getItem('results');
                const results = storedResults ? JSON.parse(storedResults) : [];
                setResults(results);
            } catch (error) {
                console.error('Ошибка получения данных:', error);
            }
        };

        fetchResults();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Все результаты</Text>
            <FlatList
                data={results}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.resultRow}>
                        <Text>{`ФИО: ${item.name}, Возраст: ${item.age}, Балл: ${item.score}`}</Text>
                        <Text>{`Уровень: ${item.anxietyLevel}, Дата: ${new Date(item.date).toLocaleDateString()}`}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
    },
    resultRow: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
    },
});

export default AllResultsScreen;
