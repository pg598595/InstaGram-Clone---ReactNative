import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'


class FlexDemo extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.flex1}>

                </View>
                <View style={styles.flex2}>
                <View style={styles.flex21}>
                    
                    </View>
                    <View style={styles.flex22}>
                    
                    </View>
                </View>
            </View>
        )
    }
}

export default FlexDemo

const styles = StyleSheet.create({

    container: {
        flexDirection:"row",
        flex: 1
    },

    flex1: {
        flex: 1,
        backgroundColor: 'yellow'
    },
    flex2: {
        flex: 1,
        backgroundColor: 'red'
    },
    flex21: {
        flex: 0.5,
        backgroundColor: 'blue'
    },
    flex22: {
        flex: 1,
        backgroundColor: 'green'
    }
})


