import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { getDefinition } from './../services/WordService';
import { styles } from './../styles/styles';

export default class Definition extends React.Component {
    state = {
        defObject: null
    }

    async componentDidMount() {
        this.setState({defObject: await getDefinition(this.props.word)})
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text>{this.props.word}:</Text> {this.state.defObject !== null ? 
                    this.state.defObject.results.map(function(result, key) {
                        return (
                            <View key={key}>
                                <Text>{ result.partOfSpeech + ": " + result.definition }</Text>
                                {result.synonyms &&
                                    <View>
                                        <Text>Synonyms: </Text>
                                        {result.synonyms.map(function(synonym, key) {
                                            return (
                                                <Text key={key + "Syn"}>{synonym}</Text>
                                            )
                                        })}
                                    </View>
                                }
                            </View>
                        )
                    })
                    : <Text>Loading...</Text>}
                    <TouchableOpacity onPress={this.props.changeScreen}>
                        <Text>Go Back</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={this.props.goToEtymology}>
                        <Text>Go to Etymology</Text>
                    </TouchableOpacity> */}
                </ScrollView>
            </View>
        )
    }
}