import LoginPage from './LoginPage'
import Splashscreen from './SplashScreen'
import {createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';


const Nav=createStackNavigator({
    splashscreen: Splashscreen,
    loginscreen: LoginPage
})

const AppContainer = createAppContainer(Nav);   

export default AppContainer;
