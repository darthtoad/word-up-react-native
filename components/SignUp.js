import React from 'react';
import { styles } from './../styles/styles';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.firebaseSignUp = this.firebaseSignUp.bind(this);
    }

    async firebaseSignUp() {
        try {
            const firebaseConfig = await fetch("https://word-up-node-backend-fxqnoyasdy.now.sh/firebase");
            const parsedConfig = await firebaseConfig.json();
            console.log(parsedConfig);
            const init = firebase.initializeApp(await parsedConfig);
            await init.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
                console.log(error.code);
                console.log(error.message);
            });
            if (await init.auth().currentUser) {
                this.props.changeScreen();
            } else {
                alert("Please try a different username");
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <View style={{marginTop: 20}}>
                <ScrollView>
                    <Text style={styles.title}>Sign Up for Word Up</Text>
                    <TextInput style={styles.input}
                        placeholder="Enter your Email"
                        onChangeText={(email) => this.setState({email})}
                    />
                    <TextInput style={styles.input}
                        placeholder="Enter your Password"
                        onChangeText={(password) => this.setState({password})}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.firebaseSignUp}>
                        <Text>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.props.logIn}
                    >
                        <Text>Sign In</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )

    }
}