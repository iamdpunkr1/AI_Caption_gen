/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';



function App(): React.JSX.Element {

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={{textAlign:"center",fontSize:36 , fontWeight:"900", color:"white"}}>AI Image caption generator</Text>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop: 32,
    paddingHorizontal: 24,
    backgroundColor:"#6f00ff"
  },

});

export default App;
