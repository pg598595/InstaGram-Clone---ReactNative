import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, TextInput, View, Image, StyleSheet, TouchableOpacity, StatusBar, Alert, ImageBackground } from 'react-native'
import  AsyncStorage  from '@react-native-community/async-storage'
import * as constant from './Constants';
export default class LoginPage extends Component {
    constructor() {
        super()
        this.state = { email: '', password: '' }

    }
    render() {
        return (
            <ImageBackground source={require('../../images/bgImage.jpg')} style={{ width: '100%', height: '100%' }}>
                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <Text style={styles.title}>Login</Text>
                        <Text style={styles.titlesmall}>Welcome Again!!</Text>
                    </View>
                    <View style={styles.formContainer}>
                        <View style={styles.container}>
                            <TextInput
                                value={this.state.email}
                                onChangeText={(email) => this.setState({ email })}
                                placeholder="Email"
                                placeholderTextColor="#C6C6C6"
                                style={styles.input}
                                returnKeyType="next"
                                keyboardType='email-address'
                                autoCapitalize="none"
                                autoCorrect={false}
                                onSubmitEditing={() => this.passwordInput.focus()}
                            />
                            <TextInput
                                value={this.state.password}
                                onChangeText={(password) => this.setState({ password })}
                                placeholder="Password"
                                placeholderTextColor="#C6C6C6"
                                secureTextEntry
                                style={styles.input}
                                ref={(input) => this.passwordInput = input}
                            />
                            <TouchableOpacity style={styles.buttonContainer} onPress={this.login}>
                                <Text style={styles.buttonText}>LOGIN</Text>
                            </TouchableOpacity>
                            <Text style={styles.dontHaveAccount}>Don't have account? Signup</Text>

                        </View>

                    </View>
                    <View style={styles.bottomContainer}>

                    </View>
                </View>
                {/* <View style={styles.intro}>

                </View> */}
            </ImageBackground>
        )
    }
    login = () => {
        console.log("====================")
        console.log('email =' + this.state.email + ' password =' + this.state.password)
        fetch('http://35.160.197.175:3006/api/v1/user/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'email': this.state.email,
                    'password': this.state.password
                })
            }).then((response) => {
                if (response.status == 200) {
                    return response.json().then((responseJSON) => {
                        console.log(responseJSON.token);
                       // this.goToHomePage
                        this.storeData(responseJSON)
                        
                        Alert.alert('Success', 'Successfully logged in', [
                            {
                                text: 'Ok',
                                onPress: this.goToHomePage

                            },

                        ])

                    })
                } else {
                    console.log(response.body);
                    Alert.alert('Error', 'Please enter valid credentials.', [
                        {
                            text: 'Ok',
                        },

                    ])

                }
            })
    }

    storeData = async (responseJSON) => {
        console.log('called store data '+responseJSON.email);
        try {
            let userId = '';
            userId=responseJSON.email;
            console.log('called try block '+ userId);
            
           await AsyncStorage.setItem('named', userId)
        } catch (e) {
            console.log('called catch block----e --------'+e);
        }
      }

    goToHomePage = () => {
        console.log("Opening Home page")
        this.props.navigation.navigate('HomePage')

    }
}

const styles = StyleSheet.create({
    subtitle: {
        color: '#FFF',
        textAlign: 'center',
        paddingBottom: 10

    },
    intro: {
        flex: 0.1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titlesmall: {
        color: '#FFFFFF',
        marginTop: 5,
        opacity: 0.8,
        fontSize: 15,
        paddingBottom: 10,

        fontWeight: 'bold'
    },
    dontHaveAccount: {
        alignSelf: 'center',
        color: '#FFFFFF',
        marginTop: 200,
        opacity: 0.8,
        fontSize: 15,
        paddingBottom: 10,

        fontWeight: 'bold'
    },

    container: {

        backgroundColor: "rgba(0,0,0,0.3)",
        flex: 1,
        padding: 20
    },
    logoContainer: {
        alignItems: "center",
        flex: 0.2,
        justifyContent: "flex-end"
    },
    logo: {
        width: 100,
        height: 100
    },
    title: {
        color: '#FFFFFF',
        marginTop: 10,
        opacity: 0.8,
        fontSize: 30,
        fontWeight: 'bold'
    }
    ,
    formContainer: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        marginTop: 20,
        flex: 0.5,
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    bottomContainer: {
        flex: 0.4,

    },
    input: {
        marginBottom: 10,
        height: 40,
        backgroundColor: 'rgba(255,255,255,1)',
        color: '#000000',
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5
    },
    buttonContainer: {
        backgroundColor: "#F26D00",
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        marginTop: 20
    },
    buttonText: {
        textAlign: 'center',
        color: "#FFF",
        fontWeight: 'bold'
    }

})