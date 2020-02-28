import React, { Component } from 'react'
import { Image, Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, NavigationEvents } from 'react-navigation';
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FavoriteScreen from './FavoriteScreen';
import DetailScreen from './DetailScreen';
import { createStackNavigator } from 'react-navigation-stack';
import AddNewRecipeComponent from './AddNewRecipeComponent';
import AddImage from './AddImage';
import SearchScreen from './SearchScreen';
import ProfileDrawer from './ProfileDrawer';
import PostDemo from './PostDemo';
import CommentScreenComponent from './CommentScreenComponent';
import TravelComponent from './TravelComponent';
import EditProfileScreen from './EditProfileScreen';



export default class MainScreen extends Component {
    render() {
        return (
            <AppContainer />
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
    Comments: {
        screen: CommentScreenComponent,
        navigationOptions: ({ navigation }) => ({
            title: 'Comments',
        }),

    }

},
    {


        mode: 'card',

    })


homePageNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible;
    if (navigation.state.routes.length > 1) {
        navigation.state.routes.map(route => {
            // if (route.routeName === "Details") {
            //     tabBarVisible = false;
            // }
            if (route.routeName === "Comments" || route.routeName === "Details") {
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
const addPostNavigator = createStackNavigator({

    AddImage: {
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

const profileNavigator = createStackNavigator({

    ProfileDrawer: {
        screen: ProfileDrawer,
        navigationOptions: {
            header: null
        }
    },

    EditProfile: {
        screen: EditProfileScreen,
        
    },

},
    {


        mode: 'card',

    })
profileNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible;
    if (navigation.state.routes.length > 0) {
        navigation.state.routes.map(route => {
            if (route.routeName === "EditProfile") {
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
                        return <Image style={{ height: 23, width: 23 }} source={require('../../images/home.png')}></Image>
                    } else {
                        return <Image style={{ height: 23, width: 23 }} source={require('../../images/homePlain.png')}></Image>
                    }


                },
                tabBarLabel: () => { return null },

            }
        },
        Search: {
            screen: SearchScreen,
            navigationOptions: {
                tabBarIcon: ({ focused }) => {
                    if (focused) {
                        return <Image style={{ height: 23, width: 23 }} source={require('../../images/searchDark.png')}></Image>
                    } else {
                        return <Image style={{ height: 23, width: 23 }} source={require('../../images/search.png')}></Image>
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
        // Favorites: {
        //     screen: FavoriteScreen,
        //     navigationOptions: {
        //         tabBarIcon: ({ focused }) => {
        //             if (focused) {
        //                 return <Image style={{ height: 23, width: 23 }} source={require('../../images/likeBlack.png')}></Image>
        //             } else {
        //                 return <Image style={{ height: 23, width: 23 }} source={require('../../images/likeplain.png')}></Image>
        //             }

        //         },
        //         tabBarLabel: () => { return null },
        //     }
        // },
        Travel: {
            screen: TravelComponent,
            navigationOptions: {
                tabBarIcon: ({ focused }) => {
                    if (focused) {
                        return <Entypo size={29} name='location-pin' />
                    } else {
                        return <EvilIcons size={29} name='location' />
                    }

                },
                tabBarLabel: () => { return null },

            }
        },
        Profile: {
            screen: profileNavigator,
            navigationOptions: {
                tabBarIcon: ({ focused }) => {
                    if (focused) {
                        return <Image style={{ height: 22, width: 22 }} source={require('../../images/profileBlack.png')}></Image>
                    } else {
                        return <Image style={{ height: 22, width: 22 }} source={require('../../images/profile.png')}></Image>
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
    tabAddPost: {
        height: 24,
        width: 24
    }
})