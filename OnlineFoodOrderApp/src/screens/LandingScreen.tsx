import React, { useState, useReducer, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

import * as Location from 'expo-location';

const screenWidth = Dimensions.get('screen').width

export const LandingScreen = () => {

    const [ errorMsg, setErrorMsg ] = useState('');
    const [ address, setAddress ] = useState<Location.LocationGeocodedAddress>();

    const [displayAddress, setDisplayAddress] = useState('Waiting for current location');

    useEffect(() => {

        (async () => {

            let { status } = await Location.requestBackgroundPermissionsAsync();
            if (status != 'granted') {
                setErrorMsg('Permission to access location is not granted');
                return;
            }

            let location: any = await Location.getCurrentPositionAsync({});
            
            const { coords } = location;

            if (coords) {
                const { latitude, longitude } = coords;

                let addressResponse: any = await Location.reverseGeocodeAsync({ latitude, longitude });

                for (let item of addressResponse) {
                    setAddress(item)
                    let currentAddress = `${item.name},${item.street}, ${item.postCode}, ${item.country}`
                    setDisplayAddress(currentAddress);
                    return;
                }
            } else {
                // notify user something went wrong with location
            }
        })()
    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
            </View>
            <View style={styles.body}>
                <Image source={require('../images/delivery_icon.png')} style={styles.deliveryIcon}/>
                <View style={styles.addressContainer}>
                    <Text style={styles.addressTitle}>Your Delivery Address</Text>
                </View>
                <Text style={styles.addressText}>{displayAddress}</Text>
            </View>
            <View style={styles.footer}>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'rgba(242,242,242,1)'
    },
    navigation: {
        flex: 2,
    },
    body: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deliveryIcon: {
        width: 80,
        height: 80
    },
    addressContainer: {
        width: screenWidth - 100,
        alignItems: 'center',
        borderBottomColor: 'red',
        borderBottomWidth: 0.5,
        padding: 5,
        marginBottom: 10,
    },
    addressTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#7D7D7D'
    },
    addressText: {
        fontSize: 14,
        fontWeight: '200',
        color: '#4f4f4f',
    },
    footer: {
        flex: 1,
    }
})