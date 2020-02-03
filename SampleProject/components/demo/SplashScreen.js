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
                    <Image style={styles.logo} source={require('../../images/instagram.png')} />
                </View>
                <View style={styles.intro}>
                    <Text style={styles.subtitleFrom}>from</Text>
                    <Text style={styles.subtitleFb}>FACEBOOK</Text>
                    
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
        height: 70,
        width: 70
    },
    subtitleFrom: {
        color: '#C1C1C1',
        textAlign: 'center',
    },
    subtitleFb: {
        textAlign:'center',
        fontWeight:'bold',
        fontSize:15
    },
    intro: {
        flex: 0.1,
        paddingBottom: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
})