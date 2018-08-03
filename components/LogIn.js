import React from 'react';
import { styles } from './../styles/styles';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Font } from 'expo';
import * as firebase from 'firebase';

export default class LogIn extends React.Component {
    state = {
        email: "",
        password: "",
        fontLoaded: false
    }

    constructor(props) {
        super(props);
        this.firebaseSignIn = this.firebaseSignIn.bind(this);
    }

    async firebaseSignIn() {
        try {
            const firebaseConfig = await fetch("https://word-up-node-backend-fxqnoyasdy.now.sh/firebase");
            const parsedConfig = await firebaseConfig.json();
            console.log(parsedConfig);
            const init = firebase.initializeApp(await parsedConfig);
            await init.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
                console.log(error.code);
                console.log(error.message);
            });
            if (await init.auth().currentUser) {
                await this.props.changeScreen();
            } else {
                alert("Incorrect email or password");
            }
            console.log(await init.auth());
        } catch (error) {
            console.log(error);
        }
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

    render() {
        return (
            <View style={styles.container}>
                { this.state.fontLoaded ?
                    <ScrollView>
                        <Text style={styles.title}>Log In to Word Up</Text>
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
                            onPress={this.firebaseSignIn}>
                            <Text>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.props.signUp}
                        >
                            <Text>Sign Up</Text>
                        </TouchableOpacity>
                    </ScrollView> :
                    <View>
                        <Text style={{marginTop: (window.height / 2) - 10}}>LOADING</Text>
                    </View>
                }
            </View>
        )
    }
}