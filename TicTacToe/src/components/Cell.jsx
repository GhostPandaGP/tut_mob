import React from 'react'
import { View, Pressable, StyleSheet } from 'react-native';
import Cross from './Cross';

const Cell = (props) => {
    const {cell, onPress} = props;
    return (
        <Pressable style={styles.cell} onPress={() => onPress()}>
            {cell === 'o' && <View style={styles.circle} />}
            {cell === 'x' && <Cross/>}
        </Pressable>
    )
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'red',

    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: '70%',
    height: '70%',
    borderRadius: 9999,

    borderWidth: 8,
    borderColor: '#fff',
  },
})

export default Cell;
