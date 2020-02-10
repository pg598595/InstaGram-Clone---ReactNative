import React, { Component } from 'react'
import { Dimensions,Alert, TouchableWithoutFeedback, FlatList, RefreshControl, Text, View, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native'

import * as constant from '../demo/Constants';
import LoadingIndicator from '../demo/LoadingIndicatior';



export default class FavoriteScreen extends Component {


    onRefresh = () => {
        this.setState({ setRefreshing: true });
        this.getListfromApi()
    };

    componentDidMount() {
        this.setState({ isLoading: true });
        console.log("called favorite comopent")
        console.log("===========================")
       
       this.getListfromApi()
    }

    constructor() {
        super()

        this.state = {
            checked:false,
            isLoading: false,
            recipesList: [
            ],
            refreshing: false,
            setRefreshing: false,
            placeHolderImage: 'https://www.mageworx.com/blog/wp-content/uploads/2012/06/Page-Not-Found-13.jpg',
            

        }


    }

    onPostClick = (item) => {

        Alert.alert(item.name, 'Complexity: ' + item.complexity + '                             ' +
            'Preparation Time: ' + item.preparationTime + '                                 ' +
            'No. of serves: ' + item.serves
            , [
                {
                    text: 'OK',


                },

            ])
    }

    render() {
        return <View>

            <SafeAreaView>
            <View style={styles.toolBar}>
            <Image style={styles.iconcamera} source={require('../../images/likeRed.png')} />

            <Text style={styles.titleToolbar}>Favorites</Text>
                </View>
                <LoadingIndicator isLoading={this.state.isLoading}></LoadingIndicator>
               
                <FlatList
                    
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh}></RefreshControl>
                    }
                    numColumns={3}
                    data={this.state.recipesList}

                    renderItem={({ item }) => {
                        return <View style={{margin: 1, backgroundColor: 'cyan', height: 100, width: ((Dimensions.get('window').width-6)/3) }}>
                            <View style={styles.postContainer}>
                                
                                <TouchableWithoutFeedback onPress={() => this.onPostClick(item)}>

                                    <Image source={(item.photo != null) ? { uri: item.photo } : { uri: this.state.placeHolderImage }} style={styles.image}></Image>
                                </TouchableWithoutFeedback>
                               
                            </View>


                        </View>
                    }}
                    keyExtractor={(item) => item.recipeId}
                    extraData={this.state}
                ></FlatList>
            </SafeAreaView>
        </View>
    }

   
    getListfromApi = () => {
        fetch(constant.API_FOR_COOKING_LIST,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': constant.API_TOKEN
            },

        }).then((response) => {
            if (response.status == 200) {
                return response.json().then((responseJSON) => {
                    console.log(responseJSON);
                    this.setState({ recipesList: responseJSON });
                    //DATA = responseJSON
                    console.log(this.state.recipesList);
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

const styles = StyleSheet.create({
    iconcamera: {
        height: 22,
        width: 25,
        marginStart: 10
    },
    titleToolbar: {
        marginTop:5,
        fontSize: 20,
        marginStart: 15,
        fontFamily: 'Blessed',
        textAlign:"center"
    },
    toolBar: {
        padding: 2,

        flexDirection: 'row',
        alignItems:'center'
    },
   
    image: {
        height: '100%',
        width: '100%'
    },
    postContainer: {
        flex: 1,
        backgroundColor: '#FFF'
    },
   


})