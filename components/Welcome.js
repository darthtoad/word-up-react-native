import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './../styles/styles';
import { Font } from 'expo';

export default class Welcome extends React.Component {
    state = {
        word: "",
        fontLoaded: false
    }

    constructor(props) {
        super(props);
        this.checkDefinition = this.checkDefinition.bind(this);
    }

    async componentDidMount() {
        await Font.loadAsync({
            'markazi-text-regular': require('./../assets/fonts/MarkaziText-Regular.ttf'),
            });
            await Font.loadAsync({
                'markazi-text-bold': require('./../assets/fonts/MarkaziText-Bold.ttf'),
                });
        this.setState({fontLoaded: true});
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
            <View style={styles.container}>
                {this.state.fontLoaded ? 
                    <ScrollView>
                        <Text style={styles.title}>Word Up</Text>}
                        <TextInput
                            style={styles.input}
                            placeholder="Type a word (case sensitive)"
                            onChangeText={(word) => this.setState({word})}/>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.checkDefinition}>
                            <Text>Submit</Text>
                        </TouchableOpacity>
                    </ScrollView> :
                    <Text style={{marginTop: (window.height / 2) - 10}}>LOADING...</Text>
                }
            </View>
        )
    }
}