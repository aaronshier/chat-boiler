import { AsyncStorage } from "react-native"

export const checkForLocalToken = async () => {
    try {
        const value = await AsyncStorage.getItem('ca_local_signin');
        if (value !== null) {
            // We have data!!
            console.log(value)
        }
    } catch (error) {
        // Error retrieving data
    }
}