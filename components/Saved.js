import React from 'react';
import { styles } from './../styles/styles.js';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';

export default class Saved extends React.Component {
    state = {
        wordList: [],
        word: ""
    }

    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
        this.lookUp = this.lookUp.bind(this);
    }

    componentDidMount() {
        const fb = firebase.app();
        const userId = fb.auth().currentUser.uid;
        console.log("ID: " + userId);
        const fbRef = fb.database().ref('users/' + userId);
        let newList = [];
        fbRef.on('value', (snapshot) => {
            console.log("Snapping");
            snapshot.forEach((value) => {
                newList.push(value.val());
            })
            console.log(newList);
        });
        this.setState({wordList: newList});
    }

    delete() {
        const fb = firebase.app();
        const userId = fb.auth().currentUser.uid;
        fb.database().ref('users/' + userId).once('value', function(snapshot) {
            snapshot.forEach(value => {
                if (value.val() === this.state.word) {
                    snapshot.remove();
                }
            })
        })
    }

    lookUp() {
        this.props.setWord(this.state.word);
        this.props.changeScreen();
    }

    render() {
        return (
            <View>
                {this.state.wordList.length > 0 ?
                    <View>
                        <ScrollView>
                            <Text style={styles.title}>Saved Words</Text>
                            <Text style={styles.boldText}>Click on Word for Options</Text>
                            {this.state.wordList.map((word) => {
                                <View>
                                    <Text style={styles.text} onPress={this.setState({word})}>{word}</Text>
                                    {
                                        this.state.word === word &&
                                        <View>
                                            <TouchableOpacity onPress={this.lookUp} style={styles.button}>Look Up Word</TouchableOpacity>
                                            <TouchableOpacity onPress={this.delete} style={styles.button}>Delete</TouchableOpacity>
                                        </View>
                                    }
                                </View>
                            })}
                        </ScrollView>
                    </View> :
                    <View>
                        <Text style={styles.title}>You might not have any saved words</Text>
                    </View>
                }
                <View>
                    <TouchableOpacity style={styles.button} onPress={this.props.newWord}>
                        <Text>Look Up a New Word</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}