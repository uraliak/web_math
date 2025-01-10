import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Добро пожаловать в приложение для определения уровня тревожности</Text>
            <Button title="Начать тест" onPress={() => navigation.navigate('Test')} />
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
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default HomeScreen;
