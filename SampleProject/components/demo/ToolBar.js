import React, { Component } from 'react'
import { ToolbarAndroid,Text, View, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView } from 'react-native'

export default class ToolBar extends Component {
   
    render() {
        return (
            <View style={{backgroundColor:'yellow'}}>
            <ToolbarAndroid
            
            style={{height:150,backgroundColor:'pink'}}
            logo={require('../../images/splash.jpg')}
            title="Instagram"
            actions={[{title: 'Settings', icon: require('../../images/splash.jpg'), show: 'always'}]}
            onActionSelected={this.onActionSelected} />
            </View>
        )
    }
    onActionSelected = () => {
        console.log("called onActionSelected")
    }
}