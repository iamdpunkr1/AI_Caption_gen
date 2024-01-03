/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Touchable,
  TouchableOpacity
} from 'react-native';

import * as ImagePicker from 'react-native-image-picker';
 

function App(): React.JSX.Element {
  const [photo, setPhoto] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={{textAlign:"center",fontSize:36 , fontWeight:"900", color:"white"}}>AI Image caption generator</Text>
      </View>
      
      

      {
        photo ? (
          <>
                <Image
                source={{uri: photo?.assets[0]?.uri}}
                style={{ width: 200,
                  height: 200,
                  alignSelf: 'center',
                  marginBottom: 10,}}
              />
              <TouchableOpacity onPress={()=> setPhoto(null)} style={{backgroundColor:"white", width:180,
               alignSelf:"center", borderRadius:3, paddingVertical:4}}>
                <Text style={{textAlign:"center",fontSize:18 , fontWeight:"700", color:"#2e307d"}}>Remove</Text>
              </TouchableOpacity>
          </>
              
              )

              :
           
              <TouchableOpacity style={{marginTop:40,height:200, width:200, borderRadius:3, borderWidth:3, borderStyle:"dashed", borderColor:"white",
               flex:0, justifyContent:"center", alignItems:"center", paddingVertical:20, backgroundColor:"#484bb0",
              alignSelf:"center"}}
                  onPress={() =>
                    ImagePicker.launchImageLibrary(
                      {
                        mediaType: 'photo',
                        includeBase64: true,
                        maxHeight: 200,
                        maxWidth: 200,
                      },
                      response => {
                        if (response.didCancel) {
                          console.log('Image selection cancelled');
                        } else if (response.error) {
                          console.error('ImagePicker Error: ', response.error);
                        } else {
                          setPhoto(response);
                        }
                      },
                    )
                  }
                  >
                    <Text style={{textAlign:"center",fontSize:48 , fontWeight:"900", color:"white"}}>+</Text>
                  </TouchableOpacity>
      }

      <TouchableOpacity
        disabled={!photo}
        style={{backgroundColor:"#fd890e", borderRadius:4, width:250, alignSelf:"center", marginTop:24}}>
        <Text style={{textAlign:"center",fontSize:20 , fontWeight:"600", color:"white", paddingVertical:10}}>Generate Caption</Text>
      </TouchableOpacity>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop: 32,
    paddingHorizontal: 24,
    backgroundColor:"#2e307d"
  },

});

export default App;
