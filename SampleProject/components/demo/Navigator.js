import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginPage from './LoginPage';
import SplashScreen from './SplashScreen';

const MainNavigator = createStackNavigator({
  Home: {screen: SplashScreen},
  Profile: {screen: LoginPage},
  HomePage: {
    screen: HomePage
  }
});

const App = createAppContainer(MainNavigator);

export default App;