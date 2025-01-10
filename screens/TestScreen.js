import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const questions = [
    // Реактивная тревожность (вопросы 1-20)
    'Я спокоен.',
    'Мне ничто не угрожает.',
    'Я нахожусь в напряжении.',
    'Я испытываю сожаление.',
    'Я чувствую себя свободно.',
    'Я расстроен.',
    'Меня волнуют возможные неудачи.',
    'Я чувствую себя отдохнувшим.',
    'Я встревожен.',
    'Я испытываю чувство внутреннего удовлетворения.',
    'Я уверен в себе .',
    'Я нервничаю .',
    'Я не нахожу себе места.',
    'Я взвинчен.',
    'Я не чувствую скованности.',
    'Я доволен.',
    'Я обеспокоен.',
    'Я слишком возбужден и мне не по себе.',
    'Мне радостно.',
    'Мне приятно.',
    'Я испытываю удовольствие.',
    // Личностная тревожность (вопросы 21-40)
    'Я обычно быстро устаю.',
    'Я легко могу заплакать.',
    'Я хотел бы быть таким же счастливым, как и другие.',
    'Нередко я проигрываю из-за того, что недостаточно\n' +
    'быстро принимаю решения.',
    'Обычно я чувствую себя бодрым.',
    'Я спокоен, хладнокровен и собран.',
    'Ожидаемые трудности обычно очень тревожат меня.',
    'Я слишком переживаю из-за пустяков.',
    'Я вполне счастлив.',
    'Я принимаю все слишком близко к сердцу.',
    'Мне не хватает уверенности в себе.',
    'Обычно я чувствую себя в безопасности.',
    'Я стараюсь избегать критических ситуаций и\n' +
    'трудностей.',
    'У меня бывает хандра.',
    'Я доволен .',
    'Всякие пустяки отвлекают и волнуют меня.',
    'Я так сильно переживаю свои разочарования, что\n' +
    'потом долго не могу о них забыть.',
    'Я уравновешенный человек.',
    'Меня охватывает беспокойство, когда я думаю о\n' +
    'своих делах и заботах.',
];

const options = ['Совсем не верно', 'Иногда верно', 'Часто верно', 'Совершенно верно'];

const defaultAnswers = [
    1, 1, 2, 1, 1, 2, 1, 2, 3, 4, 2, 3, 3, 4, 2, 1, 4, 3, 2, 1,
    2, 1, 4, 3, 2, 3, 3, 2, 1, 4, 3, 2, 1, 2, 3, 4, 3, 1, 2, 4
];

const TestScreen = ({ navigation }) => {
    const [answers, setAnswers] = useState(defaultAnswers);

    const handleAnswer = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const calculateScores = () => {
        // Разделение вопросов на прямые и обратные
        const reactiveDirect = [3, 4, 6, 7, 9, 12, 13, 14, 17, 18].map(i => i - 1);
        const reactiveReverse = [1, 2, 5, 8, 10, 11, 15, 16, 19, 20].map(i => i - 1);
        const personalDirect = [22, 23, 24, 25, 28, 29, 31, 32, 34, 35, 37, 38, 40].map(i => i - 1);
        const personalReverse = [21, 26, 27, 30, 33, 36, 39].map(i => i - 1);

        // Расчет реактивной тревожности
        const reactiveScore =
            reactiveDirect.reduce((sum, i) => sum + answers[i], 0) -
            reactiveReverse.reduce((sum, i) => sum + answers[i], 0) +
            50;

        // Расчет личностной тревожности
        const personalScore =
            personalDirect.reduce((sum, i) => sum + answers[i], 0) -
            personalReverse.reduce((sum, i) => sum + answers[i], 0) +
            35;

        // Интерпретация результатов
        const interpretScore = score => {
            if (score <= 30) return 'Низкий уровень тревожности';
            if (score <= 45) return 'Умеренный уровень тревожности';
            return 'Высокий уровень тревожности';
        };

        const reactiveInterpretation = interpretScore(reactiveScore);
        const personalInterpretation = interpretScore(personalScore);

        saveResult(reactiveScore, reactiveInterpretation, personalScore, personalInterpretation);

        Alert.alert(
            'Результаты теста',
            `Реактивная тревожность: ${reactiveScore} (${reactiveInterpretation})\nЛичностная тревожность: ${personalScore} (${personalInterpretation})`,
            [
                { text: 'Посмотреть результаты', onPress: () => navigation.navigate('Результаты') },
                { text: 'Закрыть' },
            ]
        );
    };

    const saveResult = async (reactiveScore, reactiveInterpretation, personalScore, personalInterpretation) => {
        const date = new Date().toISOString();
        const result = {
            reactiveScore,
            reactiveInterpretation,
            personalScore,
            personalInterpretation,
            date,
        };

        try {
            const storedResults = await AsyncStorage.getItem('results');
            const results = storedResults ? JSON.parse(storedResults) : [];
            results.push(result);
            await AsyncStorage.setItem('results', JSON.stringify(results));
        } catch (error) {
            console.error('Ошибка сохранения результата:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Тест Спилбергера — Ханина</Text>
            {questions.map((question, index) => (
                <View key={index} style={styles.questionContainer}>
                    <Text style={styles.question}>{`${index + 1}. ${question}`}</Text>
                    {options.map((option, i) => (
                        <Button
                            key={i}
                            title={option}
                            onPress={() => handleAnswer(index, i + 1)}
                            color={answers[index] === i + 1 ? 'blue' : 'gray'}
                        />
                    ))}
                </View>
            ))}
            <Button title="Завершить тест" onPress={calculateScores} />
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
    questionContainer: {
        marginBottom: 20,
    },
    question: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default TestScreen;
