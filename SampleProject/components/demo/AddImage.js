import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableOpacity
} from 'react-native';
import ImagePicker from "react-native-image-picker";
import { RNCamera } from 'react-native-camera';
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


export default class AddImage extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerTitle: <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={{ marginStart: 10 }} onPress={() => params.handleCancel()}>
                    <Entypo name='cross' size={30} />

                </TouchableOpacity>
                <Text style={{ fontSize: 15 }}>Select Image</Text>
            </View>,
            headerTitleStyle: { fontSize: 18 },
            // headerStyle: {backgroundColor:'#3c3c3c'},
            headerRight: <TouchableOpacity style={{ marginEnd: 10 }} onPress={() => params.handleSave()}>
                <Text style={{ color: '#1774EA', fontSize: 15 }}>Open Gallery</Text>
            </TouchableOpacity>

        };
    };

    componentDidMount() {
        this.props.navigation.setParams({ handleSave: this.pickImageHandler });
        this.props.navigation.setParams({ handleCancel: this.goToHomePage });
    }

    goToHomePage = () => {
        this.props.navigation.navigate('Home')
    }

    state = {
        pickedImage: null,
        screenCalled: 0
    }

    reset = () => {
        this.setState({
            pickedImage: null
        });
    }

    pickImageHandler = () => {
        ImagePicker.launchImageLibrary({ title: "Pick an Image", maxWidth: 800, maxHeight: 600 }, res => {
            if (res.didCancel) {
                console.log("User cancelled!");
                // this.props.navigation.popToTop()
            } else if (res.error) {
                console.log("Error", res.error);
            } else {
                this.setState({
                    pickedImage: { uri: res.uri }

                });
                this.goToAddPostPage(this.state.pickedImage)

            }
        });
    }

    resetHandler = () => {
        this.reset();
    }

    render() {
        return (
            <View style={styles.container}>
                <RNCamera

                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={{
                        flex: 0.8,
                        width: '100%',
                    }}
                >
                </RNCamera>
                <View style={{ flex: 0.4, justifyContent: 'center',marginTop:50 }}>
                    <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                    <MaterialCommunityIcons name='camera-iris' size={60} color='#898989' />

                    </TouchableOpacity>
                </View>
                {/* <View style={styles.placeholder}>
                    <Image source={this.state.pickedImage} style={styles.previewImage} />
                </View>
                <View style={styles.button}>

                    
                <Button title="take" onPress={this.pickImageHandler} />
                    <Button title="Change" onPress={this.pickImageHandler} />
                    <Button title="Next" onPress={()=>{
                         this.props.navigation.navigate('AddPost')
                    }} />
                </View> */}
            </View>
        );
    }
    takePicture = async() => {
        if (this.camera) {
          const options = { quality: 0.5, base64: true };
          const data = await this.camera.takePictureAsync(options);
          console.log(data.uri);
          this.goToAddPostPage(data)
        }
      };

    goToAddPostPage = (data) => {
        this.props.navigation.navigate('AddPost',{photoUri:data})
    } 
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1
    },
    textStyle: {
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "center",
        color: "red",
        marginTop: 10
    },
    placeholder: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "70%",
        height: 280,
        marginTop: 50,
    },
    button: {
        width: "80%",
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    previewImage: {
        width: "100%",
        height: "100%"
    }
});