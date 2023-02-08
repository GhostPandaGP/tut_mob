import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    rank: {
      color: '#fff',
      fontWeight: 'bold',
    },
    rankContainer: {
      backgroundColor: '#585858',
      borderRadius: 5,
      paddingHorizontal: 5,
      marginRight: 5,
    },
    expoVectorIcons: {
      alignSelf: 'center',
      marginRight: 3,
    },
    title: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 3,
    },
    text: {
      color: '#fff',
      fontSize: 14,
      marginRight: 7,
    },
    coinContainer: {
      flexDirection: 'row',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#282828',
      padding: 15,
      width: '100%',
    },
    icon: {
      height: 30,
      width: 30,
      marginRight: 15,
      alignSelf: 'center',
    },
    coinInfoContainer: {
      flexDirection: 'row',
    },
    iconRightColumn: {
      marginLeft: 'auto',
      alignItems: 'flex-end'
    }
  })

  export default styles;
