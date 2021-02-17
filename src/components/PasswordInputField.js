import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Icon, Item, Input, Toast } from "native-base";
import theme from "../../native-base-theme/variables/custom";

export default class PasswordInputField extends Component {
  state = {
    passwordError: false,
  };

  validatePassword = (password) => {
    const passwordMinLength = 6;
    if (password == undefined || password.length == 0) {
      this.setState({ passwordError: false });
    } else if (password.length <= passwordMinLength) {
      this.setState({ passwordError: true });
      Toast.show({
        text: `Password must be longer than ${passwordMinLength} characters`,
        duration: 1000,
        type: "danger",
        position: "bottom",
      });
    } else {
      this.setState({ passwordError: false });
    }
  };

  render() {
    return (
      <Item
        rounded
        style={
          !this.state.passwordError ? styles.formItem : styles.formItemError
        }
      >
        <Icon
          name="lock-outline"
          type="MaterialIcons"
          style={
            !this.state.passwordError
              ? styles.formIconAndText
              : styles.formErrorIconAndText
          }
        />
        <Input
          placeholder="Password"
          placeholderTextColor="#FFFFFF90"
          secureTextEntry={true}
          style={styles.formIconAndText}
          onChangeText={(text) => {
            this.props.onChangePassword(text);
            if (!this.props.isLoginPassword) {
              this.validatePassword(text);
            }
          }}
          value={this.props.password}
          autoCompleteType="password"
        />
        {this.state.passwordError ? (
          <Icon
            name="closecircle"
            type="AntDesign"
            style={styles.formErrorIconAndText}
          />
        ) : (
          <></>
        )}
      </Item>
    );
  }
}

const styles = StyleSheet.create({
  formIconAndText: {
    color: "#FFFFFF90",
  },
  formItem: {
    backgroundColor: "#00000050",
    borderColor: theme.brandInfo,
    marginVertical: 10,
  },
  formItemError: {
    backgroundColor: "#00000050",
    borderColor: theme.brandDanger,
    marginVertical: 10,
  },
  formErrorIconAndText: {
    color: theme.brandDanger,
  },
});
