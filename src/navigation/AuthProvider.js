import { Toast } from "native-base";
import React, { Component, createContext } from "react";
import { login, logout, register } from "../model/Users";

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
            const error = await login(email, password);
            if (error) {
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
            const error = await register(
              email,
              password,
              firstName,
              lastName,
              profilePictureUri
            );
            if (error) {
              _firebaseError(error);
            }
          },
          logout: async () => {
            const error = await logout();
            if (error) {
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
