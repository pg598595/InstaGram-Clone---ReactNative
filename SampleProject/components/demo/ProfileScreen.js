import React, { Component } from 'react'
import { Dimensions,Alert, TouchableWithoutFeedback, FlatList, RefreshControl, Text, View, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native'

import * as constant from './Constants';
import LoadingIndicator from './LoadingIndicatior';
import ProfileScreenToolBar from './ProfileScreenToolBar';



export default class ProfileScreen extends Component {


    onRefresh = () => {
        this.setState({ setRefreshing: true });
        this.getListfromApi()
    };

    componentDidMount() {
        this.setState({ isLoading: true });
        console.log("called home comopent")
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
            profilePicture: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg'


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
        return <View  style={{backgroundColor:'rgba(219, 219, 219,0.2)'}}>

            <SafeAreaView>
                <ProfileScreenToolBar></ProfileScreenToolBar>
                <ScrollView showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', padding: 12,backgroundColor:'rgba(219, 219, 219,0)' }}>
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <Image style={styles.profileImage} source={{ uri: this.state.profilePicture }} />
                        <Text style={{ marginTop: 5 }}>Priyanka Gupta</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1,marginTop:15 }}>
                        <View style={styles.details}>
                            <Text style={styles.textBold}>0</Text>
                            <Text>Posts</Text>
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.textBold}>0</Text>
                            <Text>Followers</Text>
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.textBold}>0</Text>
                            <Text>Following</Text>
                        </View>
                    </View>

                </View>
                <View style={{ padding: 12,backgroundColor:'rgba(219, 219, 219,0)' }} >
                     <TouchableOpacity style={styles.buttonContainer} onPress={this.login}>
                            <Text style={styles.buttonText}>Edit Profile</Text>
                        </TouchableOpacity>
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
                </ScrollView>
            </SafeAreaView>
        </View>
    }

   
    getListfromApi = () => {
        fetch(constant.API_FOR_FEED_LIST,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': constant.API_TOKEN
            },

        }).then((response) => {
            if (response.status == 200) {
                return response.json().then((responseJSON) => {
                    
                    this.setState({ recipesList: responseJSON });
                    //DATA = responseJSON
                   
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
    textBold:{
        fontWeight:'bold',
        fontSize:18
    },
    details: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center'
    },
    iconcamera: {
        height: 22,
        width: 25,
        marginStart: 10
    },
    titleToolbar: {
        marginTop: 5,
        fontSize: 20,
        marginStart: 15,
        fontFamily: 'Blessed',
        textAlign: "center"
    },
    toolBar: {
        padding: 2,

        flexDirection: 'row',
        alignItems: 'center'
    },

    image: {
        height: '100%',
        width: '100%'
    },
    postContainer: {
        flex: 1,
        backgroundColor: '#FFF'
    },

    profileImage: {
        height: 80,
        width: 80,
        borderRadius: 100
    },
    buttonContainer: {
        backgroundColor: "#FFF",
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: '#C6C6C6',
        borderRadius: 5,
        marginTop: 5
    },
    buttonText: {
        textAlign: 'center',
    }


})