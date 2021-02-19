import React, { Component } from "react";
import { Image, StyleSheet, Platform } from "react-native";
import {
  Container,
  Content,
  Header,
  Form,
  Item,
  Input,
  Text,
  Icon,
  Button,
  Toast,
} from "native-base";
import theme from "../../native-base-theme/variables/custom";
import { connect } from "react-redux";
import EmailInputField from "../components/EmailInputField";
import PasswordInputField from "../components/PasswordInputField";
import { AuthContext } from "../navigation/AuthProvider";
import ProfilePicturePicker from "../components/ProfilePicturePicker";

export class RegistrationPage extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePictureUri: null,
  };

  static contextType = AuthContext;

  setFirstName = (text) => {
    this.setState({ firstName: text });
  };
  setLastName = (text) => {
    this.setState({ lastName: text });
  };
  setEmail = (text) => {
    this.setState({ email: text });
  };
  setPassword = (text) => {
    this.setState({ password: text });
  };

  setProfilePictureUri = (text) => {
    this.setState({ profilePictureUri: text });
  };

  validateRegistration = (firstName, lastName) => {
    return !(
      firstName === undefined ||
      lastName === undefined ||
      firstName.length == 0 ||
      lastName.length == 0
    );
  };

  onLogInPress = () => {
    this.props.navigation.navigate("Login");
  };

  onRegisterPress = () => {
    var email = this.state.email;
    var password = this.state.password;
    var firstName = this.state.firstName;
    var lastName = this.state.lastName;
    var profilePictureUri = this.state.profilePictureUri;

    if (this.validateRegistration(firstName, lastName)) {
      this.context.register(
        email,
        password,
        firstName,
        lastName,
        profilePictureUri
      );
    } else {
      Toast.show({
        text: `First name and/or Last name cannot be left blank!`,
        duration: 3000,
        type: "danger",
        position: "bottom",
      });
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header
          iosBarStyle="light-content"
          androidStatusBarColor={theme.brandPrimary}
          transparent
        ></Header>
        <Content>
          <Form>
            <ProfilePicturePicker
              onImagePicked={(text) => this.setProfilePictureUri(text)}
            />
            <Item rounded style={styles.formItem}>
              <Icon
                name="person"
                type="MaterialIcons"
                style={styles.formIconAndText}
              />
              <Input
                placeholder="First Name"
                placeholderTextColor="#FFFFFF90"
                style={styles.formIconAndText}
                onChangeText={(text) => this.setFirstName(text)}
              />
            </Item>

            <Item rounded style={styles.formItem}>
              <Icon
                name="person"
                type="MaterialIcons"
                style={styles.formIconAndText}
              />
              <Input
                placeholder="Last Name"
                placeholderTextColor="#FFFFFF90"
                style={styles.formIconAndText}
                onChangeText={(text) => this.setLastName(text)}
              />
            </Item>

            <EmailInputField
              onChangeEmail={(text) => this.setEmail(text)}
              email={this.state.email}
            />

            <PasswordInputField
              onChangePassword={(text) => this.setPassword(text)}
              password={this.state.password}
              isLoginPassword={false}
            />

            <Button
              full
              rounded
              style={styles.signUpButton}
              onPress={this.onRegisterPress}
            >
              <Text>Sign Up</Text>
            </Button>

            <Text style={styles.formIconAndText}>
              Already got an account?&nbsp;
              <Text onPress={this.onLogInPress} style={styles.formLinkText}>
                Log In
              </Text>
            </Text>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.brandPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
  formItem: {
    backgroundColor: "#00000050",
    borderColor: theme.brandInfo,
    marginVertical: 10,
  },
  formIconAndText: {
    color: "#FFFFFF90",
  },
  formLinkText: {
    color: theme.brandLight,
  },
  signUpButton: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    backgroundColor: theme.btnPrimaryBg,
  },
});

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(RegistrationPage);
