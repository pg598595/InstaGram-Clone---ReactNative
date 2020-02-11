import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, TextInput, View, Image, StyleSheet, TouchableOpacity, StatusBar, Alert, ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import * as constant from './Constants';
import LoadingIndicator from './LoadingIndicatior';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {setToken} from '../actions/userActions'
class LoginPage extends Component {
    constructor() {
        super()
        this.state = { email: '', password: '',isLoading: false }

    }
    render() {
        return (
            <View style={styles.container}>
               
                <View style={styles.logoContainer}>
                    <Text style={styles.title}>Foodogram</Text>

                </View>
               
                <View style={styles.formContainer}>
                <LoadingIndicator
             ></LoadingIndicator>
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
                            <Text style={styles.buttonText}>Log In</Text>
                        </TouchableOpacity>
                        <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'center', marginTop: 5 }}>
                            <Text style={styles.dontHaveAccount}>Forgot your login details? </Text>
                            <Text style={styles.signupText}>Get help signing in.</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'center', marginTop: 90 }}>
                            <Text style={styles.dontHaveAccount}>Don't have account? </Text>
                            <Text style={styles.signupText}>Sign up</Text>
                        </View>

                    </View>

                </View>
              
                
            </View>
             


        )
    }
    login = () => {
        console.log("====================")
        this.setState({isLoading: true})
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
                        this.setState({isLoading: false})
                         //this.goToHomePage
                         this.storeData(responseJSON)
                        this.props.setToken(responseJSON.token)
                        var str = 'Successfully logged in as ';

                        // Joining the strings together 
                        var value = str.concat(responseJSON.firstName+' ' +responseJSON.lastName);
                        Alert.alert('Welcome', value, [
                            {
                                text: 'Ok',
                                onPress: this.goToHomePage

                            },

                        ])

                    })
                } else {
                    this.setState({isLoading: false})
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
        
        try {
            let userId = '';
            userId = responseJSON.firstName+responseJSON.lastName;
            
            await AsyncStorage.setItem(constant.NAME, userId)
            await AsyncStorage.setItem(constant.API_TOKEN, responseJSON.token)
            
        } catch (e) {
            console.log('called catch block----e --------' + e);
        }
    }

    goToHomePage = () => {
        console.log("Opening MainScreen page")
        this.props.navigation.navigate('MainScreen')

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setToken:(token)=>{
            dispatch(setToken(token))
        }
    }
}
const mapStateToProps = (state) => {
    return { token: state.token }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)



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



        opacity: 0.8,
        fontSize: 13,
        paddingBottom: 10,


    },
    signupText: {
        color: '#1774EA',
        opacity: 0.8,
        fontSize: 13,
        paddingBottom: 10,
        fontWeight: 'bold'
    },

    container: {

        flex: 1,
        padding: 20
    },
    logoContainer: {
        
        marginTop:100,
        alignItems: "center",
        flex: 0.2,
        justifyContent: "flex-end"
    },
    logo: {
        width: 100,
        height: 100
    },
    title: {
        marginTop: 10,
        opacity: 0.8,
        fontSize: 35,
        fontFamily: 'Blessed'
    }
    ,
    formContainer: {
       
        flex: 0.8,
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    bottomContainer: {
        flex: 0.1,
        backgroundColor: 'pink'

    },
    input: {
        marginBottom: 10,
        height: 40,
        backgroundColor: 'rgba(193,193,193,0.2)',
        color: '#000000',
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'rgba(193,193,193,0.8)',
        borderRadius: 5
    },
    buttonContainer: {
        backgroundColor: "#1774EA",
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        marginTop: 5
    },
    buttonText: {
        textAlign: 'center',
        color: "#FFF",
        fontWeight: 'bold',
        fontSize: 15
    }

})