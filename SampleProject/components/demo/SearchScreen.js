import React, { Component } from 'react'
import { Image,Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, NavigationEvents } from 'react-navigation';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import PostDemo from '../home/PostDemo';
import FavoriteScreen from '../favorite/FavoriteScreen';
import ProfileScreen from '../profile/ProfileScreen';
import DetailScreen from '../home/DetailScreen';
import { createStackNavigator,createSwitchNavigator } from 'react-navigation-stack';
import AddNewRecipeComponent from '../addRecipe/AddNewRecipeComponent';
import AddImage from '../addRecipe/AddImage';

 
export default class SearchScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Search Screen</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1
    },
})