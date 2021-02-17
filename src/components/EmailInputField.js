import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Icon, Item, Input, Toast } from "native-base";
import theme from "../../native-base-theme/variables/custom";

export default class EmailInputField extends Component {
  state = {
    emailError: false,
  };

  validateEmail = (email) => {
    if (email == undefined || email.length == 0) {
      this.setState({ emailError: false });
    } else if (!email.includes("@") || !email.includes(".")) {
      this.setState({ emailError: true });
      Toast.show({
        text: `Invalid email address`,
        duration: 1000,
        type: "danger",
        position: "bottom",
      });
    } else {
      this.setState({ emailError: false });
    }
  };

  render() {
    return (
      <Item
      rounded
      style={
        !this.state.emailError ? styles.formItem : styles.formItemError
      }
    >
      <Icon
        name="email"
        type="MaterialIcons"
        style={
          !this.state.emailError
            ? styles.formIconAndText
            : styles.formErrorIconAndText
        }
      />
      <Input
        placeholder="Email"
        placeholderTextColor="#FFFFFF90"
        style={styles.formIconAndText}
        onChangeText={(text) => {
          this.props.onChangeEmail(text);
          this.validateEmail(text);
        }}
        value={this.props.email}
        autoCompleteType="email"
      />
      {this.state.emailError ? (
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
