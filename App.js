import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from './components/Welcome';
import Definition from './components/Definition';
import { styles } from './styles/styles.js';
import Saved from './components/Saved';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import * as firebase from 'firebase';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.changeToDefiniton = this.changeToDefiniton.bind(this);
    this.changeToWelcome = this.changeToWelcome.bind(this);
    this.changeToSignUp = this.changeToSignUp.bind(this);
    this.changeToLogIn = this.changeToLogIn.bind(this);
    this.changeToSaved = this.changeToSaved.bind(this);
    this.getArray = this.getArray.bind(this);
    // this.getGiphyKey = this.getGiphyKey.bind(this);
    // this.getMashapeKey = this.getMashapeKey.bind(this);
  }

  getArray = async() => {
    const fb = firebase.app();
    const userId = fb.auth().currentUser.uid;
    console.log("ID: " + userId);
    const fbRef = fb.database().ref('users/' + userId);
    await fbRef.on('value', (snapshot) => {
        let newList = [];
        console.log("Snapping");
        snapshot.forEach((value) => {
            newList.push(value.val().word);
        })
        console.log(newList);
        this.setState({wordList: newList});
    });
  }

  state = {
    screen: "LogIn",
    word: "",
    wordList: []
  }

  changeToSaved() {
    this.setState({screen: "Saved"});
  }

  changeToDefiniton() {
    this.setState({screen: "Definition"});
  }

  changeToSignUp() {
    this.setState({screen: "SignUp"});
  }

  changeToLogIn() {
    this.setState({screen: "LogIn"});
  }

  changeToWelcome() {
    this.setState({screen: "Welcome"}); 
  }
  
  render() {
    return (
      <View style={styles.container}>
        { this.state.screen === "LogIn" &&
          <View>
            <LogIn 
              changeScreen={this.changeToWelcome}
              signUp={this.changeToSignUp}
            />
          </View>
        }
        {
          this.state.screen === "SignUp" &&
          <View>
            <SignUp
              logIn={this.changeToLogIn}
              changeScreen={this.changeToWelcome}
              />
          </View>
        }
        { this.state.screen === "Welcome" &&
          <View>
            <Welcome
              changeScreen={this.changeToDefiniton}
              setList={this.getArray}
              setWord={(word) => this.setState({word})}
              changeScreenToSaved={this.changeToSaved}
              />
          </View>
        }
        {
          this.state.screen === "Definition" &&
            <Definition
              changeScreen={this.changeToWelcome}
              word={this.state.word}/>
        }
        {
          this.state.screen === "Saved" &&
            <Saved
              changeScreen={this.changeToDefiniton}
              newWord={this.changeToWelcome}
              wordList={this.state.wordList}
              setWord={(word) => this.setState({word})} />
        }
      </View>
    );
  }
}


