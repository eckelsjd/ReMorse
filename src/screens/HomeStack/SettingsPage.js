import React, { Component } from "react";
import { Container } from "native-base";
import { StyleSheet } from "react-native";
import theme from "../../../native-base-theme/variables/custom";
import { AuthContext } from "../../navigation/AuthProvider";

export class SettingsPage extends Component {
  static contextType = AuthContext;

  _user = () => {
    return this.context.user;
  };

  render() {
    return <Container style={styles.container}></Container>;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.brandPrimary,
  },
});


export default SettingsPage;
