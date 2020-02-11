import React, { Component } from 'react'
import { ImageBackground,Text, View, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView,Alert,FlatList,RefreshControl } from 'react-native'
import Entypo from "react-native-vector-icons/Entypo";

import * as constant from './Constants';
import LoadingIndicator from './LoadingIndicatior';

export default class InstructionScreen extends Component {
    // static navigationOptions = {
    // title:this.state.nameofRecipe

    // }
    onRefresh = () => {
        this.setState({ setRefreshing: true });
        const itemDetails = this.props.screenProps.itemDetails.navigation.state['params']
        this.getInstructionfromApi(itemDetails.details.recipeId);
    };
    constructor() {
        super()
        this.state = {
            isLoading: false,
            recipeId: 0,
            photo:'',
            instructionList: [
            ],
            refreshing: false,
            setRefreshing: false,

        }

    }
    componentDidMount() {
        //this.props.navigation.state['params']['token']
        //console.log(this.props.navigation.state['params']['details']);
        // const f = this.props.navigation.state['params']['details']
        console.log('called Instruction Screen');
        const itemDetails = this.props.screenProps.itemDetails.navigation.state['params']
        this.setState({ recipeId: itemDetails.details.recipeId })
        this.setState({ photo: itemDetails.details.photo })

        console.log('recipeId:'+itemDetails.details.recipeId);
        this.getInstructionfromApi(itemDetails.details.recipeId);

    }
    render() {
        return (

            <ImageBackground source={(this.state.photo != null) ? { uri: this.state.photo } : { uri: constant.PLACEHOLDER_IMAGE }} style={styles.image}>
            <View style={styles.container}>

                <LoadingIndicator isLoading={this.state.isLoading}></LoadingIndicator>
                <FlatList
                    ItemSeparatorComponent={this.separator}
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh}></RefreshControl>
                    }
                    data={this.state.instructionList}

                    renderItem={({ item }) => {
                        return <View style={{padding:5,marginStart:5,marginTop:5}}>
                            <View style={{flexDirection:'row',alignItems:'center'}} >
                               
                                <Entypo name='check' size={20} color='white' />

                               <Text style={{marginStart:10,color:'white',fontSize:18,fontWeight:'bold'}}>{item.instruction}</Text>
                               
                            </View>


                        </View>
                    }}
                    keyExtractor={(item) => item.id}
                    extraData={this.state}
                    ListEmptyComponent={this.ListEmpty}
                ></FlatList>

            </View>
            </ImageBackground>

        )
    }
    ListEmpty = () => {
        return (
          //View to show when list is empty
          <View style={{flex:1,justifyContent:'center',}}>
            <Text style={{ textAlign: 'center',fontSize:30,fontWeight:'bold',color:'white' }}>No Instruction Found</Text>
          </View>
        );
      };

    getInstructionfromApi = (id) => {
        fetch('http://35.160.197.175:3006/api/v1/recipe/'+id+'/details',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': constant.API_TOKEN
            },

        }).then((response) => {
            if (response.status == 200) {
                return response.json().then((responseJSON) => {
                    //console.log(responseJSON);
                    this.setState({ instructionList: responseJSON.instructions });
                    //DATA = responseJSON
                    console.log('instructionList:====');
                    console.log(this.state.instructionList);
                    this.setState({ isLoading: false });


                })
            } else {
                console.log(response.body);
                Alert.alert('Error', 'Please try again later.', [
                    {
                        text: 'Ok',
                    },

                ])
                this.setState({ isLoading: false });


            }
        })
    }



}

//export default SplashScreen

const styles = StyleSheet.create({
    image: {
        height: '100%',
        width: '100%'
    },
    container: {
        backgroundColor:'rgba(0,0,0,0.7)',
        margin: 10,
        padding: 15,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        borderBottomEndRadius:20,
        borderBottomLeftRadius:20
       
    },

})