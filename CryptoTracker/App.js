import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList } from 'react-native';

import CoinDetailScreen from './src/screens/CoinDetailScreen';
import HomeScreen from './src/screens/HomeScreen';


export default function App() {
  return (
    <View style={styles.container}>
      <CoinDetailScreen />
      {/* <HomeScreen /> */}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    flex: 1,
    backgroundColor: '#121212',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
