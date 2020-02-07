import React, { Component } from 'react'
import { Image,Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, NavigationEvents } from 'react-navigation';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import PostDemo from './PostDemo';
import FavoriteScreen from './FavoriteScreen';
import ProfileScreen from './ProfileScreen';
import DetailScreen from './DetailScreen';
import { createStackNavigator } from 'react-navigation-stack';
import AddNewRecipeComponent from './AddNewRecipeComponent';
import AddImage from './AddImage';


export default class MainScreen extends Component {
    render() {
        return (
            <AppContainer />
        );
    }
}


class AddNewRecipeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Add New Recipe</Text>
            </View>
        );
    }
}

class SearchScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Search Screen</Text>
            </View>
        );
    }
}

const homePageNavigator = createStackNavigator({

    Posts: {
        screen: PostDemo,
        navigationOptions: {
            header: null
        }

    },
    Details: {
        screen: DetailScreen,
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.details.name}`,
        }),

    },

},
    {


        mode: 'card',

    })


homePageNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible;
    if (navigation.state.routes.length > 1) {
        navigation.state.routes.map(route => {
            if (route.routeName === "Details") {
                tabBarVisible = false;
            } else {
                tabBarVisible = true;
            }
        });
    }

    return {
        tabBarVisible
    };
};
const addPostNavigator = createStackNavigator({

    AddImage:{
        screen: AddImage,
        
    },
    
    AddPost: {
        screen: AddNewRecipeComponent,
        
    },

},
    {


        mode: 'card',

    })


    addPostNavigator.navigationOptions = ({ navigation }) => {
        let tabBarVisible;
        if (navigation.state.routes.length > 0) {
            navigation.state.routes.map(route => {
                if (route.routeName === "AddImage" || route.routeName === "AddPost") {
                    tabBarVisible = false;
                }
                
                 else {
                    tabBarVisible = true;
                }
            });
        }
    
        return {
            tabBarVisible
        };
    };

const bottomTabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: homePageNavigator,
            navigationOptions: {
                tabBarIcon: ({ focused }) => {
                    if (focused) {
                        return <Image style={{height:23,width:23}} source={require('../../images/home.png')}></Image>
                    } else {
                        return <Image style={{height:23,width:23}} source={require('../../images/homePlain.png')}></Image>
                    }

                },
                tabBarLabel: () => { return null },

            }
        },
        Search: {
            screen: SearchScreen,
            navigationOptions: {
                tabBarIcon:({ focused }) => {
                    if (focused) {
                        return <Image style={{height:23,width:23}} source={require('../../images/searchDark.png')}></Image>
                    } else {
                        return <Image style={{height:23,width:23}} source={require('../../images/search.png')}></Image>
                    }

                },
                tabBarLabel: () => { return null },
            }
        },
        Add: {
            screen: addPostNavigator,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Image style={styles.tabAddPost} source={require('../../images/addpost.png')} />

                ),
                tabBarLabel: () => { return null },
            }
        },
        Favorites: {
            screen: FavoriteScreen,
            navigationOptions: {
                tabBarIcon: ({ focused }) => {
                    if (focused) {
                        return <Image style={{height:23,width:23}} source={require('../../images/likeBlack.png')}></Image>
                    } else {
                        return <Image style={{height:23,width:23}} source={require('../../images/likeplain.png')}></Image>
                    }

                },
                tabBarLabel: () => { return null },
            }
        },
        Profile: {
            screen: ProfileScreen,
            navigationOptions: {
                tabBarIcon: ({ focused }) => {
                    if (focused) {
                        return <Image style={{height:20,width:22}} source={require('../../images/userBlack.png')}></Image>
                    } else {
                        return <Image style={{height:20,width:22}} source={require('../../images/userplain.png')}></Image>
                    }

                },
                tabBarLabel: () => { return null },
            }
        },
        // transfer : detailsNavigator

    },
    {
        initialRouteName: 'Home'
    }
);

const AppContainer = createAppContainer(bottomTabNavigator);

const styles = StyleSheet.create({

    container: {
        flex: 1,

    },
    icon: {
        height: 19,
        width: 25,
        marginStart: 20
    },
    tabAddPost:{
        height:24,
        width:24
    }
})