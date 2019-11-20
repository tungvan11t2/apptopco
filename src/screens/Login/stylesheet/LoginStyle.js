import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    logoImage: {
        width: 180,
        height: 60
    },
    loadingImg: {
        zIndex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        opacity: 0.3,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoContainer: {
        marginBottom: 5,
    },
    formMsgError: {
        width: 250,
        height: 30,
        marginBottom: 5,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#f8d7da',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 7,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon:{
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
        width: 250,
        borderRadius: 7,
    },
    txtErrordMsg: {
        color: "#721c24",
        fontSize: 17,
    },
    loginButton: {
        backgroundColor: "#f5983a",
    },
    loginText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    forgotText: {
        textDecorationLine: 'underline'
    },
    txtError: {
        color: '#ff0000',
        position: 'absolute',
        right: 0,
        fontSize: 13,
        bottom: -17,
    },
    txtNone: {
    },
    inputError: {
        borderWidth: 1,
        borderColor: '#ff0000'
    },
    inputNone: {
    }
});
export default styles;
