import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView } from 'react-native'

import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, NavigationEvents } from 'react-navigation';
import SinglePost from './SinglePost'
import GridPostView from './GridPostView'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'

export default class ProfilePost extends Component {
   
    render() {
        
        return (
            <AppContainer />
        );
    }
}


const bottomTabNavigator = createMaterialTopTabNavigator(
    {
       
        Grid:{
            screen: GridPostView,
            navigationOptions: {
                title:'',
                tabBarIcon:({focused, tintColor:color}) => (
                    <Ionicons name="md-grid" size={27} color={color} />
                  )
               
             }
         
        },
        Single: {
            screen: SinglePost,
            navigationOptions: {
                title:'',
                tabBarIcon:({focused, tintColor:color}) => (
                    <AntDesign name="tagso" size={27} color={color} />
                  )
               
             }
        },
        
      
    },
    {
        
      tabBarOptions:{
          showIcon:true,
          showLabel:false,
        activeTintColor: '#000000',
        inactiveTintColor:'#8E8E8E',
        labelStyle: {},
        indicatorStyle:{backgroundColor:'black',height:1.5},
        style: { backgroundColor: '#ffffff' },
      }
    }
   
    
);

const AppContainer = createAppContainer(bottomTabNavigator);

