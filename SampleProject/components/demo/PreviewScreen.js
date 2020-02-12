import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, ImageBackground,Share } from 'react-native'

import * as constant from './Constants';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";





export default class PreviewScreen extends Component {
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

        console.log('called Preview');
        const itemDetails = this.props.screenProps.itemDetails.navigation.state['params']
        this.setState({ photo: itemDetails.details.photo })
        this.setState({ nameofRecipe: itemDetails.details.name })


        this.setState({ firstName: itemDetails.details.firstName })

        this.setState({ inCookingList: itemDetails.details.inCookingList })

        this.setState({ lastName: itemDetails.details.lastName })

        this.setState({ serves: itemDetails.details.serves })

        this.setState({ recipeId: itemDetails.details.recipeId })


        console.log(this.state.photo);
    }

    onShare = async () => {
        try {
        const recipeDetailsMessage = 'Recipe Name : ' + this.state.nameofRecipe  + '\nBy : ' + this.state.firstName+' '+this.state.lastName+'\nServes : '+this.state.serves

          await Share.share({
            message: recipeDetailsMessage
              ,
          });
    
         
        } catch (error) {
          alert(error.message);
        }
      };


    render() {
        return (

            <ImageBackground source={(this.state.photo != null) ? { uri: this.state.photo } : { uri: constant.PLACEHOLDER_IMAGE }} style={styles.image}>
                <View style={{ flex: 0.7 }}>

                    {/* <Image source={{ uri: this.state.photo }} style={styles.image}></Image> */}


                </View>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row' }}>
                        <View >
                            <Text style={styles.recipeName}>{this.state.nameofRecipe}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: 'white' }}>Published by : </Text>
                                <Text style={styles.publisherName}>{this.state.firstName} {this.state.lastName}</Text>

                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Text style={{ fontSize: 15, color: 'white' }}>{this.state.serves}</Text>
                            <MaterialCommunityIcons name='silverware-fork-knife' size={20} color='white' />
                        </View>
                    </View>
                    <View style={{backgroundColor:'#727272',height:2,width:'100%',marginTop:15,marginBottom:25}}></View>
                    <View>
                        <View style={{ flexDirection: 'row',alignItems:'center',flex:1,justifyContent:'center' }}>

                            <View style={{ flexDirection: 'row',flex:1,alignItems:'center' }}>
                                
                                    <MaterialCommunityIcons name={(this.state.inCookingList)? 'heart' : 'heart-outline'} size={20} color='red' />
                                    <Text style={styles.titleSmall}> Favorite</Text>
                                    
                                   

                                
                            </View>
                            <TouchableOpacity onPress={this.onShare} style={{  flexDirection: 'row',flex:1,alignItems:'center',justifyContent:'flex-end' }}>
                            <View style={{ flexDirection: 'row',flex:1,alignItems:'center',justifyContent:'flex-end'}}>
                                
                              
                                    <MaterialCommunityIcons name='share' size={20} color='white' />
                                    <Text style={styles.titleSmall}> Share</Text>
                                  
                                   

                                
                            </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </ImageBackground>

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