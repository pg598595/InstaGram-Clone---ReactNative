import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView,Alert,FlatList,RefreshControl } from 'react-native'

import * as constant from './Constants';
import LoadingIndicator from './LoadingIndicatior';

export default class InstructionScreen extends Component {
    // static navigationOptions = {
    // title:this.state.nameofRecipe

    // }
    constructor() {
        super()
        this.state = {
            isLoading: false,
            recipeId: 0,
            instructionList: [
            ],

        }

    }
    componentDidMount() {
        //this.props.navigation.state['params']['token']
        //console.log(this.props.navigation.state['params']['details']);
        // const f = this.props.navigation.state['params']['details']
        console.log('called Instruction Screen');
        const itemDetails = this.props.screenProps.itemDetails.navigation.state['params']
        this.setState({ recipeId: itemDetails.details.recipeId })
        console.log('recipeId:'+itemDetails.details.recipeId);
        this.getIngredientsfromApi(itemDetails.details.recipeId);

    }
    render() {
        return (


            <View style={styles.container}>

                <LoadingIndicator isLoading={this.state.isLoading}></LoadingIndicator>
                <FlatList
                    ItemSeparatorComponent={this.separator}
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh}></RefreshControl>
                    }
                    data={this.state.instructionList}

                    renderItem={({ item }) => {
                        return <View>
                            <View >
                               <Text>ds</Text>
                               
                            </View>


                        </View>
                    }}
                    keyExtractor={(item) => item.id}
                    extraData={this.state}
                ></FlatList>

            </View>

        )
    }

    getIngredientsfromApi = (id) => {
        fetch('http://35.160.197.175:3006/api/v1/recipe/'+id+'/instruction',
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
                    this.setState({ instructionList: responseJSON });
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
        flex: 1
    },

})