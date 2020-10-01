import React from 'react';
import { Text, View, TextInput } from 'react-native';

const HelloWorldApp = () => {
  const [value, onChangeText] = React.useState('Useless Placeholder');

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text>Hello, world!</Text>
      <Text>This is so cool</Text>
      <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText(text)}
      value={value}
    />
    </View>
  )
}
export default HelloWorldApp;
