import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    tickerTitle: {
        color: '#fff',
        fontWeight: 'bold',
        marginHorizontal: 5,
        fontSize: 17,
    },
    tickerTitleNumber: {
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 14,
        lineHeight: 14,
    },
    tickerContainer: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    rankContainer: {
        backgroundColor: '#585858',
        padding: 5,
        borderRadius: 5,
    }
})

export default styles;
