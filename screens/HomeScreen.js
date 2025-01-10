import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Добро пожаловать!</Text>
            <Text style={styles.text}>
                Это приложение помогает определить уровень тревожности с помощью опросника Спилбергера — Ханина.
            </Text>
            <Text style={styles.text}>Чтобы начать опрос, нажмите кнопку "Тест" внизу экрана.</Text>
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default HomeScreen;
