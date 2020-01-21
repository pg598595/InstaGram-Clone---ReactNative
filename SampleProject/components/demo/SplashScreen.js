import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet,KeyboardAvoidingView } from 'react-native'
import LoginPage from './LoginPage';
import AppNavigator from './AppNavigator';

export default class SplashScreen extends Component {
    componentDidMount () {
        setTimeout(() => {
    
            //this.props.navigation.navigate('loginscreen')

            
        }, 2000)
      }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../../images/sun5.png')} />
                </View>
                <View>
                <Text style={styles.subtitle}>Made by React Native</Text>

                </View>
            </View>
        )
    }
}

//export default SplashScreen

const styles = StyleSheet.create({

    container: {
        backgroundColor: "#D58AEA",
        flex: 1
    },
    logoContainer:{
        alignItems:'center',
        flex: 1,
        justifyContent:'center'
    },
    logo:{
        height: 100,
        width: 100
    },
    subtitle:{
            color:'#FFF',
            textAlign:'center',
            paddingBottom:10
    }
})