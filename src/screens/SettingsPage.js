import React, { Component } from "react";
import { Container } from "native-base";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import theme from "../../native-base-theme/variables/custom";
import { AuthContext } from "../navigation/AuthProvider";

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

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(SettingsPage);
