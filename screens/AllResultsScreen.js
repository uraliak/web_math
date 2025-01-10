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
            <Text style={styles.title}>Сохраненные результаты</Text>
            <FlatList
                data={results}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Text style={styles.cell}>Дата: {new Date(item.date).toLocaleDateString()}</Text>
                        <Text style={styles.cell}>Реактивная: {item.reactiveScore} ({item.reactiveInterpretation})</Text>
                        <Text style={styles.cell}>Личностная: {item.personalScore} ({item.personalInterpretation})</Text>
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
        textAlign: 'center',
    },
    row: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingBottom: 10,
    },
    cell: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default AllResultsScreen;
