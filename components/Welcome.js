import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';

export default class Welcome extends React.Component {
    state = {
        word: ""
    }

    constructor(props) {
        super(props);
        this.checkDefinition = this.checkDefinition.bind(this);
    }

    checkDefinition() {
        if (this.state.word !== "") {
            this.props.setWord(this.state.word);
            this.props.changeScreen();
        } else {
            alert("Please enter a word")
        }
    }

    render() {
        return (
            <View style={{marginTop: 100}}>
                <ScrollView>
                    <Text>Word Up</Text>
                    <TextInput
                        placeholder="Type a word"
                        onChangeText={(word) => this.setState({word})}/>
                    <TouchableOpacity onPress={this.checkDefinition}>
                        <Text>Submit</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}