import { View, Text, Touchable, TouchableOpacity } from "react-native";
import React from "react";

export default function Button({title , onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "purple",
        padding: 15,
        borderRadius:10
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 25,
          color:"white"
        }}
      >{title}</Text>
    </TouchableOpacity>
  );
}
