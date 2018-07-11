import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { getDefinition } from './../services/WordService';

export default class Definition extends React.Component {
    state = {
        defObject: null
    }

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        this.setState({defObject: await getDefinition(this.props.word)})
    }

    render() {
        return (
            <View style={{marginTop: 100}}>
                <Text>Success! {this.props.word}: {this.state.defObject !== null ? this.state.defObject.word : "Loading..."}</Text>
            </View>
        )
    }
}