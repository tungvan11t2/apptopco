import AsyncStorage from '@react-native-community/async-storage';

export async function setStorage(name, value) {
    try {
        await AsyncStorage.setItem(name, value);
    } catch (e) {
        console.log('set Item Storage: ' + e);
    }
}

export async function getStorage(name) {
    try {
        return await AsyncStorage.getItem(name);
    } catch (e) {
        console.log('get Item Storage: ' + e);
        return null;
    }
}

export async function removeStorage(name) {
    try {
        await AsyncStorage.removeItem(name);
    } catch (e) {
        console.log('remove Item Storage: ' + e);
    }
}

//set: setStorage('@auth_token', token);
//get: getStorage('@auth_token').then(function(amc) {
//     console.log(amc);
// });