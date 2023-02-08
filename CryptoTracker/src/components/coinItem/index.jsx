import React from 'react';
import { Text, View, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';

// import bitcoin from '../../../files/images/bitcoin.png';

const CoinItem = ({marketCoin}) => {
    const {name, symbol, market_cap_rank, image, 
        current_price, price_change_percentage_24h, market_cap} = marketCoin;

    const percentageColor = price_change_percentage_24h < 0 ? '#ea3943' : '#16c784';
    
    const normalizeMarketCap = (marketCap) => {
        if (marketCap > 1_000_000_000_000) {
            return `${Math.floor(marketCap / 1_000_000_000_000)} T`
        }
        if (marketCap > 1_000_000_000) {
            return `${Math.floor(marketCap / 1_000_000_000)} B`
        }
        if (marketCap > 1_000_000) {
            return `${Math.floor(marketCap / 1_000_000)} M`
        }
        if (marketCap > 1_000) {
            return `${Math.floor(marketCap / 1_000)} K`
        }
        return marketCap;
    }
    return (
        <View style={styles.coinContainer}>
        {/* <View> */}
            <Image 
            // source={{uri: Image.resolveAssetSource(bitcoin).uri}}  
            source={{uri: image}}
            style={styles.icon}
            />
            {/* left column */}
            <View>
                <Text style={styles.title}>{name}</Text>
                <View style={styles.coinInfoContainer}>
                    <View style={styles.rankContainer}>
                        <Text style={styles.rank}>{market_cap_rank}</Text>
                    </View>
                    <Text style={styles.text}>{symbol.toUpperCase()}</Text>
                    <AntDesign
                        name={price_change_percentage_24h < 0 ? "caretdown" : 'caretup'}
                        color={percentageColor}
                        size={styles.text.fontSize}
                        style={[styles.expoVectorIcons,]}
                    />
                    <Text 
                        style={{color: percentageColor, fontSize: styles.text.fontSize}}
                    >{price_change_percentage_24h.toFixed(2)}%</Text>
                </View>
            </View>
            {/* right column */}
            <View style={styles.iconRightColumn}>
                <Text style={styles.title}>{current_price}</Text>
                <Text style={{color: '#fff'}}>MCap {normalizeMarketCap(market_cap)}</Text>
            </View>
        </View>
    )
}

export default CoinItem;
