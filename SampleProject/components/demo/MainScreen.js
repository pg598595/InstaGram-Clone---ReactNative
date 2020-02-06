import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
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

    
    AddPost: {
        screen: AddNewRecipeComponent,
        navigationOptions: ({ navigation }) => ({
            title: `Add Post`,
        }),
    },

},
    {


        mode: 'card',

    })


    addPostNavigator.navigationOptions = ({ navigation }) => {
        let tabBarVisible;
        if (navigation.state.routes.length > 0) {
            navigation.state.routes.map(route => {
                if (route.routeName === "AddPost") {
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

const bottomTabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: homePageNavigator,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Fontisto name="home" size={22} color={tintColor} />
                ),
                tabBarLabel: () => { return null },

            }
        },
        Search: {
            screen: SearchScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Fontisto name="search" size={22} color={tintColor} />
                ),
                tabBarLabel: () => { return null },
            }
        },
        Add: {
            screen: addPostNavigator,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <MaterialIcons name="add" size={30} color={tintColor} />
                ),
                tabBarLabel: () => { return null },
            }
        },
        Favorites: {
            screen: FavoriteScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome name="heart" size={22} color={tintColor} />
                ),
                tabBarLabel: () => { return null },
            }
        },
        Profile: {
            screen: ProfileScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <MaterialIcons name="person-outline" size={28} color={tintColor} />
                ),
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
})