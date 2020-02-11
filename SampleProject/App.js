import React from 'react';

import LoginPage from './components/demo/LoginPage';

import SplashScreen from './components/demo/SplashScreen';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainScreen from './components/demo/MainScreen';

import { Provider } from 'react-redux'

import store from './store'

const AppContaior = createAppContainer(

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



export default function App() {
  return <Provider store={store}>
    <AppContaior />
  </Provider>
}


console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
console.disableYellowBox = true;