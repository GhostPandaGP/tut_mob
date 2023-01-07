import React from 'react'
import { StyleSheet, View } from 'react-native'

const Cross = () => {
    return (
        <View style={styles.lines}>
            <View style={styles.crossLine}/>
            <View style={[styles.crossLine, styles.crossLineReversed]}/>
        </View>
    )
  }

const styles = StyleSheet.create({
    lines: {
        alignItems: 'center',
        justifyContent: 'center',
    
        width: '70%',
        height: '70%',

        // backgroundColor: 'red',
    
      },
      crossLine: {
        position: 'absolute',
        width: '12%',
        height: '100%',
        borderRadius: 5,
        backgroundColor: '#fff',
        transform: [{
          rotate: '45 deg',
        }]
      },
      crossLineReversed: {
        transform: [{
          rotate: '-45 deg',
        }]
      }
})

export default Cross;
