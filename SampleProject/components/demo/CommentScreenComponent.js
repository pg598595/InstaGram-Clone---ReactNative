import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, ImageBackground,Share } from 'react-native'

import * as constant from './Constants';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


export default class CommentScreenComponent extends Component {
    // static navigationOptions = {
    // title:this.state.nameofRecipe

    // }
    constructor() {
        super()
        this.state = {
            nameofRecipe: '',
            photo: '',


            firstName: '',
            inCookingList: 0,
            lastName: '',

            recipeId: '', serves: ''

        }

    }
    componentDidMount() {

        console.log('called Comment Screen');
       

        console.log(this.props);
    }

   

    render() {
        return (

                <View style={{ flex: 1 }}>

                <Text>Commnet Screen</Text>

                </View>
               
              

        )
    }

}

//export default SplashScreen

const styles = StyleSheet.create({
    titleSmall:{
        color:'white',
        fontSize:18
    },
    recipeName: {
        color: 'white',
        fontWeight:'bold',
        fontSize: 20,
        textTransform: 'capitalize',
        
    },
    publisherName: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    image: {
        height: '100%',
        width: '100%'
    },
    container: {
        flex: 0.3,
        margin: 10,
        padding: 15,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },

})