import { 
    StyleSheet,
    PixelRatio
     } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -120,
        marginBottom: 20
    },
    avatar: {
        borderRadius: 125,
        width: 250,
        height: 250
    },
    saveButton: {
        marginBottom: 5,
        backgroundColor: "#f5983a",
        width: 150,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    selectButton: {
        marginBottom: 5,
        backgroundColor: "#2196f3",
        width: 150,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    saveText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
export default styles;
