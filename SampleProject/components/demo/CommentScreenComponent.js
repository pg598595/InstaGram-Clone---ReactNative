import React, { Component } from 'react'
import { RefreshControl, FlatList, Button, Text, View, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, ImageBackground, Share, TextInput } from 'react-native'

import * as constant from './Constants';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
import { getCurrentDate } from './DateUtils'
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import OptionsMenu from "react-native-options-menu";
import moment from 'moment';


class CommentScreenComponent extends Component {
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
            recipeId: '',
            commentList: [],
            comment: '',
            currentTime: ''



        }
        const myIcon = (<Entypo name='dots-three-vertical' size={15} />
        )

    }

    componentDidMount() {



        console.log('called Comment Screen');

        console.log(this.props.navigation.state['params']['details'].recipeId);
        var details = this.props.navigation.state['params']['details']
        this.setState({ recipeId: details.recipeId, firstName: details.firstName, lastName: details.lastName })
        this.getCommentsList(this.props.navigation.state['params']['details'].recipeId)
    }



    render() {
        return (


            <View style={{ flex: 1, padding: 10 }}>

                <ScrollView style={{ flex: 0.9 }}>
                    <FlatList


                        data={this.state.commentList}

                        renderItem={({ item }) => {
                            return <View style={{ flex: 1, flexDirection: 'row', paddingTop: 5, paddingBottom: 5,alignItems:'center',justifyContent:'center' }}>
                                <Image style={styles.commentProfileImage} source={{ uri: constant.PROFILE_PICTURE }} />
                                <View>
                                    <View style={styles.bottom}>


                                        <Text style={styles.userName}>{item.firstName}{item.lastName}</Text>
                                        {/* <Text style={styles.caption}> {item.comment}</Text> */}
                                        <TextInput
                                            ref={x => this.input = x}
                                            value={item.comment}
                                            placeholder="Add a comment..."
                                            editable={item.isEditable}
                                            placeholderTextColor='#161212'
                                            onChangeText={(comment) => this.setStateComment(comment, item)}
                                            style={[styles.caption, { paddingVertical: 0, color: '#161212' }]}
                                            onSubmitEditing={() => this.sendEditComment(item.comment, item)}
                                        ></TextInput>
                                    </View>
                                    <View style={styles.bottom}>
                                        <Text style={styles.time}>{moment(item.createdAt, "YYYY-MM-DD h:mm:ss").fromNow()}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <View style={{ flexDirection: 'row' }}>

                                        <TouchableOpacity onPress={() => this.editComment(item)}>


                                            <AntDesign name="edit" size={18} color='black' style={{ marginEnd: 5 }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.deleteComment(item)}>
                                            <MaterialCommunityIcons name="delete" size={18} color='black' />
                                        </TouchableOpacity>
                                    </View>
                                    {/* <OptionsMenu
                                        button={}
                                        buttonStyle={{ width: 32, height: 18, margin: 7.5, resizeMode: "contain",backgroundColor:'pink' }}
                                        destructiveIndex={1}
                                        options={["Edit", "Delete"]}
                                        actions={[this.editComment(item), this.deleteComment(item)]} /> */}

                                </View>
                            </View>
                        }}
                        keyExtractor={(item) => item.id}
                        extraData={this.state}
                        contentInsetAdjustmentBehavior="automatic"
                        ListEmptyComponent={this.ListEmpty}
                    ></FlatList>
                </ScrollView>
                <View style={{ flex: 0.1, alignSelf: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>

                    <Image style={styles.commentProfileImage} source={{ uri: constant.PROFILE_PICTURE }} />

                    <TextInput
                        value={this.state.comment}
                        placeholder="Add a comment..."
                        onChangeText={(comment) => this.setState({ comment })}
                        style={{ marginStart: 5, paddingVertical: 0 }}
                        onSubmitEditing={() => this.sendComment()}
                    ></TextInput>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <TouchableOpacity onPress={() => this.sendComment()}>
                            <Text style={{ color: '#1774EA' }}>Send</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </View>



        )
    }
    ListEmpty = () => {
        return (
          //View to show when list is empty
          <View style={{flex:1,justifyContent:'center'}}>
            <Text style={{ textAlign: 'center',fontSize:15,fontWeight:'bold',color:'black' }}>No Comments</Text>
          </View>
        );
      };

    deleteComment = (item) => {
        console.log("Delete Comment Called ==" + item.id);
        fetch('http://35.160.197.175:3006/api/v1/recipe/' + this.state.recipeId + '/comments/' + item.id,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': this.props.token,
                    'Content-Type': 'application/json'
                },

            }
        ).then((response) => {
            if (response.status == 200) {
                console.log("Delete Sucess")
                return response.json()
            } else {
                console.log("Delete Failed")
            }
        }).then((responseJson) => {
            this.getCommentsList(this.state.recipeId)

        }).catch((error) => {
            console.log(error)
        });

    }
    editComment = (item) => {
        console.log("Edit Comment Called ==" + item.id);
        var i;

        //var commentList2 = this.state.commentList
        for (i = 0; i < this.state.commentList.length; i++) {
            if (this.state.commentList[i].isEditable == false && this.state.commentList[i].id == item.id) {
                console.log('Index is isEditable 1:' + this.state.commentList[i].isEditable)

                let commentListing = this.state.commentList
                //make changes to isEditable
                commentListing[i].isEditable = true
                this.setState({
                    commentList: commentListing
                })
                console.log('Index is isEditable 2:' + this.state.commentList[i].isEditable)
            }
            this.input.focus()

        }

    }
    setStateComment(comment, item) {
        console.log("Editing Comment text ==" + item.id + '--------' + comment);
        var i;

        //var commentList2 = this.state.commentList
        for (i = 0; i < this.state.commentList.length; i++) {
            if (this.state.commentList[i].id == item.id) {

                let commentListing = this.state.commentList
                //make changes to isEditable
                commentListing[i].comment = comment
                this.setState({
                    commentList: commentListing
                })
                //console.log('Index is isEditable 2:' + this.state.commentList[i].isEditable)
            }
        }
        // this.input.focus()

    }
    sendEditComment = (commentText, item) => {
        console.log("Edit Comment Called ==" + item.id);
        fetch('http://35.160.197.175:3006/api/v1/recipe/' + this.state.recipeId + '/comments/' + item.id,
            {
                method: 'PUT',
                headers: {
                    'Authorization': this.props.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'comment': commentText,

                })

            }
        ).then((response) => {
            if (response.status == 200) {
                console.log("Edit Comment Sucess")
                return response.json()
            } else {
                console.log("Edit Comment Failed")
            }
        }).then((responseJson) => {
            this.getCommentsList(this.state.recipeId)

        }).catch((error) => {
            console.log(error)
        });

    }

    sendComment = () => {
        var commentText = this.state.comment
        console.log(this.state.recipeId + '  commnet is : ' + this.state.comment);
        this.setState({ comment: '' })

        var API = constant.ADD_COMMENT + this.state.recipeId + '/comments'
        console.log(API);
        fetch(API,
            {
                method: 'POST',
                headers: {
                    'Authorization': this.props.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'comment': commentText,

                })
            }
        ).then((response) => {
            if (response.status == 200) {
                console.log("Comment added Sucess")
                this.getCommentsList(this.state.recipeId)
                return response.json()
            } else {
                console.log("Comment added Failed")
            }
        }).then((responseJson) => {
            console.log(responseJson)

        }).catch((error) => {
            console.log(error)
        });

    }
   
    getCommentsList = (id) => {
        var API = constant.ADD_COMMENT + id + '/comments'
        console.log(API);
        fetch(API,
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
                        var CommnetList =responseJSON.reverse()
                            //this.setState({ commentList: responseJSON.reverse() })
                            this.setState({
                                commentList: CommnetList.map(function (items) {
                                    return {
                                        comment: items.comment,
                                        createdAt: items.createdAt,
                                        firstName: items.firstName,
                                        id: items.id,
                                        lastName: items.lastName,
                                        isEditable: false,

                                    };
                                }),
                            });

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
const mapStateToProps = (state) => {
    console.log("called ==" + state.userReducer.token);

    return { token: state.userReducer.token, recipeFeed: state.dataReducer.recipeFeed }
}

export default connect(mapStateToProps)(CommentScreenComponent)

const styles = StyleSheet.create({
    time: {
        fontSize: 11,
        color: '#919191'
    },
    bottom: {
        marginStart: 10,

        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',


    },
    caption: {
        fontSize: 13,
        fontWeight: '800',

    },
    userName: {
        textTransform: 'lowercase',
        fontSize: 14,
        fontWeight: 'bold',

    },
    commentProfileImage: {
        height: 30,
        width: 30,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#8E8E8E'
    },
    titleSmall: {
        color: 'white',
        fontSize: 18
    },
    recipeName: {
        color: 'white',
        fontWeight: 'bold',
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