import React, { createContext, useState, Component } from "react";
import { Toast } from "native-base";
import { firebase } from "../firebase/config";

_firebaseError = (error) => {
  console.log(error);
  var errorCode = error.code;
  var errorMessage = error.message;
  Toast.show({
    text: errorMessage,
    buttonText: "Dismiss",
    duration: 3000,
    type: "danger",
    position: "bottom",
  });
};

export const AuthContext = createContext({});

export class AuthProvider extends Component {
  state = {
    user: null,
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          user: this.state.user,
          setUser: (user) => {
            this.setState({ user: user });
          },
          login: async (email, password) => {
            try {
              const response = await firebase
                .auth()
                .signInWithEmailAndPassword(email, password);
            } catch (error) {
              _firebaseError(error);
            }
          },
          register: async (
            email,
            password,
            firstName,
            lastName,
            profilePictureUri = null
          ) => {
            try {
              const response = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password);
              const uid = response.user.uid;
              const userData = {
                uid: uid,
                email: email,
                firstName: firstName,
                lastName: lastName,
                profilePictureUri: profilePictureUri,
              };
              
              const promise = await firebase
                .database()
                .ref("users/" + uid)
                .set(userData);

            } catch (error) {
              _firebaseError(error);
            }
          },
          logout: async () => {
            try {
              await firebase.auth().signOut();
            } catch (error) {
              _firebaseError(error);
            }
          },
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
