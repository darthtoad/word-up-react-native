import React from 'react';
import { Image, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { getDefinition } from './../services/WordService';
import { getImages } from './../services/GiphyService';
import { styles } from './../styles/styles';

export default class Definition extends React.Component {
    state = {
        defObject: null,
        word: this.props.word,
        imageUrl: null
    }

    async componentDidMount() {
        this.setState({defObject: await getDefinition(this.props.word)})
        this.setState({imageUrl: await getImages(this.state.word)});
    }

    getSynonym = async (synonym) => {
        this.setState({word: synonym});
        this.setState({defObject: await getDefinition(synonym)});
        this.setState({imageUrl: await getImages(this.state.word)})
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.title}>{this.state.word}</Text>
                    {this.state.imageUrl !== null && <Image source={{uri: this.state.imageUrl}} style={{height: 100, width: 100, alignSelf: 'center'}}/>}
                    {this.state.defObject !== null && 
                    this.state.defObject.results ?
                    this.state.defObject.results.map((result, key) => {
                        return (
                            <View key={key} style={styles.contentBox}>
                                <Text style={styles.boldText}>{result.partOfSpeech + ": "}</Text>
                                <Text style={styles.text}>{result.definition}</Text>
                                {result.synonyms &&
                                    <View style={{flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 5}}>
                                        <Text style={styles.smallText}>Synonyms: </Text>
                                        {result.synonyms.map((synonym, key) => {
                                            return (
                                                <Text style={styles.smallTextLink} key={key + "Syn"} onPress={() => this.getSynonym(synonym)}>{synonym}{key < result.synonyms.length - 1 && <Text style={{color: 'black'}}>, </Text>}</Text>
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