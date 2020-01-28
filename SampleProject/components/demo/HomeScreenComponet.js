import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native'
import Icon from "react-native-vector-icons/MaterialIcons";
import * as constant from './Constants';
import { FlatList } from 'react-native-gesture-handler';

export default class HomeScreenComponet extends Component {

    componentDidMount(){
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
                        this.setState({recipesList: responseJSON});
                        console.log(this.state.recipesList);

                        

                    })
                } else {
                    console.log(response.body);
                    Alert.alert('Error', 'Please try again later.', [
                        {
                            text: 'Ok',
                        },

                    ])

                }
            })
    }

    constructor() {
        super()
        
        this.state = {
            recipesList: [
              
            ],
            placeHolderImage:'https://www.mageworx.com/blog/wp-content/uploads/2012/06/Page-Not-Found-13.jpg'
        }
       

    }
    render() {
        return (
            <SafeAreaView style={styles.scrollcontainer}>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

                    <FlatList>
                        data={this.recipesList}
                        returnItem={({item})=>{
                            
                        }}
                    </FlatList>

                    {
                        this.state.recipesList.map((item, index) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.container}
                                onPress={() => this.alertItemName(item)}>
                                <Image
                                    style={styles.image}
                                    source={(item.photo!=null) ? {uri : item.photo}:{uri: this.placeHolderImage}} />
                                <Text style={styles.recipeName}>
                                    {item.name}
                                </Text>
                                <View style={styles.rowContainer}>

                                    <View style={styles.rowElements}>
                                         <Icon name="timer" size={20} style={styles.icons}/>
                                        <Text style={styles.rowTextElement}>{item.preparationTime}</Text>
                                    </View>

                                    <View style={styles.rowElements}>
                                          <Icon name="library-books" size={20} style={styles.icons}/>
                                        <Text style={styles.rowTextElement}>{item.complexity}</Text>
                                    </View>

                                    <View style={styles.rowElements}>
                                        <Icon name="local-dining" size = {20}style={styles.icons}/>   
                                        <Text style={styles.rowTextElement}>{item.serves} People</Text>
                                    </View>

                                </View>

                            </TouchableOpacity>
                        ))
                    }



                </ScrollView>
            </SafeAreaView>
        );
    }

    alertItemName = (item) => {
        alert(item.recipeId)
    }

    getListfromApi = () => {
        
    }

}

const styles = StyleSheet.create({
    icons: {
        color: '#919191'
    },
    container: {
        paddingBottom: 5,
        margin: 10,
        backgroundColor: 'rgba(204,204,204,0.2)',
        borderRadius: 10,
    },
    recipeName: {
        color: '#000000',
        textAlign: 'left',
        marginTop:5,
        fontSize:15,
        marginBottom: 5,
        marginStart: 20,
        fontWeight: 'bold'
    },
    scrollcontainer: {
        flex: 1,
    },
    scrollView: {

        marginHorizontal: 10,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 10
    },
    recipeType: {
        fontSize: 12,
        color: '#919191',
        fontWeight: 'bold',
        marginStart: 10,
        marginTop: 5,
        marginBottom: 2
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
       
    

    },
    rowElements: {
        flex: 1,
        flexDirection:'row',
        padding: 10,
        alignItems:'center',
        justifyContent:'center'
    },
    rowTextElement: {
        color: '#919191',
        paddingStart:5
    }

})