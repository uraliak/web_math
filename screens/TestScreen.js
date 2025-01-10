// screens/TestScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const TestScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [answers, setAnswers] = useState(Array(40).fill(0));

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = parseInt(value, 10) || 0;
        setAnswers(newAnswers);
    };

    const calculateResult = () => {
        const score = answers.reduce((acc, curr) => acc + curr, 0);
        navigation.navigate('Results', { name, age, score });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Anxiety Test</Text>
            <TextInput
                placeholder="Full Name"
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <TextInput
                placeholder="Age"
                style={styles.input}
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
            />
            {Array.from({ length: 40 }).map((_, index) => (
                <TextInput
                    key={index}
                    placeholder={`Question ${index + 1}`}
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={(value) => handleAnswerChange(index, value)}
                />
            ))}
            <Button title="Submit" onPress={calculateResult} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
});

export default TestScreen;
