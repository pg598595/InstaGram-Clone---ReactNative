import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import Icon from "react-native-vector-icons/FontAwesome";
import HomeScreenComponet from './HomeScreenComponet';
import AddNewRecipeComponent from './AddNewRecipeComponet';
import ProfileScreenComponet from './ProfileScreenComponet';


// export default class HomePage extends Component {

//     render() {
//         return (
//             <View style={styles.container}>
//                <Text>qweqweqw</Text>
//             </View>
//         )
//     }
// }

export default class HomePage extends Component {
    render() {
        return (
            <AppContainer />
        );
    }
}

class HomeScreen extends Component {
    render() {
        return (
            <HomeScreenComponet/>
        );
    }
}
class AddNewRecipeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <AddNewRecipeComponent/>
            </View>
        );
    }
}
class ProfileScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
               <ProfileScreenComponet/>
            </View>
        );
    }
}

const bottomTabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="home" size={25} color={tintColor} />
                )
            }
        },
        Add: {
            screen: AddNewRecipeScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="plus" size={25} color={tintColor} />
                )
            }
        },
        Profile: {
            screen: ProfileScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="user" size={25} color={tintColor} />
                )
            }
        },

    },
    {
        initialRouteName: 'Home'
    }
);

const AppContainer = createAppContainer(bottomTabNavigator);

const styles = StyleSheet.create({

    container: {
        flex: 1, 
    
    },
})