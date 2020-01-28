import React, { Component } from 'react'
import {TouchableWithoutFeedback, FlatList, RefreshControl, Text, View, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native'
import AntIcons from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/EvilIcons";


import * as constant from './Constants';
// import { Icon } from 'react-native-elements';
import LoadingIndicator from './LoadingIndicatior';
import { Checkbox } from 'react-native-paper';
import FontAwesome from "react-native-vector-icons/FontAwesome";



export default class PostDemo extends Component {


    onRefresh = () => {
        this.setState({ setRefreshing: true });
        fetch('http://35.160.197.175:3006/api/v1/recipe/cooking-list',
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
                    this.setState({ setRefreshing: false });


                })
            } else {
                console.log(response.body);
                Alert.alert('Error', 'Please try again later.', [
                    {
                        text: 'Ok',
                    },

                ])
                this.setState({ setRefreshing: false });

            }
        })
    };

    componentDidMount() {
        this.setState({ isLoading: true });
        console.log("called home comopent")
        console.log("===========================")
        console.log('Getting Data from API')
        fetch('http://35.160.197.175:3006/api/v1/recipe/cooking-list',
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

    constructor() {
        super()

        this.state = {
            isLoading: false,
            checked:false,
            recipesList: [
            ],
            refreshing: false,
            setRefreshing: false,
            placeHolderImage: 'https://www.mageworx.com/blog/wp-content/uploads/2012/06/Page-Not-Found-13.jpg',
            profilePicture: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg'
            
        }


    }

    onPostClick = (item) => {
        console.log(item);
    }

    render() {
        return <View>
            
            <SafeAreaView>
               <View style={styles.toolBar}>
               <Image style={styles.iconcamera} source={require('../../images/Camera-1.jpg')} />   
             <Text style={styles.titleToolbar}>Instagram</Text>
             <View style={{flex:1,alignItems:'flex-end'}}>
             <Image style={styles.icon} source={require('../../images/Send-1.jpg')} />
        
                                    </View>
               </View>
                <LoadingIndicator isLoading={this.state.isLoading}></LoadingIndicator>
                {/* <Text>Test</Text> */}
                <FlatList
                    ItemSeparatorComponent={this.separator}
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh}></RefreshControl>
                    }
                    data={this.state.recipesList}

                    renderItem={({ item }) => {
                        return <View>
                                <View style={styles.postContainer}>
                                    <View style={styles.header}>
                                    <Image style={styles.profileImage} source={{uri: this.state.profilePicture}}/>
                                        <View style={styles.nameandLocation}>
                                        <Text style={styles.userName}>{item.firstName}{item.lastName}</Text>
                                        <Text style={styles.locationName}>Ahmedabad,Gujarat</Text>

                                        </View>
                                        <View style={{flex:1,alignItems:'flex-end'}}>
                                        <Entypo  name='dots-three-vertical' size={15}/>

                                        </View>
                                    </View>
                                    <TouchableWithoutFeedback onPress={() => this.onPostClick(item)}>

                                    <Image source={(item.photo != null) ? { uri: item.photo } : { uri: this.state.placeHolderImage }} style={styles.image}></Image>
                                    </TouchableWithoutFeedback>
                                    <View style={styles.header}>

                                    <FontAwesome name='heart-o' size={23}/>
                                    <Image style={styles.iconComment} source={require('../../images/Comment-1.jpg')} />


                                    <Image style={styles.icon} source={require('../../images/Send-1.jpg')} />
                                    
                                    <View style={{flex:1,alignItems:'flex-end'}}>
                                    
                                    <FontAwesome name='bookmark-o' size={23}/>
                                    </View>
                                   

                                    </View>
                                    <View style={styles.likeSpantext}>
                                    <Text style={styles.caption}>Liked by</Text>
                                    <Text style={styles.userName}> {item.serves}</Text>
                                    <Text style={styles.caption}> peoples</Text>
                                    </View>
                                    
                                    <View style={styles.bottom}
                                    >
                                    <Text style={styles.userName}>{item.firstName}{item.lastName}</Text>
                                    <Text style={styles.caption}> {item.name}</Text>

                                    </View>
                                </View>
                               
                           
                        </View>
                    }}
                    keyExtractor={(item) => item.recipeId}
                    extraData={this.state}
                ></FlatList>
            </SafeAreaView>
        </View>
    }

    separator = () => (
        <View
            style={styles.dividerLine}
        />
    );

    getListfromApi = () => {

    }



}

const styles = StyleSheet.create({
    iconcamera:{
        height:22,
        width:25,
        marginStart:10
    },
    titleToolbar:{
        fontSize:20,
        fontWeight:'bold',
        marginStart:10
    },
    toolBar:{
        padding:10,
        
        flexDirection:'row',
        alignItems:'center'
    },
    likeSpantext:{
        marginStart:10,
        
        flex:1,
        flexDirection:'row',
        alignItems:'center',
    },
    caption:{
        fontSize:13,
        fontWeight:'800',
        
    },
    bottom:{
        marginStart:10,
        marginBottom:10,
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        
    },
    iconComment:{
        height:20,
        width:21,
        marginStart:10
    },
    icon:{
       height:20,
       width:25,
       marginStart:10
    },
    locationName:{
        fontSize:12,
        fontWeight:'500'
    },
    nameandLocation:{
        marginStart:8
    },
    profileImage:{
        height:30,
        width:30,
        borderRadius:100
    },
    userName:{
        textTransform:'lowercase',
        fontSize:14,
        fontWeight:'bold',
       
    },
    header: {
        margin:10,
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        
    },
    image: {
        height: 220,
        width: '100%'
    },
    postContainer: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    dividerLine: {
        backgroundColor: 'rgba(178,178,178,0.3)',
        height: '0.2%',
    }



})