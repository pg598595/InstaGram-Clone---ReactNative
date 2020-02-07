import React from 'react';

import LoginPage from './components/demo/LoginPage';

import SplashScreen from './components/demo/SplashScreen';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import PostDemo from './components/demo/PostDemo';
import {View} from 'react-native'
import MainScreen from './components/demo/MainScreen';
import DetailScreen from './components/demo/DetailScreen';

export default createAppContainer(
  
  createSwitchNavigator(
    {
      SplashScreen: {
        screen: SplashScreen,
        navigationOptions: {
          header: null
        }
      },
      LoginPage: {
        screen: LoginPage,
        navigationOptions: {
          header: null
        }
      },
      
      MainScreen: {
        screen: MainScreen,
        navigationOptions: {
          header: null
        }
      },
    },
    {
      
      // initialRouteName: 'FAQ'
       mode: 'modal',
      // headerMode: 'none'
    }
  )
)
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
console.disableYellowBox = true;