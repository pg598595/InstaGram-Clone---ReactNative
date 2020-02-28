import React, { Component } from 'react'
import { Button, Text, View, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-material-dropdown';
import NumericInput from 'react-native-numeric-input'
import Icon from "react-native-vector-icons/FontAwesome";
import { Chip } from 'react-native-paper';
import * as constant from './Constants';
import { ToastAndroid } from 'react-native';

import {
    TextField,
    FilledTextField,
    OutlinedTextField,
} from 'react-native-material-textfield';
import ImagePicker from "react-native-image-picker";
import LoadingIndicator from './LoadingIndicatior';


export default class AddNewRecipeComponent extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'New Post',
            headerTitleStyle: { fontSize: 18 },
            // headerStyle: {backgroundColor:'#3c3c3c'},
            headerRight: <TouchableOpacity style={{ marginEnd: 10 }} onPress={() => params.handleSave()}>
                <Text style={{ color: '#1774EA', fontSize: 15 }}>Share</Text>
            </TouchableOpacity>
        };
    };

    componentDidMount() {
        this.props.navigation.setParams({ handleSave: this.getValues });
        console.log("Called Add Recipe Screen")

        //console.log(this.props.navigation.state['params']['photoUri']);
        const image = this.props.navigation.state['params']
        console.log("image : === " + image.photoUri.uri )
        this.setState({ pickedImage: image.photoUri })



    }

    constructor(props) {
        super(props);
        this.state = {
            tagValue: '',
            textInputIndredients: [],
            inputDataIndredients: [],
            textInputSteps: [],
            inputDataSteps: [],
            textInputTags: [],
            inputDataTags: [],
            pickedImage: null,
            nameOfRecipe: '',
            timeRequierd: '',
            youtubeUrl: '',
            complexcity: '',
            noOfServes: '',
            isLoading:false

        }
    }

    pickImageHandler = () => {
        ImagePicker.showImagePicker({ title: "Pick an Image", maxWidth: 800, maxHeight: 600 }, res => {
            if (res.didCancel) {
                console.log("User cancelled!");
                // this.props.navigation.popToTop()
            } else if (res.error) {
                console.log("Error", res.error);
            } else {
                this.setState({
                    pickedImage: { uri: res.uri }
                });
                //console.log('image selected = ' + this.state.pickedImage)

            }
        });
    }
    addTextInput = (index) => {

        let textInputIndredients = this.state.textInputIndredients;
        textInputIndredients.push(
            <View style={styles.row}>
                <Text style={styles.textNumber}>{index + 1}</Text>
                <View style={{ flex: 1 }}>
                    <TextInput style={styles.inputStepsandIndegrents}
                        placeholder="Enter Indredient"
                        onChangeText={(text) => this.addValues(text, index)} />
                </View>
            </View>
        );
        this.setState({ textInputIndredients });
    }

    addTextInputSteps = (index) => {
        let textInputSteps = this.state.textInputSteps;
        textInputSteps.push(
            <View style={styles.row}>

                <Text style={styles.textNumber}>{index + 1}</Text>
                <View style={{ flex: 1 }}>


                    <TextInput style={styles.inputStepsandIndegrents}
                        placeholder="Enter Step"
                        onChangeText={(text) => this.addValuesSteps(text, index)} />
                </View>
            </View>
        );
        this.setState({ textInputSteps });
    }







    //function to add text from TextInputs into single array
    addValues = (text, index) => {
        let dataArray = this.state.inputDataIndredients;
        let checkBool = false;
        if (dataArray.length !== 0) {
            dataArray.forEach(element => {
                if (element.index === index) {
                    element.text = text;
                    checkBool = true;
                }
            });
        }
        if (checkBool) {
            this.setState({
                inputDataIndredients: dataArray
            });
        }
        else {
            dataArray.push({ 'text': text, 'index': index });
            this.setState({
                inputDataIndredients: dataArray
            });
        }
    }
    addValuesSteps = (text, index) => {
        let dataArray = this.state.inputDataSteps;
        let checkBool = false;
        if (dataArray.length !== 0) {
            dataArray.forEach(element => {
                if (element.index === index) {
                    element.text = text;
                    checkBool = true;
                }
            });
        }
        if (checkBool) {
            this.setState({
                inputDataSteps: dataArray
            });
        }
        else {
            dataArray.push({ 'text': text, 'index': index });
            this.setState({
                inputDataSteps: dataArray
            });
        }
    }


    addValuesTags = (text, index) => {
        let textInputTags = this.state.textInputTags;
        textInputTags.push(
            <Chip variant="outlined" onDelete={() => { }}>{text}</Chip>
        );
        this.setState({ tagValue: '' })
        this.setState({ textInputTags });
        let dataArray = this.state.inputDataTags;
        let checkBool = false;
        if (dataArray.length !== 0) {
            dataArray.forEach(element => {
                if (element.index === index) {
                    element.text = text;
                    checkBool = true;
                }
            });
        }
        if (checkBool) {
            this.setState({
                inputDataTags: dataArray
            });
        }
        else {
            dataArray.push({ 'text': text, 'index': index });
            this.setState({
                inputDataTags: dataArray
            });
        }
    }

    //function to console the output
    getValues = () => {
        // console.log("Get Values Called");
        // console.log('Data of Indredients ', this.state.inputDataIndredients);
        if (this.state.nameOfRecipe == '' || this.state.timeRequierd == '' || this.state.noOfServes == '' || this.state.complexcity == '') {
            ToastAndroid.show('Fill requierd fields', ToastAndroid.SHORT);
        } else if (this.state.pickedImage == undefined) {
            ToastAndroid.show('Please Select Image', ToastAndroid.SHORT);
        }
        else {
            console.log('Name ', this.state.nameOfRecipe);
            console.log('noOfServes : ', this.state.noOfServes);
            console.log('timeRequierd : ', this.state.timeRequierd);
            console.log('complexcity : ', this.state.complexcity);
            console.log('youtubeUrl : ', this.state.youtubeUrl);
            console.log('Data of Indredients ', this.state.inputDataIndredients);
            console.log('Data of Steps ', this.state.inputDataSteps);
            console.log('Data of Tags ', this.state.inputDataTags);
            this.handleAddNewRecipe();

        }
        //this.addIndigreants()
          //  this.addInstructions(1)

    }
    render() {
        let complexcity = [{
            value: 'Easy',
        }, {
            value: 'Medium',
        }, {
            value: 'Hard',
        }];
        let timeUnit = [{
            value: 'minute',
        }, {
            value: 'hour',
        },];
        return (
            <SafeAreaView style={styles.scrollcontainer}>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <View>
                        {/* <LoadingIndicator isLoading={this.state.isLoading} style={{height:200}}></LoadingIndicator> */}
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                            <TouchableOpacity style={styles.postingImage} onPress={this.pickImageHandler}>
                                <Image source={(this.state.pickedImage == null) ? { uri: constant.ADD_IMAGE } : this.state.pickedImage} style={styles.postingImage}></Image>
                            </TouchableOpacity>
                            <TextInput value={this.state.email}
                                placeholder="Write name of recipe..."
                                placeholderTextColor="#C6C6C6"
                                returnKeyType="next"
                                style={{ marginStart: 10 }}
                                onChangeText={(nameOfRecipe) => this.setState({ nameOfRecipe })}
                                autoCapitalize="words"
                                autoCorrect={false}
                            ></TextInput>
                        </View>
                        <View style={styles.lineDivider}></View>
                        <View style={styles.formcontainer}>

                            <TextField
                                style={styles.input}
                                label='No. of serves *'
                                keyboardType='number-pad'
                                onChangeText={(noOfServes) => this.setState({ noOfServes })}
                            />


                            <View style={styles.rowTime}>
                                <TextField
                                    style={styles.input}
                                    label='Time Requierd *'
                                    keyboardType='number-pad'
                                    onChangeText={(timeRequierd) => this.setState({ timeRequierd })}
                                />

                            </View>
                            <TextField
                                style={styles.input}
                                label='Youtube URL'
                                onChangeText={(youtubeUrl) => this.setState({ youtubeUrl })}


                            />
                            <Dropdown containerStyle={styles.dropDown}
                                label='Complexcity *'
                                data={complexcity}
                                onChangeText={(complexcity) => this.setState({ complexcity })}
                            />


                        </View>
                        <View style={styles.lineDivider}></View>
                        <View style={styles.formcontainer}>
                            <View style={styles.rowAdd}>

                                <Text style={styles.titleText}>Ingredients</Text>
                                <Icon name="plus" size={20} style={{
                                    alignSelf: 'center',

                                }} onPress={() =>
                                    this.addTextInput(this.state.textInputIndredients.length)
                                } />

                            </View>
                            {this.state.textInputIndredients.map((value) => {
                                return value
                            })}

                        </View>
                        <View style={styles.lineDivider}></View>
                        <View style={styles.formcontainer}>
                            <View style={styles.rowAdd}>

                                <Text style={styles.titleText}>Steps</Text>
                                <Icon name="plus" size={20} style={{
                                    alignSelf: 'center',

                                }} onPress={() => {
                                    this.addTextInputSteps(this.state.textInputSteps.length)

                                }} />

                            </View>
                            {this.state.textInputSteps.map((value) => {
                                return value
                            })}
                        </View>
                        {/* <View style={styles.lineDivider}></View>
                        <View style={styles.formcontainer}>
                            <View style={styles.rowAdd}>

                                <Text style={styles.titleText}>Tags</Text>


                            </View>
                            <View style={styles.row}>

                                <View style={{ flex: 1 }}>


                                    <TextInput style={styles.inputStepsandIndegrents}
                                        placeholder="Enter Tag"
                                        value={this.state.email}
                                        onChangeText={(tagValue) => this.setState({ tagValue })}
                                    />


                                </View>
                                <Icon name="plus" size={20} style={{
                                    alignSelf: 'center',

                                }} onPress={() => {
                                    this.addValuesTags(this.state.tagValue, this.state.textInputTags.length)

                                }} />
                            </View>
                            {this.state.textInputTags.map((value) => {
                                return value
                            })}
                        </View> */}

                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

    goToTopScreen = () => {
        this.props.navigation.navigate('Home')
    }

    handleAddNewRecipe = () => {
        this.setState({isLoading:true})
        fetch('http://35.160.197.175:3006/api/v1/recipe/add',
            {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.MGBf-reNrHdQuwQzRDDNPMo5oWv4GlZKlDShFAAe16s',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'name': this.state.nameOfRecipe,
                    'preparationTime': this.state.timeRequierd,
                    'serves': this.state.noOfServes,
                    'complexity': this.state.complexcity,
                    'ytUrl': this.state.youtubeUrl
                })
            }
        ).then((response) => {
            if (response.status == 200) {
                console.log("Recipe added Sucess")
                return response.json()
            } else {
                console.log("Recipe added Failed")
            }
        }).then((responseJson) => {
            const { id } = responseJson
            // alert(id)
            console.log("Recipe Id : " + id)
            this.addIndigreants(id)
            //this.addInstructions(id);
            //this.handleUploadPhoto(id)
        }).catch((error) => {
            console.log(error)
        });

    }

    addIndigreants(id) {
        var i;
        for (i = 0; i < this.state.inputDataIndredients.length; i++) {
            console.log('Index is:'+ i +' ==Ingerent is : ' + this.state.inputDataIndredients[i].text +'==length is: '+this.state.inputDataIndredients.length)
            if(i == this.state.inputDataIndredients.length-1){
                this.addIngredientsToAPI(id, this.state.inputDataIndredients[i].text,true)
            }
            else{
                this.addIngredientsToAPI(id, this.state.inputDataIndredients[i].text,false)
            }
        }
    }
    addInstructions(id) {
        var i;
        for (i = 0; i < this.state.inputDataSteps.length; i++) {
            console.log('Ingerent is : ' + this.state.inputDataSteps[i].text)
            if(i == this.state.inputDataSteps.length-1){
                this.addinstructionToAPI(id, this.state.inputDataSteps[i].text,true)
            }
            else{
                this.addinstructionToAPI(id, this.state.inputDataSteps[i].text,false)
            }
            
        }
    }

    addIngredientsToAPI = (id, text, isLast) => {

        console.log("Add Ingredtieds Called");

        fetch('http://35.160.197.175:3006/api/v1/recipe/add-ingredient',
            {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.MGBf-reNrHdQuwQzRDDNPMo5oWv4GlZKlDShFAAe16s',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'ingredient': text,
                    'recipeId': id,

                })
            }
        ).then((response) => {
            if (response.status == 200) {
                console.log("ingredient added Sucess==isLast : "+isLast)
                if(isLast == true){
                    this.addInstructions(id)
                }
                
                return response.json()
            } else {
                console.log("ingredient added failed")
            }
        }).then((responseJson) => {

        }).catch((error) => {
            console.log(error)
        });
    }
    addinstructionToAPI = (id, text,isLast) => {

        console.log("Add instruction Called");

        fetch('http://35.160.197.175:3006/api/v1/recipe/add-instruction',
            {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.MGBf-reNrHdQuwQzRDDNPMo5oWv4GlZKlDShFAAe16s',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'instruction': text,
                    'recipeId': id,

                })
            }
        ).then((response) => {
            if (response.status == 200) {
                console.log("Instruction added Sucess==isLast : "+isLast)
                if(isLast == true){
                    this.handleUploadPhoto(id)
                }
                
                return response.json()
            } else {
                console.log("Instruction added failed")
            }
        }).then((responseJson) => {

        }).catch((error) => {
            console.log(error)
        });
    }

    handleUploadPhoto = (id) => {
        fetch(constant.UPLOAD_IMAGE_FILE, {
            method: "POST",
            headers: {

                'Authorization': constant.API_TOKEN
            },
            body: this.createFormData(id)
        })
            .then(response => response.json())
            .then(response => {
                console.log("upload succes", response);
                this.setState({isLoading:false})

                this.goToTopScreen()

            })
            .catch(error => {
                console.log("upload error", error);
                alert("Upload failed!");
            });
    };

    createFormData = (id) => {
        const data = new FormData();
        var photo = {
            uri: this.state.pickedImage.uri,
            type: 'image/png',
            name: 'photo.png',
        };
        data.append("photo", photo);

        data.append("recipeId", id)
        console.log('picked Image: ' + this.state.pickedImage.uri);

        console.log(data);

        return data;
    };
}

