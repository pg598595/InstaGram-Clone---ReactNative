import React, { Component } from 'react'
import { ToolbarAndroid,Text, View, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView } from 'react-native'

export default class HomePageToolBar extends Component {
   
    render() {
        return (
            
            <View style={styles.toolBar}>
                    <Image style={styles.iconcamera} source={require('../../images/Camera-1.jpg')} />
                    <Text style={styles.titleToolbar}>Foodogram</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Image style={styles.icon} source={require('../../images/Send-1.jpg')} />

                    </View>
                </View>
            
        )
    }
   
}

const styles = StyleSheet.create({

    iconcamera: {
        height: 22,
        width: 25,
        marginStart: 10
    },
    titleToolbar: {
        marginTop:5,
        fontSize: 20,
        marginStart: 15,
        fontFamily: 'Blessed',
        textAlign:"center"
    },
    toolBar: {
        padding: 5,

        flexDirection: 'row',
        alignItems:'center'
    },
   
    icon: {
        height: 19,
        width: 25,
        marginStart: 20
    },
   

})