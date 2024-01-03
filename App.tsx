import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';



interface Photo {
  assets?: Array<{ uri?: string; base64?: string }>;
}


function App(): React.ReactElement {
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [caption, setCaption] = useState<string | null>(null);
  const [credits, setCredits] = useState<number>(3);

  useEffect(() => {
    const getStoredCredits = async () => {
      const storedCredits = await AsyncStorage.getItem('credits');
      if (storedCredits) {
        setCredits(Number(storedCredits));
      }else{
        await AsyncStorage.setItem('credits', '3');
      }
    };
    getStoredCredits();
  },[])



  const generateCaption = async () => {
    if(!photo) return;

    if(credits <= 0) return;

    try {
      const imageUrl = `data:image/jpeg;base64,${photo?.assets?.[0]?.base64}`;

      const response = await fetch('https://api.openai.com/v1/chat/completions' ,{
        method: 'POST',
        body: JSON.stringify({
          model: "gpt-4-vision-preview",
          messages : [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Provide a short caption for the image:"
                },
                {
                  type: "image_url",
                  image_url: {
                    url: imageUrl,
                      detail: "low"
                  }
                  
                }
              ]
            }
          ],
          max_tokens: 1000
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
          }

      })

      const data = await response.json();
      console.log(data);
      const genCaption = data.choices[0].message.content;
      console.log({ genCaption });
      setCaption(genCaption);
      setCredits(credits - 1);
      await AsyncStorage.setItem('credits', String(credits - 1));
    } catch (error) {
      console.error('Error in Caption generation:', error);
    }
  }

  const pickImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        if (!response.didCancel) {
          setPhoto(response);
        }
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2e307d" />

      <View>
        <Text style={{ textAlign: 'center', fontSize: 36, fontWeight: '800', color: 'white' }}>
          AI Image caption generator
        </Text>
      </View>

      {photo ? (
        <>
          <Image
            source={{ uri: photo.assets?.[0]?.uri }}
            style={{ width: 200, height: 200, alignSelf: 'center', marginBottom: 10, marginTop:40 }}
          />
          <TouchableOpacity
            onPress={() => {setPhoto(null)
                            setCaption("")}}
            style={{ backgroundColor: 'white', width: 180, alignSelf: 'center', borderRadius: 3, paddingVertical: 4 }}
          >
            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '700', color: '#2e307d' }}>Remove</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          style={{
            marginTop: 40,
            height: 200,
            width: 200,
            borderRadius: 3,
            borderWidth: 3,
            borderStyle: 'dashed',
            borderColor: 'white',
            flex: 0,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
            backgroundColor: '#484bb0',
            alignSelf: 'center',
          }}
          onPress={pickImage}
        >
          <Text style={{ textAlign: 'center', fontSize: 48, fontWeight: '400', color: 'white' }}>+</Text>
          <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '600', color: 'white' }}>Upload Image</Text>
        </TouchableOpacity>
      )}


      <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '400', color: '#f9f8f7', marginTop: 24 }}>
        {caption ? caption : 'Your caption will appear here'}
      </Text>

      <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '400', color: 'white', marginTop: 24, textDecorationLine:"underline" }}>
        Credits : {credits}
      </Text>
      <TouchableOpacity
        disabled={!photo}
        onPress={generateCaption}
        style={{ backgroundColor: '#fd890e', borderRadius: 4, width: 250, alignSelf: 'center', marginTop: 24 }}
      >
        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '600', color: 'white', paddingVertical: 10 }}>
          Generate Caption
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: '#2e307d',
  },
});

export default App;
