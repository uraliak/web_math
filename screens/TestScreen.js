import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const questions = [
    'Я чувствую себя спокойным.',
    'Я чувствую себя уставшим.',
    'Я быстро утомляюсь.',
    'Я ощущаю себя на грани нервного срыва.',
    'Мне комфортно в данный момент.',
    'Я испытываю чувство напряжения.',
    'Я переживаю о будущем.',
    'Я не могу сосредоточиться.',
    'Я чувствую себя неуверенно.',
    'Я испытываю чувство удовлетворения.',
    'Я чувствую внутреннее напряжение.',
    'Я легко расстраиваюсь.',
    'Мне трудно сидеть на месте.',
    'Я испытываю чувство беспокойства.',
    'Я легко обижаюсь.',
    'Я не чувствую удовлетворения от жизни.',
    'Мне трудно принимать решения.',
    'Я чувствую внутреннее спокойствие.',
    'Я уверен в себе.',
    'Мое настроение колеблется.',
    // Дополните до 40 вопросов
];

const TestScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [answers, setAnswers] = useState(Array(questions.length).fill(0));

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
            <Text style={styles.title}>Тест тревожности</Text>
            <TextInput
                placeholder="ФИО"
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <TextInput
                placeholder="Возраст"
                style={styles.input}
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
            />
            {questions.map((question, index) => (
                <View key={index} style={styles.questionContainer}>
                    <Text>{`${index + 1}. ${question}`}</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Оценка (0-4)"
                        onChangeText={(value) => handleAnswerChange(index, value)}
                    />
                </View>
            ))}
            <Button title="Отправить" onPress={calculateResult} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
    },
    questionContainer: {
        marginBottom: 10,
    },
});

export default TestScreen;
