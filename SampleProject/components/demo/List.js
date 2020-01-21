import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';

class List extends Component {
   state = {
      names: [
         {
            id: 0,
            name: '1',
         },
         {
            id: 1,
            name: '2',
         },
         {
            id: 2,
            name: '3',
         },
         {
            id: 3,
            name: '4',
         }
      ]
   }
   alertItemName = (item) => {
      alert(item.name)
   }
   render() {
      return (
         <View>
            {
               this.state.names.map((item, index) => (
                  <TouchableOpacity
                     key = {item.id}
                     style = {styles.container}
                     onPress = {() => this.alertItemName(item)}>
                     <Text style = {styles.text}>
                        {item.name}
                     </Text>
                  </TouchableOpacity>
               ))
            }
         </View>
      )
   }
}
export default List

const styles = StyleSheet.create ({
   container: {
      padding: 10,
      marginTop: 3,
      backgroundColor: "#2b57db",
      alignItems: 'center',
   },
   text: {
      color: '#ffffff'
   }
})

// class List extends Component {

//    constructor() {
//       super()
//       this.state = {}
//       this.state.custoumStyle = {
//          color : 'red'
//       }

//       setInterval(() => {

//          if (this.state.custoumStyle.color == 'red') {
//             this.setState({
//                custoumStyle: {
//                   color: 'green'
//                }
//             })
//          } else {
//             this.setState({
//                custoumStyle: {
//                   color: 'red'
//                }
//             })
//          }
//       }, 1000)

//    }

//    render() {
//       return (
//          <View>
//             {
//                <Text style={[styles.text,this.state.custoumStyle]}>Hello</Text>
//             }
//          </View>
//       )
//    }
// }

// export default List

// const styles = StyleSheet.create({

//    text: {
//       color: 'blue'
//    }
// })