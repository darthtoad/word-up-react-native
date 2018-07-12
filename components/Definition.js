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
                    <Text style={styles.title}>{this.props.word}</Text> {this.state.defObject !== null && 
                    this.state.defObject.results ?
                    this.state.defObject.results.map(function(result, key) {
                        return (
                            <View key={key} style={{marginVertical: 5}}>
                                <Text style={styles.boldText}>{result.partOfSpeech + ": "}</Text>
                                <Text style={styles.text}>{result.definition}</Text>
                                {result.synonyms &&
                                    <View style={{flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 5}}>
                                        <Text style={styles.smallText}>Synonyms: </Text>
                                        {result.synonyms.map(function(synonym, key) {
                                            return (
                                                <Text style={styles.smallText} key={key + "Syn"}>{synonym}{key < result.synonyms.length - 1 && " ,"}</Text>
                                            )
                                        })}
                                    </View>
                                }
                            </View>
                        )
                    }) :
                        this.state.defObject !== null ?
                            <Text>Word not found</Text> :
                            <Text>Loading...</Text>
                    }
                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity onPress={this.props.changeScreen} style={[styles.button, {alignItems: 'center', marginTop: 5}]}>
                            <Text>Go Back</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}