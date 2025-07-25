import { View, Text, TextInput } from 'react-native'
import React from 'react'

export default function input({ placeholder, password=false, onChangeText, label }) {
  return (
    <View>
      <Text style={{fontWeight:'medium'}}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        onChangeText={(value) => onChangeText(value)}
        secureTextEntry={password}
        style={{
          borderRadius: 8,
          borderWidth: 1,
          width: "100%",
          padding: 15,
          fontSize: 20,
        }}
      />
    </View>
  );
}