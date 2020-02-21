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
                strokeColor='black'
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
                        },
                        {
                            latitude: 23.027830,
                            longitude: 72.507410
                        },
                        {
                            latitude: 23.029854,
                            longitude: 72.508022
                        },
                        {
                            latitude: 23.032185,
                            longitude: 72.508741
                        },
                        {
                            latitude: 23.035097,
                            longitude: 72.510017
                        },
                        {
                            latitude: 23.037230,
                            longitude: 72.511026
                        },
                        {
                            latitude: 23.038662,
                            longitude: 72.511863
                        },
                        {
                            latitude: 23.038148,
                            longitude: 72.513880
                        }
                    ]
                }
            >

            </MapView.Polyline>

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
        </MapView>)
    }

    onMapMarkerPressed = (marker) => {
        
    }
}
