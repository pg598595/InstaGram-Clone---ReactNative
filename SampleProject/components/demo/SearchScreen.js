import React, { Component } from 'react'
import { FlatList, Image, Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, NavigationEvents } from 'react-navigation';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { connect } from 'react-redux'
import * as constant from './Constants';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation-stack';
import { ScrollView } from 'react-native-gesture-handler';



class SearchScreen extends Component {
    constructor() {
        super()

        this.state = {
            searchText: '',
            searchList: []


        }
        // this.searchListApi('d')
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>

                    <Image style={{ height: 20, width: 20 }} source={require('../../images/searchDark.png')}></Image>

                    <TextInput
                        value={this.state.searchText}
                        placeholder="Search"
                        onChangeText={(searchText) => this.searchListApi(searchText)}
                        style={{ marginStart: 5, fontSize: 18, paddingVertical: 0 }}

                    ></TextInput>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <AntDesign size={25} name='scan1' />
                    </View>

                </View>
                
                <FlatList

                    data={this.state.searchList}

                    renderItem={({ item }) => {

                        return <View style={styles.searchContainer}>

                            <Image source={(item.photo != null) ? { uri: item.photo } : { uri: constant.PLACEHOLDER_IMAGE }} style={styles.image}></Image>

                            <Text style={{fontSize:15}}>{item.name}</Text>

                        </View>
                    }}
                    keyExtractor={(item) => item.recipeId}
                    extraData={this.state}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    ListEmptyComponent={this.ListEmpty}
                ></FlatList>

            </View>
        );
    }
    ListEmpty = () => {
        return (
            //View to show when list is empty
            <View style={{ flex: 1, justifyContent: 'center', }}>
                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: 'black' }}>No Result Found</Text>
            </View>
        );
    };
    searchListApi = (searchText) => {
        this.setState({ searchText: searchText })
        fetch('http://35.160.197.175:3006/api/v1/recipe/feeds?q=' + this.state.searchText,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
                },

            }).then((response) => {
                if (response.status == 200) {
                    return response.json().then((responseJSON) => {
                        console.log(responseJSON);

                        this.setState({ searchList: responseJSON });

                    })
                } else {
                    console.log(response.body);
                    Alert.alert('Error', 'Please try again later.', [
                        {
                            text: 'Ok',
                        },

                    ])
                    // this.setState({ isLoading: false });


                }
            })
    }


}

const mapStateToProps = (state) => {
    // console.log("called ==" + state.userReducer.token);

    return { token: state.userReducer.token }
}

export default connect(mapStateToProps)(SearchScreen)


const styles = StyleSheet.create({
    image: {
        height: 100,
        width: '100%'
    },
    container: {

        flex: 1
    },
    searchContainer: {
        padding: 10
    }
})