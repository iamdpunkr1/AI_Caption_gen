import React from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'

type Props = {
    pickImage: () => void
    }

const Uploader = ({pickImage}: Props) => {
  return (
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
  )
}

export default Uploader