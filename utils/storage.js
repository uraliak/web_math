import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveResult = async (result) => {
    const results = JSON.parse(await AsyncStorage.getItem('results')) || [];
    results.push(result);
    await AsyncStorage.setItem('results', JSON.stringify(results));
};

export const getResults = async () => {
    return JSON.parse(await AsyncStorage.getItem('results'));
};
