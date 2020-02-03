import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'

export default function LoadingIndicator(props) {
    if (props.isLoading) {
        return <View style={{ width: '100%', height: '100%', zIndex: 10 }}>
            <ActivityIndicator size='large' color='#1774EA' style={{ flex: 1 }}></ActivityIndicator>
        </View>
    } else {
        return <View></View>
    }
}