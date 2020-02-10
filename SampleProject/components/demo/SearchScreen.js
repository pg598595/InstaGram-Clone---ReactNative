import React, { Component } from 'react'
import { Image,Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, NavigationEvents } from 'react-navigation';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import PostDemo from './PostDemo';
import FavoriteScreen from './FavoriteScreen';
import ProfileScreen from './ProfileScreen';
import DetailScreen from './DetailScreen';
import { createStackNavigator,createSwitchNavigator } from 'react-navigation-stack';
import AddNewRecipeComponent from './AddNewRecipeComponent';
import AddImage from './AddImage';

 
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