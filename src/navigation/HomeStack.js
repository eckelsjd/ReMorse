import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomePage } from "../screens/HomePage";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{ headerTintColor: "#00000000" }}
    >
      <Stack.Screen name="Home" component={HomePage} />
    </Stack.Navigator>
  );
}
