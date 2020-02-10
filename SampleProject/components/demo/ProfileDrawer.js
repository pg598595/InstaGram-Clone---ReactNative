import React, { Component } from 'react'
import { Image,Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, NavigationEvents } from 'react-navigation';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";

import PostDemo from './PostDemo';
import FavoriteScreen from './FavoriteScreen';
import ProfileScreen from './ProfileScreen';
import DetailScreen from './DetailScreen';
import { createStackNavigator,createSwitchNavigator } from 'react-navigation-stack';
import AddNewRecipeComponent from './AddNewRecipeComponent';
import AddImage from './AddImage';
import ActvityScrren from './ActivityScreen'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {  
    

    createDrawerNavigator,  
  
} from 'react-navigation-drawer';  


const DrawerNavigation = createDrawerNavigator({
    ProfileScreen: {
        screen: ProfileScreen,
        navigationOptions: {
            title: 'Profile',
            
            drawerIcon: (
                <Image
                source={require('../../images/userBlack.png')}
                    style={[{ width: 19, height: 19 ,marginStart:20}]}
                />
            ),
        }
    },
    Drawer: {
        screen: ActvityScrren,
        navigationOptions: {
            title: 'Activity',
            
            drawerIcon: (
                <Image
                source={require('../../images/timer.png')}
                    style={[{ width: 19, height: 19 ,marginStart:20}]}
                />
            ),
        }
    },
    
   
}, {
    initialRouteName: 'ProfileScreen',
    drawerPosition: 'right',
    drawerType:'slide',
    contentOptions: {
        inactiveTintColor: '#8E8E8E',
        activeTintColor: '#000000',
        labelStyle: {
            fontSize: 15,
        },
      }
    
})
const ProfileDrawer = createAppContainer(DrawerNavigation)
export default ProfileDrawer;