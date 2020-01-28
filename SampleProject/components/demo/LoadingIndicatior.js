import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'

export default function LoadingIndicator(props) {
    if (props.isLoading) {
        return <View style={{ width: '100%', height: '100%', zIndex: 1 }}>
            <ActivityIndicator size='large' color='#FF8C00' style={{ flex: 1 }}></ActivityIndicator>
        </View>
    } else {
        return <View></View>
    }
}