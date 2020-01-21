import React, { Component } from 'react'
import { Text, TextInput, View, Image, StyleSheet, TouchableOpacity, StatusBar } from 'react-native'


export default class LoginForm extends Component {

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder="Username or Email"
                    placeholderTextColor="rgba(255,255,255,0.8)"
                    style={styles.input}
                    returnKeyType="next"
                    keyboardType='email-address'
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={() => this.passwordInput.focus()}
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="rgba(255,255,255,0.8)"
                    secureTextEntry
                    style={styles.input}
                    ref={(input) => this.passwordInput = input}
                />
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>

            </View>

        )
    }
}

//export default LoginForm

const styles = StyleSheet.create({

    container: {
        padding: 20
    },
    input: {
        marginBottom: 10,
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.3)',
        color: '#FFF',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: "#720A77",
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color: "#FFF",
        fontWeight: 'bold'
    }
})