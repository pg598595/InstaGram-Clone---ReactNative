import React, { Component } from 'react'
import { TouchableWithoutFeedback, FlatList, RefreshControl, Text, View, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native'
import Icon from "react-native-vector-icons/MaterialIcons";
import * as constant from './Constants';
// import { Icon } from 'react-native-elements';
import LoadingIndicator from './LoadingIndicatior';


export default class PostDemo extends Component {


    onRefresh = () => {
        this.setState({ setRefreshing: true });
        this.componentDidMount
    };

    componentDidMount() {
        console.log("called home comopent")
        console.log("===========================")
        console.log('Getting Data from API')
        fetch('http://35.160.197.175:3006/api/v1/recipe/feeds',
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
    }

    constructor() {
        super()

        this.state = {
            recipesList: [
            ],
            refreshing: false,
            setRefreshing: false,
            placeHolderImage: 'https://www.mageworx.com/blog/wp-content/uploads/2012/06/Page-Not-Found-13.jpg'
        }


    }

    onPostClick = (item) => {
        console.log('====================================');
        console.log(item);
        console.log('====================================');
    }

    render() {
        return <View>
            <SafeAreaView>
                <LoadingIndicator ></LoadingIndicator>
                {/* <Text>Test</Text> */}
                <FlatList
                    ItemSeparatorComponent={this.separator}
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh}></RefreshControl>
                    }
                    data={this.state.recipesList}

                    renderItem={({ item }) => {
                        return <View>
                            <TouchableWithoutFeedback onPress={() => this.onPostClick(item)}>
                                <View style={styles.postContainer}>
                                    <View style={styles.header}>
                                        <Text style={styles.userName}>{item.firstName}{item.lastName}</Text>
                                    </View>
                                    <Image source={(item.photo != null) ? { uri: item.photo } : { uri: this.state.placeHolderImage }} style={styles.image}></Image>
                                    <Text>{item.name}</Text>
                                </View>

                            </TouchableWithoutFeedback>
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
    userName:{
        textTransform:'lowercase'
    },
    header: {
        margin:10,
        flex:1,
        flexDirection:'row'
    },
    image: {
        height: 200,
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