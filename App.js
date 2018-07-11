import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from './components/Welcome';
import Definition from './components/Definition';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.changeToDefiniton = this.changeToDefiniton.bind(this);
  }

  state = {
    screen: "Welcome",
    word: ""
  }

  changeToDefiniton() {
    this.setState({screen: "Definition"});
  }
  
  render() {
    return (
      <View style={styles.container}>
        { this.state.screen === "Welcome" &&
          <View>
            <Welcome
              changeScreen={this.changeToDefiniton}
              setWord={(word) => this.setState({word})}
              />
          </View>
        }
        {
          this.state.screen === "Definition" &&
            <Definition word={this.state.word}/>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
