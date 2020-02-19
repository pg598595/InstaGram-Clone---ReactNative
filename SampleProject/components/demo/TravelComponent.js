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
// import MapView, { Marker, Polyline } from 'react-native-maps'
// import * as Permission from 'expo-permissions'

class TravelComponent extends Component {

    constructor() {
        super()

        this.state = {
            searchText: '',
            searchList: []
        }
        // Permission.askAsync(Permission.LOCATION)
        // navigator.geolocation.watchPosition(this.onSuccess, this.onError)
        // this.searchListApi('d')
    }
    render() {
        return <View style={{ flex: 1 }}>
            <Text>Maps</Text>
            {/* <MapView
                initialRegion={{
                    latitude: 23.025836,
                    longitude: 72.503349,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                }}
                style={{ flex: 1 }}
                showsUserLocation={true}
                onRegionChange={this.onMapRegionChange}
                onMarkerPress={this.onMapMarkerPressed}
            >

                <Polyline
                    strokeWidth={5}
                    strokeColor='blue'
                    coordinates={
                        [
                            {
                                latitude: 23.025734,
                                longitude: 72.503349
                            },
                            {
                                latitude: 23.025802,
                                longitude: 72.502587
                            },
                            {
                                latitude: 23.027712,
                                longitude: 72.502839
                            },
                            {
                                latitude: 23.027387,
                                longitude: 72.507136
                            }
                        ]
                    }
                >

                </Polyline>

                <Marker
                    coordinate={{
                        latitude: 23.025836,
                        longitude: 72.503349,
                    }}
                    title='Solution Analysts'
                    description='ઉકેલ વિશ્લેષકો'
                    identifier='1'
                >

                </Marker>
            </MapView> */}
        </View>
    }

    // onMapRegionChange = (region) => {
    //     // console.log(region);
    // }

    // onMapMarkerPressed = (marker) => {
    //     console.log(marker);
    // }
    
}

const mapStateToProps = (state) => {
    // console.log("called ==" + state.userReducer.token);

    return { token: state.userReducer.token }
}

export default connect(mapStateToProps)(TravelComponent)


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