import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    priceContainer: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    name: {
        color: '#fff',
        fontSize: 15,
    },
    currentPrice: {
        color: '#fff',
        fontSize: 30,
        letterSpacing: 1,
        fontWeight: '600',
    },
    priceChange: {
        color: '#fff',
        lineHeight: 17,
        fontSize: 17,
        fontWeight: '500',
    },
    priceInner: {
        // backgroundColor: percentageColor,
        paddingHorizontal: 5,
        paddingVertical: 7,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
})

export default styles;
