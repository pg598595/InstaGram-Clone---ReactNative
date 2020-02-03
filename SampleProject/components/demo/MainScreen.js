import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import PostDemo from './PostDemo';
import FavoriteScreen from './FavoriteScreen';
import ProfileScreen from './ProfileScreen';


export default class MainScreen extends Component {
    render() {
        return (
            <AppContainer />
        );
    }
}


class AddNewRecipeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Add New Recipe</Text>
            </View>
        );
    }
}

class SearchScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
              <Text>Search Screen</Text>
            </View>
        );
    }
}

const bottomTabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: PostDemo,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Fontisto name="home" size={22} color={tintColor} />
                ),
                tabBarLabel:() => {return null},
                
            }
        },
        Search:{
            screen: SearchScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Fontisto name="search" size={22} color={tintColor} />
                ),
                tabBarLabel:() => {return null},
            }
        },
        Add: {
            screen: AddNewRecipeScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <MaterialIcons name="add" size={30} color={tintColor} />
                ),
                tabBarLabel:() => {return null},
            }
        },
        Favorites:{
            screen: FavoriteScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome name="heart" size={22} color={tintColor} />
                ),
                tabBarLabel:() => {return null},
            }
        },
        Profile: {
            screen: ProfileScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <MaterialIcons name="person-outline" size={28} color={tintColor} />
                ),
                tabBarLabel:() => {return null},
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
    icon: {
        height: 19,
        width: 25,
        marginStart: 20
    },
})