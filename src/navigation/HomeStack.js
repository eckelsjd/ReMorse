import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomePage } from "../screens/HomePage";
import { ContactsPage } from "../screens/ContactsPage";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
     headerMode="none"
      screenOptions={{ headerTintColor: "#00000000" }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Contacts" component={ContactsPage} />

    </Stack.Navigator>
  );
}
