import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { getDefinition } from './../services/WordService';

export default class Definition extends React.Component {
    state = {
        defObject: null
    }

    async componentDidMount() {
        this.setState({defObject: await getDefinition(this.props.word)})
    }

    render() {
        return (
            <View style={{marginTop: 100}}>
                <ScrollView>
                    <Text>{this.props.word}:</Text> {this.state.defObject !== null ? 
                    this.state.defObject.results.map(function(result, key) {
                        return (
                            <View key={key}>
                                <Text>{ result.partOfSpeech + ": " + result.definition }</Text>
                                {/* <TouchableOpacity onPress={this.toggleSynonyms}>
                                    {this.state.synonymVisable ? <Text>Hide Synonym</Text> : <Text>Show Synonym</Text>}
                                </TouchableOpacity> */}
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
                </ScrollView>
            </View>
        )
    }
}