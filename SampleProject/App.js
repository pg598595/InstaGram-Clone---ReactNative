import React from 'react';
import FlexDemo from './components/demo/FlexDemo'
import List from './components/demo/List';
import LoginPage from './components/demo/LoginPage';
import HomePage from './components/demo/HomePage';

import SplashScreen from './components/demo/SplashScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import PostDemo from './components/demo/PostDemo';
import {View} from 'react-native'

const MainNavigator = createStackNavigator({

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
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      header: null
    }
  },

});

// const App = createAppContainer(MainNavigator);

// export default App;
export default function App() {
  return <View>
    <PostDemo></PostDemo>

  </View>

}
