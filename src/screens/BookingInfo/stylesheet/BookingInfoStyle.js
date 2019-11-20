import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        fontSize: 16,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        marginTop: 5,
        marginBottom: 5
    },
    button: {
        marginTop: 25,
    },
    pickerStyle: {
        height: 35,
    },
    pickerWapper: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 2,
        marginBottom: 5
    },
    wapper: {
        borderTopWidth: 2,
    },
    wapperDetail: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
    },
    notFound: {
        borderTopWidth: 1,
        borderColor: '#333',
        textAlign: 'center',
        paddingTop: 20
    },
    componentsLeft: {
        flex: 4
    },
    componentsRight: {
        flex: 1,
        marginRight: 10
    },
    username: {
        fontWeight: "bold",
        fontSize: 16,
        marginRight: 15
    },
    dateBooking: {
        fontSize: 12
    },
    standaloneRowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        justifyContent: 'center',
    },
    standaloneRowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row-reverse',
    },
    backTextWhite: {
        color: '#FFF',
        fontSize: 12,
    },
    backBtn: {
        color: '#FFF',
        alignItems: 'center',
        paddingTop: 17,
        paddingBottom: 17,
        borderRightWidth: 1,
        borderRightColor: '#fff',
        width: 60
    },
    backEdit: {
        backgroundColor: '#2db7e4',
    },
    backDelete: {
        backgroundColor: '#dc3545',
    },
    backExtension: {
        backgroundColor: '#28a745',
    },
    backMessage: {
        backgroundColor: '#428bca',
    },
    disabled: {
        backgroundColor: '#a5afa3',
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
});
export default styles
