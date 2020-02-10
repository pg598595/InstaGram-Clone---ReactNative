import React, { Component } from 'react'
import { Image, Text, View, TouchableOpacity, StyleSheet,SafeAreaView } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, NavigationEvents } from 'react-navigation';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import PostDemo from './PostDemo';
import FavoriteScreen from './FavoriteScreen';
import ProfileScreen from './ProfileScreen';
import DetailScreen from './DetailScreen';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation-stack';
import AddNewRecipeComponent from './AddNewRecipeComponent';
import AddImage from './AddImage';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class ActivityScreen extends Component {
    render() {
        return (
            <SafeAreaView>
                <View style={styles.toolBar}>
                    <Text style={styles.titleToolbar}>Activity</Text>
                    <EvilIcons name='navicon' size={35} onPress={() => this.props.navigation.openDrawer()} />
                </View>
                <View style={{flex:1,backgroundColor:'pink',alignItems:'center'}}>
                    <MaterialCommunityIcons name='progress-wrench' size={200}/>
                    <Text style={{fontSize:25,color:'red'}}>In progress</Text>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    textBold: {
        fontWeight: 'bold',
        fontSize: 18
    },
    details: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center'
    },
    iconcamera: {
        height: 22,
        width: 25,
        marginStart: 10
    },
    titleToolbar: {
        marginTop: 5,
        marginBottom: 5,
        fontSize: 20,
        marginStart: 15,
        textAlign: "center",
        
    },
    toolBar: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
})