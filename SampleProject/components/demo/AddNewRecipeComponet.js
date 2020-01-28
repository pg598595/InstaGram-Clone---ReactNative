import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native'
import LoginPage from './LoginPage';
import { TextInput } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-material-dropdown';
import NumericInput from 'react-native-numeric-input'
import Icon from "react-native-vector-icons/FontAwesome";
import { Chip } from 'react-native-paper';


import {
    TextField,
    FilledTextField,
    OutlinedTextField,
} from 'react-native-material-textfield';

export default class AddNewRecipeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tagValue: '',
            textInputIndredients: [],
            inputDataIndredients: [],
            textInputSteps: [],
            inputDataSteps: [],
            textInputTags: [],
            inputDataTags: []

        }
    }
    //function to add TextInput dynamically

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
            <Chip variant="outlined" onDelete={()=>{}}>{text}</Chip>
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
        console.log('Data of Indredients ', this.state.inputDataIndredients);
        console.log('Data of Steps ', this.state.inputDataSteps);
        console.log('Data of Tags ', this.state.inputDataTags);

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
                        <View style={styles.titlecontainer}>
                            <Text style={styles.titleText}>Add New Recipe </Text>

                        </View>
                        <View style={styles.formcontainer}>

                            <OutlinedTextField
                                style={styles.input}
                                label='Name of Recipe *'
                                keyboardType='default'


                            />
                            {/* <OutlinedTextField
                                style={styles.input}
                                label='Time Requied'
                                keyboardType='default'


                            />
                            <OutlinedTextField
                                style={styles.input}
                                label='Complexcity'
                                keyboardType='default'
                            /> */}
                            <OutlinedTextField
                                style={styles.input}
                                label='No. of serves *'
                                keyboardType='number-pad'
                            />

                            <View style={styles.rowTime}>
                                <OutlinedTextField
                                    style={styles.input}
                                    label='Time Requierd *'
                                    keyboardType='number-pad'
                                />
                                {/* <Dropdown containerStyle={styles.dropDown}
                                label='unit'
                                data={timeUnit}
                            /> */}
                            </View>
                            <Dropdown containerStyle={styles.dropDown}
                                label='Complexcity *'
                                data={complexcity}
                            />


                        </View>

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

                        <View style={styles.formcontainer}>
                            <View style={styles.rowAdd}>

                                <Text style={styles.titleText}>Tags</Text>


                            </View>
                            <View style={styles.row}>

                                {/* // <Text style={styles.textNumber}>{index + 1}</Text> */}
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
                        </View>
                        <View style={styles.formcontainer}>
                            <OutlinedTextField
                                style={styles.input}
                                label='Youtube URL'
                                keyboardType='default'

                            />
                        </View>
                        <View >
                            <View style={styles.buttonSubmit}>
                                <TouchableOpacity style={styles.buttonContainer} onPress={this.getValues}>
                                    <Text style={styles.buttonText}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

//export default SplashScreen

const styles = StyleSheet.create({
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
        backgroundColor: "#F26D00",
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,

    },
    scrollcontainer: {
        flex: 1,
    },
    scrollView: {

        marginHorizontal: 10,
    },
    rowAdd: {

        flex: 1,
        flexDirection: 'row',
        alignContent: 'space-between',
        justifyContent: 'space-between'

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
        padding: 15,
        margin: 10,
        backgroundColor: 'rgba(204,204,204,0.2)',
        borderRadius: 10,

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

















// <View style={styles.rowContainer}>
//                         <View style={styles.rowElement1}>
//                             <Dropdown containerStyle={styles.dropDown}
//                                 label='Complexcity'
//                                 data={complexcity}
//                             />
//                         </View>
//                         <View style={styles.rowElement2}>
//                             <Text style={styles.text}>Serves :</Text>
//                             <NumericInput style={styles.dropDown}
//                                 type='up-down' onChange={value => console.log(value)} />
//                         </View>

//                     </View>
//                     <View style={styles.rowContainer}>

//                         <Text style={styles.textTime}>Time Requied:</Text>

//                         <TextInput
//                             placeholder="10"
//                         />
//                         <View style={styles.rowElement2}>
//                             <Dropdown
//                                 label='time'
//                                 data={timeUnit}
//                             />
//                         </View>

//                     </View>