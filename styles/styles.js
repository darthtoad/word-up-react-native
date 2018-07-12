import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ff9900',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10
    },
    title: {
        textAlign: 'center',
        fontSize: 50,
        fontFamily: 'markazi-text-regular'
    },
    input: {
        height: 40,
        minWidth: 250,
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 4,
        borderRadius: 8,
        padding: 10,
        paddingHorizontal: 10,
        marginVertical: 8,
        fontFamily: 'markazi-text-regular'
     },
    button: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        width: 100,
        borderRadius: 8,
        backgroundColor: '#e9e9e9'
      }
  });