//export default SplashScreen

const styles = StyleSheet.create({
    lineDivider: {
        height: 0.5,
        backgroundColor: 'rgba(142, 142, 142,0.5)',
        width: '100%',
        marginTop: 5
    },
    postingImage: {
        height: 60,
        width: 60,


    },
    titleSmall: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    rowTime: {
        flex: 1,

    },
    inputStepsandIndegrents: {
        fontSize: 15,
        marginStart: 5,
        marginEnd: 20,
        marginTop: 5,
        marginBottom: 2,
        height: 40,
        backgroundColor: 'rgba(214,207,207,0.3)',
        color: '#000000',
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#828282',
        borderRadius: 5,
    },
    textNumber: {
        backgroundColor: '#000000',
        borderRadius: 100,
        marginEnd: 8,
        padding: 5,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FFFFFF'


    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'


    },



    buttonSubmit: {
        marginStart: 20,
        marginEnd: 20
    },
    buttonText: {
        textAlign: 'center',
        color: "#FFF",
        fontWeight: 'bold'
    },
    buttonContainer: {
        backgroundColor: "#1774EA",
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,

    },
    scrollcontainer: {
        flex: 1,
    },
    scrollView: {


    },
    rowAdd: {

        flex: 1,
        flexDirection: 'row',
        alignContent: 'space-between',
        justifyContent: 'space-between',
        padding: 10

    },
    addIndigreantscontaier: {

        backgroundColor: 'red',
        margin: 20

    },
    textTime: {
        alignSelf: 'center',
        fontSize: 15,
        marginStart: 20
    },
    text: {
        fontSize: 15,
        marginEnd: 5,

    }
    , rowContainer: {
        marginTop: 10,
        marginEnd: 10,
        flex: 0.1,
        flexDirection: 'row'
    },
    rowElement1: {
        flex: 0.5,
        alignContent: 'center',
        justifyContent: 'center'
    },
    rowElement2: {
        flex: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },


    titlecontainer: {
        marginTop: 25,
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    formcontainer: {

        marginStart: 10,
        marginEnd: 10



    },
    titleText: {
        textTransform: 'uppercase',
        fontSize: 20,
        fontWeight: 'bold',


    },
    input: {
        fontSize: 15,





    },

    dropDown: {

    }


})
