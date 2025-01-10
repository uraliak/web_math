// screens/AllResultsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AllResultsScreen = () => {
    const [results, setResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const storedResults = await AsyncStorage.getItem('results');
                const results = storedResults ? JSON.parse(storedResults) : [];
                setResults(results);
                setFilteredResults(results);
            } catch (error) {
                console.error('Error fetching results:', error);
            }
        };

        fetchResults();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = results.filter((result) =>
            result.name.toLowerCase().includes(query.toLowerCase()) ||
            result.age.toString().includes(query)
        );
        setFilteredResults(filtered);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>All Results</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search by name or age"
                value={searchQuery}
                onChangeText={handleSearch}
            />
            <FlatList
                data={filteredResults}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.resultItem}>
                        <Text>Name: {item.name}</Text>
                        <Text>Age: {item.age}</Text>
                        <Text>Score: {item.score}</Text>
                        <Text>Level: {item.anxietyLevel}</Text>
                        <Text>Date: {new Date(item.date).toLocaleDateString()}</Text>
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
        fontSize: 24,
        marginBottom: 10,
        textAlign: 'center',
    },
    searchInput: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    resultItem: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});

export default AllResultsScreen;
