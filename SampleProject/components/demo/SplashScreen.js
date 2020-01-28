import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView } from 'react-native'
import LoginPage from './LoginPage';

export default class SplashScreen extends Component {
    componentDidMount() {
        setTimeout(() => {
            const {navigate} = this.props.navigation;
            this.props.navigation.navigate('LoginPage')
        }, 2000)
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../../images/splash.jpg')} />
                </View>
                <View style={styles.intro}>
                    <Text style={styles.subtitle}>Made with React Native</Text>

                </View>
            </View>
        )
    }
}

//export default SplashScreen

const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    logoContainer: {
        alignItems: 'center',
        flex: 0.9,
        justifyContent: 'center'
    },
    logo: {
        height: '100%',
        width: '100%'
    },
    subtitle: {
        color: '#FFF',
        textAlign: 'center',
        paddingBottom: 10

    },
    intro: {
        flex: 0.1,
        backgroundColor: '#000000',
        alignItems:'center',
        justifyContent:'center'
    }
})