import React, { Component } from 'react'
import { Dimensions, Alert, TouchableWithoutFeedback, FlatList, RefreshControl, Text, View, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native'

import * as constant from './Constants';
import LoadingIndicator from './LoadingIndicatior';
import AsyncStorage from '@react-native-community/async-storage'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { connect } from 'react-redux'
import {setFeedList} from '../actions/dataActions'
import ProfilePost from './ProfilePost';

class ProfileScreen extends Component {


    onRefresh = () => {
        this.setState({ setRefreshing: true });
       // this.getListfromApi()
    };

    componentDidMount() {
        this.setState({ isLoading: true });
        console.log("called home comopent")
        console.log("===========================")
        this.retrieveData()
        //this.getListfromApi()

        console.log("==+++++++++++++++++");
        console.log(this.props.recipeFeed);
        
        
    }

    constructor() {
        super()

        this.state = {
            userName: '',
            name:'',
            checked: false,
            isLoading: false,
            noOfPost: 0,
            refreshing: false,
            setRefreshing: false,
            placeHolderImage: 'https://www.mageworx.com/blog/wp-content/uploads/2012/06/Page-Not-Found-13.jpg',
            profilePicture: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg'


        }


    }
    retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem(constant.NAME);
            if (value !== null) {
                // We have data!!
                console.log(value);
                this.setState({ userName: value })
                this.setState({name:value})
            }
        } catch (error) {
            // Error retrieving data
            console.log(error);
        }
    };
    

    render() {
        return <View style={{ backgroundColor: 'rgba(219, 219, 219,0.2)' }}>

            <SafeAreaView>
            <View style={styles.toolBar}>
                    <Text style={styles.titleToolbar}>{this.state.userName}</Text>
                    <EvilIcons name='navicon' size={35} onPress={()=>this.props.navigation.openDrawer()}/>
                </View>
            
                <ScrollView showsHorizontalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row', padding: 12, backgroundColor: 'rgba(219, 219, 219,0)' }}>
                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                            <Image style={styles.profileImage} source={{ uri: this.state.profilePicture }} />
                            <Text style={{ marginTop: 5 }}>{this.state.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1, marginTop: 15 }}>
                            <View style={styles.details}>
                                <Text style={styles.textBold}>{this.props.recipeFeed.length}</Text>
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
                    <View style={{ padding: 12, backgroundColor: 'rgba(219, 219, 219,0)' }} >
                        <TouchableOpacity style={styles.buttonContainer} onPress={this.login}>
                            <Text style={styles.buttonText}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                    <ProfilePost></ProfilePost>
                    {/* <LoadingIndicator isLoading={this.state.isLoading}></LoadingIndicator> */}

                   
                </ScrollView>
            </SafeAreaView>
        </View>
    }

   


}
const mapDispatchToProps = (dispatch) => {
    return {
        setFeedList :(list)=>{
            dispatch(setFeedList(list))
        }
    }
}
const mapStateToProps = (state) => {
    console.log("Called Profile Screen");
    
    return { recipeFeed: state.dataReducer.recipeFeed, token: state.userReducer.token }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfileScreen)

const styles = StyleSheet.create({
    textBold: {
        fontWeight: 'bold',
        fontSize: 18
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
        marginTop:5,
        marginBottom:5,
        fontSize: 20,
        marginStart: 15,
        textAlign:"center",
        textTransform: 'lowercase',
    },
    toolBar: {
        padding: 10,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between'
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