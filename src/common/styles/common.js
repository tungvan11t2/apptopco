import { StyleSheet } from "react-native";

export const stylesCommon = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        fontSize: 16,
        paddingHorizontal: 10,
    },
    label: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 5
    },
    input: {
        height: 35,
        marginBottom: 5,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 2,
        paddingTop: 5,
        paddingBottom: 5,
        color:'#000',
    },
    button: {
        flex: 1,
        backgroundColor: '#f5983a',
        marginTop: 20,
        marginBottom: 5,
        borderRadius: 8,
    },
    textInButton: {
        backgroundColor: '#f5983a',
        color: 'white',
        padding: 8,
        fontSize: 20,
        textAlign: "center",
        fontWeight: 'bold',
        borderRadius: 8,
    },
    pickerWapper: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 2,
        marginBottom: 5
    },
    pickerStyle: {
        height: 35,
        color:'#000'
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
});

export const stylesCalendar = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 8
    },
    components: {
        flex: 1,
        marginBottom: 8
    },
    label: {
        padding: 0,
        paddingBottom: 5,
        fontSize: 16
    },
    touchable: {
        flexDirection: 'row',
        width: 120,
        padding: 6,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ddd',
        borderRadius: 2,
    },
    calendar: {
        justifyContent: 'center',
        width: 23,
        marginRight: 5
    },
    viewText: {
        justifyContent: 'center'
    }
});
