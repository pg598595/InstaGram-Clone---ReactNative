import React, { Component } from 'react'
import { ToolbarAndroid,Text, View, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView } from 'react-native'
import * as constant from './Constants';
import AsyncStorage from '@react-native-community/async-storage'

export default class ProfileScreenToolBar extends Component {
    constructor() {
        super()
        this.state = { name: '' }

    }
    componentDidMount() {
        
       this.retrieveData()
    }
    render() {
        return (
            
            <View style={styles.toolBar}>
                    <Text style={styles.titleToolbar}>{this.state.name}</Text>
                    
                </View>
            
        )
    }

    retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem(constant.NAME);
          if (value !== null) {
            // We have data!!
            console.log(value);
            this.setState({name:value})
          }
        } catch (error) {
          // Error retrieving data
          console.log(error);
        }
      };
   
}

const styles = StyleSheet.create({

   
    titleToolbar: {
        marginTop:5,
        marginBottom:5,
        fontSize: 18,
        marginStart: 15,
        textAlign:"center",
        textTransform: 'lowercase',
    },
    toolBar: {
        padding: 2,

        flexDirection: 'row',
        alignItems:'center'
    },
   
   
   

})


