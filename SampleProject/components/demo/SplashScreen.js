import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView } from 'react-native'
import LoginPage from './LoginPage';
import AsyncStorage from '@react-native-community/async-storage'
import * as constant from './Constants';



export default class SplashScreen extends Component {
    constructor() {
        super()
        this.state = { name: '' }

    }
    componentDidMount() {
        this.retrieveData()
        setTimeout(() => {
            if(this.state.name === ''){
                const {navigate} = this.props.navigation;
                this.props.navigation.navigate('LoginPage')
            }else{
                const {navigate} = this.props.navigation;
                this.props.navigation.navigate('MainScreen')
            }
           
        }, 5000)
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../../images/instagram.png')} />
                </View>
                <View style={styles.intro}>
                    <Text style={styles.subtitleFrom}>from</Text>
                    {/* <Image style={styles.subtitleFb} source={require('../../images/facebookText.png')}></Image> */}
                    <Text style={styles.subtitleFb}>FACEBOOK</Text>
                </View>
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
        color: '#8E8E8E',
        textAlign: 'center',
    },
    subtitleFb: {
        textAlign:'center',
        fontWeight:'bold',
        fontSize:15,
        letterSpacing:2
        
    },
    intro: {
        flex: 0.1,
        paddingBottom: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
})