import React from "react";
import { View, Text, Dimensions } from "react-native";
import CoinInfo from '../../../assets/data/crypto.json';
import CoinDetailHeader from './components/CoinDetailHeader';
import { AntDesign } from '@expo/vector-icons';
import {
    ChartDot, 
    ChartPath, 
    ChartPathProvider, 
    monotoneCubicInterpolation
} from '@rainbow-me/animated-charts';

import styles from './style';


const CoinDetailScreen = () => {
    const { 
        image: { small }, 
        name, 
        symbol,
        market_data: { 
            market_cap_rank, 
            price_change_percentage_24h,
            current_price,
        } 
    } = CoinInfo;
    const percentageColor = price_change_percentage_24h < 0 ? '#ea3943' : '#16c784';

    const {width: SIZE} = Dimensions.get('window');

    // const data = [
    //     {x: 1453075200, y: 1.47}, {x: 1453161600, y: 1.37},
    //     {x: 1453248000, y: 1.53}, {x: 1453334400, y: 1.54},
    //     {x: 1453420800, y: 1.52}, {x: 1453507200, y: 2.03},
    //     {x: 1453593600, y: 2.10}, {x: 1453680000, y: 2.50},
    //     {x: 1453766400, y: 2.30}, {x: 1453852800, y: 2.42},
    //     {x: 1453939200, y: 2.55}, {x: 1454025600, y: 2.41},
    //     {x: 1454112000, y: 2.43}, {x: 1454198400, y: 2.20},
    // ];
    // const points = monotoneCubicInterpolation({data, range: 40});

    return (
        <View style={{paddingHorizontal: 10}}>
            <CoinDetailHeader
                image={small}
                symbol={symbol}
                marketRank={market_cap_rank}
            />
            <View style={styles.priceContainer}>
                <View>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.currentPrice}>${current_price.usd}</Text>
                </View>
                <View style={[styles.priceInner, {backgroundColor: percentageColor}]}>
                    <AntDesign
                        name={price_change_percentage_24h < 0 ? "caretdown" : 'caretup'}
                        color={'#fff'}
                        size={12}
                        style={{alignSelf: 'center', marginRight: 5}}
                    />
                    <Text style={styles.priceChange}>
                        {price_change_percentage_24h.toFixed(2)}%</Text>
                </View>
            </View>
            {/* <ChartPathProvider data={{ points, smoothingStrategy: 'bezier' }}>
                <ChartPath height={SIZE / 2} stroke="yellow" width={SIZE} />
                <ChartDot style={{ backgroundColor: 'blue' }} />
            </ChartPathProvider> */}
        </View>
    )
}

export default CoinDetailScreen;
