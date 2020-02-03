import React from 'react';

import LoginPage from './components/demo/LoginPage';

import SplashScreen from './components/demo/SplashScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import PostDemo from './components/demo/PostDemo';
import {View} from 'react-native'
import MainScreen from './components/demo/MainScreen';

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
  MainScreen: {
    screen: MainScreen,
    navigationOptions: {
      header: null
    }
  },

});

const App = createAppContainer(MainNavigator);

export default App;
// export default function App() {
//   return <View>
//     <PostDemo></PostDemo>

//   </View>

// }
