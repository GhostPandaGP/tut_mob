import React from 'react';
import { StyleSheet, Image } from 'react-native';

import { LandingScreen } from './src/screens/LandingScreen';
import { HomeScreen } from './src/screens/HomeScreen';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

const switchNavigator = createSwitchNavigator({

  landingStack: {
    screen: createStackNavigator({
      Landing: LandingScreen,
    },{
      defaultNavigationOptions: {
        headerShown: false
      }
    })
  },

  homeStack: createBottomTabNavigator({

    home: {
      screen: createStackNavigator({
        HomePage: HomeScreen
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon = focused == true ? require('./src/images/home_icon.png') : require('./src/images/home_n_icon.png')
          return <Image source={icon} style={styles.tabIcon}/>
        }
      }
    }, 

    offer: {
      screen: createStackNavigator({
        HomePage: HomeScreen
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon = focused == true ? require('./src/images/offer_icon.png') : require('./src/images/offer_n_icon.png')
          return <Image source={icon} style={styles.tabIcon}/>
        }
      }
    },

    cart: {
      screen: createStackNavigator({
        HomePage: HomeScreen
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon = focused == true ? require('./src/images/cart_icon.png') : require('./src/images/cart_n_icon.png')
          return <Image source={icon} style={styles.tabIcon}/>
        }
      }
    },

    account: {
      screen: createStackNavigator({
        HomePage: HomeScreen
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon = focused == true ? require('./src/images/account_icon.png') : require('./src/images/account_n_icon.png')
          return <Image source={icon} style={styles.tabIcon}/>
        }
      }
    },

  })
})

const AppNavigation = createAppContainer(switchNavigator);

export default function App() {
  return (
    // <AppNavigation />
    <HomeScreen />
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    width: 30,
    height: 30,
  }
})