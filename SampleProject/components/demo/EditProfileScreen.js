import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, TextInput, View, Image, StyleSheet, TouchableOpacity, StatusBar, Alert, ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import * as constant from './Constants';
import LoadingIndicator from './LoadingIndicatior';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ImagePicker from "react-native-image-picker";
import { StackActions } from '@react-navigation/native';


import {
    TextField,
    FilledTextField,
    OutlinedTextField,
} from 'react-native-material-textfield';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { setToken } from '../actions/userActions'

class EditProfileScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerTitle: <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <Text style={{ fontSize: 18 }}>Edit Profile</Text>
            </View>,
            headerTitleStyle: { fontSize: 18 },
            // headerStyle: {backgroundColor:'#3c3c3c'},
            headerRight: <TouchableOpacity style={{ marginEnd: 10 }} onPress={() => params.handleSave()}>
                <AntDesign name='check' size={25} color='#1774EA' />
            </TouchableOpacity>

        };
    };
    componentDidMount() {
        this.props.navigation.setParams({ handleSave: this.saveImage })
        console.log(this.props.navigation.state['params']['userName']);
        this.setState({ name: this.props.navigation.state['params']['userName'] })
        console.log('========saving============');

        console.log(this.state.name);



    }

    constructor() {
        super()
        this.state = {
            pickedImage: null,
            screenCalled: 0,
            name: 'Jay Metha',
            userName: 'jaymetha'
        }
    }

    render() {
        return (
            <View style={styles.container}>


                <Image style={styles.profileImage} source={(this.state.pickedImage != null) ? { uri: this.state.pickedImage } : { uri: this.props.uri }} />
                <TouchableOpacity onPress={this.getNewPhoto}>
                    <Text style={styles.changeText}>Change Profile Photo</Text>
                </TouchableOpacity>
                <TextField
                    style={styles.input}
                    label='Name'
                    value={this.state.name}
                    onChangeText={(name) => this.setState({ name })}
                />
                <TextField
                    style={styles.input}
                    label='Username'
                    value={this.state.userName}
                    onChangeText={(userName) => this.setState({ userName })}
                />

            </View>
        )
    }

    getNewPhoto = () => {

        ImagePicker.showImagePicker({ title: "Pick an Image", maxWidth: 800, maxHeight: 600 }, res => {
            if (res.didCancel) {
                console.log("User cancelled!");
                // this.props.navigation.popToTop()
            } else if (res.error) {
                console.log("Error", res.error);
            } else {
                console.log(res.uri);

                this.setState({
                    pickedImage: res.uri

                });


            }
        });


    }
    saveImage = () => {
        console.log('Saving Image');
        
        this.props.setToken(this.props.token,this.state.pickedImage)
        this.props.navigation.navigate('ProfileDrawer');
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        setToken:(token,uri)=>{
            dispatch(setToken(token,uri))
        }
    }
}
const mapStateToProps = (state) => {
    // console.log('================================');

    // console.log(state.userReducer);

    return { uri: state.userReducer.userProfilePic,token: state.userReducer.token}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen)



const styles = StyleSheet.create({
    input: {
        fontSize: 15
    },
    changeText: {
        alignSelf: 'center',
        color: '#1774EA',
        fontSize: 16,
        marginTop: 8
    },
    profileImage: {
        alignSelf: 'center',
        height: 100,
        width: 100,
        borderRadius: 100
    },

    container: {

        flex: 1,
        padding: 20
    },



})