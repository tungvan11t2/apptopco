import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    statusChair: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderStyle: 'solid',
        paddingBottom: 0,
        minHeight: 50,
        flexDirection: 'row'
    },
    noteView: {
        flexDirection: 'row',
        marginBottom: 5
    },
    noteTextRectangle: {
        width: 30,
        marginRight: 20,
        fontSize: 14
    },
    noteTextExplain: {
        fontSize: 14
    },
    notYetOrder: {
        backgroundColor: '#2b78e4',
    },
    ordering: {
        backgroundColor: '#e69138',
    },
    ordered: {
        backgroundColor: '#cf2a27',
    },
    txtError: {
        color: '#ff0000',
    },
    txtNone: {
        height:0
    },
});
export default styles
