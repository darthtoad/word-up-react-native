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
        console.log("Word List: " + this.props.wordList);
        console.log("Type: " + typeof this.props.wordList);
        console.log(Object.values(this.props.wordList));
    }

    componentDidMount() {
        // let list = [];
        // Object.keys(this.props.wordList).map((key) => {
        //     list.push(this.props.wordList[key])
        // })
        // this.setState({wordList: list});
        // console.log(this.state.wordList);
        // console.log(list);
    }

    // async componentDidMount() {
    //     this.setState({wordList: await this.getArray()});
    // }

    // getArray = async() => {
    //     const fb = firebase.app();
    //     const userId = fb.auth().currentUser.uid;
    //     console.log("ID: " + userId);
    //     const fbRef = fb.database().ref('users/' + userId);
    //     await fbRef.on('value', (snapshot) => {
    //         let newList = [];
    //         console.log("Snapping");
    //         snapshot.forEach((value) => {
    //             newList.push(value.val().word);
    //         })
    //         console.log(newList);
    //         return newList;
    //     });
    // }

    

    // getList = () => {
    //     console.log("getting list");
    //     return (
    //         <View>
    //             {this.state.wordList && this.state.wordList.length > 0 ?
    //                 <View>
    //                     <ScrollView>
    //                         <Text style={styles.title}>Saved Words</Text>
    //                         <Text style={styles.boldText}>Click on Word for Options</Text>
    //                         {this.state.wordList.map((word) => {
    //                             <View>
    //                                 <Text style={styles.text} onPress={this.setState({word})}>{word}</Text>
    //                                 {
    //                                     this.state.word === word &&
    //                                     <View>
    //                                         <TouchableOpacity onPress={this.lookUp} style={styles.button}>Look Up Word</TouchableOpacity>
    //                                         <TouchableOpacity onPress={this.delete} style={styles.button}>Delete</TouchableOpacity>
    //                                     </View>
    //                                 }
    //                             </View>
    //                         })}
    //                     </ScrollView>
    //                 </View> :
    //                 <View>
    //                     <Text style={styles.title}>You might not have any saved words</Text>
    //                 </View>
    //             }
    //         </View>
    //     )
    // }

    delete() {
        const fb = firebase.app();
        const userId = fb.auth().currentUser.uid;
        const wordToDelete = this.state.word;
        fb.database().ref('users/' + userId).once('value', function(snapshot) {
            snapshot.forEach(value => {
                console.log(value.key);
                console.log(snapshot);
                if (value.val().word === wordToDelete) {
                    fb.database().ref('users/' + userId + "/" + value.key).remove();
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
                <View>
                {this.props.wordList && this.props.wordList.length > 0 ?
                    <View style={{marginTop: 40}}>
                        <ScrollView>
                            <Text style={styles.title}>Saved Words</Text>
                            <Text style={styles.boldText}>Click on Word for Options</Text>
                            {Object.values(this.props.wordList).map((word) => {
                                return (<View>
                                    <Text style={styles.text} onPress={() => this.setState({word: word})}>{word}</Text>
                                    {
                                        this.state.word === word &&
                                        <View>
                                            <TouchableOpacity onPress={this.lookUp} style={styles.button}>
                                                <Text>Look Up Word</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={this.delete} style={styles.button}>
                                                <Text>Delete</Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                </View>)
                            })}
                        </ScrollView>
                    </View> :
                    <View>
                        <Text style={styles.title}>You might not have any saved words</Text>
                    </View>
                }
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={this.props.newWord}>
                        <Text>Look Up a New Word</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}