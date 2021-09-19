import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RegistrationPage } from "../screens/AuthStack/RegistrationPage";
import { LoginPage } from "../screens/AuthStack/LoginPage";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{ headerTintColor: "#00000000" }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Registration" component={RegistrationPage} />
    </Stack.Navigator>
  );
}
