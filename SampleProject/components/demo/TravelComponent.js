import React, { Component } from 'react'
import { View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';

export default class TravelComponent extends Component {

    constructor() {
        super()
    }

    componentDidMount() {
        Geolocation.getCurrentPosition(info =>
            console.log(info));
    }

    render() {
        return (<MapView
            style={{ flex: 1 }}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
                latitude: 23.0259,
                longitude: 72.5034,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }}
            showsUserLocation={true}
            onMarkerPress={this.onMapMarkerPressed}
        >
            <MapView.Polyline
                strokeWidth={5}
                strokeColor='red'
                coordinates={
                    [
                        {
                            latitude: 23.0258661,
                            longitude: 72.5033598
                        },
                        {
                            latitude: 23.027271,
                            longitude: 72.507509
                        },
                        {
                            latitude: 23.027363,
                            longitude: 72.511846
                        },
                        {
                            latitude: 23.027712,
                            longitude: 72.522146
                        },
                        {
                            latitude: 23.022814,
                            longitude: 72.537015
                        },
                       
                    ]
                }
            >

            </MapView.Polyline>

            <Marker
                coordinate={{
                    latitude: 23.022814,
                    longitude: 72.537015,
                }}
                
                title='Destination'
                description='Your destination is here'
                identifier='1'
            >

            </Marker>
            <Marker
                coordinate={{
                    latitude: 23.027363,
                    longitude: 72.511846,
                }}
                pinColor = {'indigo'}
                title='Move ahead'
                description='Your destination is half a way to goo'
                identifier='2'
            >

            </Marker>
        </MapView>)
    }

    onMapMarkerPressed = (marker) => {

    }
}
