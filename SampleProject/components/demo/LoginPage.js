import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet,KeyboardAvoidingView } from 'react-native'
import LoginForm from './LoginForm';

class LoginPage extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../../images/sun5.png')} />
                    <Text style={styles.title}>Login</Text>
                </View>
                <View style={styles.formContainer}>
                <LoginForm/>
                </View>
            </View>
        )
    }
}

export default LoginPage

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
    logo: {
        width: 100,
        height: 100
    },
    title: {
        color: '#070707',
        marginTop:10,
        opacity:0.8
    }
    ,
    formContainer: {
       
      
    }

})