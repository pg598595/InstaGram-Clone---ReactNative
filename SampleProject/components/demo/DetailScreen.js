import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView } from 'react-native'

import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, NavigationEvents } from 'react-navigation';
import IngredientScreen from './IngredientScreen';
import InstructionScreen from './InstructionScreen';
import PreviewScreen from './PreviewScreen';

export default class DetailScreen extends Component {
   
    componentDidMount() {
       
        // console.log(this.props.navigation.state['params']['details']);
        //console.log(this.props);

    }
    render() {
        const { navigation } = this.props;
        return (
            <AppContainer screenProps={{
                handler: () => {},
                itemDetails: this.props
            }}/>
        );
    }
}

const bottomTabNavigator = createMaterialTopTabNavigator(
    {
        Preview: {
            screen: PreviewScreen,
           
            

            
        },
        Ingredients:{
            screen: IngredientScreen,
         
        },
        Instructions: {
            screen: InstructionScreen,
          
        },
        
      
    },
    {
        
      tabBarOptions:{
        activeTintColor: '#000000',
        labelStyle: { fontSize: 12 },
        style: { backgroundColor: '#ffffff' },
        inactiveTintColor:'#919191'
      }
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