import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { firebase } from "../firebase/config";
import AuthStack from "./AuthStack";
import HomeStack from "./HomeStack";
import { AuthContext } from "./AuthProvider";
import AppLoading from "expo-app-loading";
import { Toast } from "native-base";
export default class Routes extends Component {
  static contextType = AuthContext;

  state = {
    loading: true,
    initializing: true,
  };

  // Handle user state changes
  _onAuthStateChanged = async (user) => {
    console.log("auth state change: " + user?.uid);
    if (user) {
      try {
        const response = await firebase
          .database()
          .ref("users/" + user.uid)
          .once("value", (snapshot) => {
            console.log("snapshot: " + Object.entries(snapshot.val()));
            if (snapshot.exists()) {
              console.log("snapshot set user: " + snapshot.val());
              this.context.setUser(snapshot.val());
            } else {
              console.log("snapshot user not exist");
              this.context.setUser(null);
            }
          });
      } catch (error) {
        Toast.show({
          text: error.message,
          buttonText: "Dismiss",
          duration: 30000,
          type: "danger",
          position: "bottom",
        });
      }
    } else {
      this.context.setUser(null);
    }

    if (this.state.initializing) {
      this.setState({ initializing: false });
    }
    this.setState({ loading: false });
  };

  componentDidMount() {
    this.subscriber = firebase
      .auth()
      .onAuthStateChanged(this._onAuthStateChanged);
  }

  componentWillUnmount() {
    this.subscriber();
  }

  render() {
    if (this.state.loading) {
      return <AppLoading />;
    } else {
      return (
        <NavigationContainer>
          {this.context.user ? <HomeStack /> : <AuthStack />}
        </NavigationContainer>
      );
    }
  }
}
