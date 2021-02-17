import React, { Component } from "react";
import { Image, StyleSheet } from "react-native";
import {
  Container,
  Button,
  Text,
  Icon,
  Content,
  Header,
  Form,
  Item,
} from "native-base";
import theme from "../../native-base-theme/variables/custom";
import { connect } from "react-redux";
import EmailInputField from "../components/EmailInputField";
import PasswordInputField from "../components/PasswordInputField";
import { AuthContext } from "../navigation/AuthProvider";

export class LoginPage extends Component {
  state = {
    email: "",
    password: "",
  };

  static contextType = AuthContext;

  setEmail = (text) => {
    this.setState({ email: text });
  };
  setPassword = (text) => {
    this.setState({ password: text });
  };

  onSignUpPress = () => {
    this.props.navigation.navigate("Registration");
  };

  onLoginPress = () => {
    var email = this.state.email;
    var password = this.state.password;
    this.context.login(email, password);
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
            <Image
              style={styles.logo}
              source={require("../../assets/icon.png")}
            />

            <EmailInputField
              onChangeEmail={(text) => this.setEmail(text)}
              email={this.state.email}
            />

            <PasswordInputField
              onChangePassword={(text) => this.setPassword(text)}
              password={this.state.password}
              isLoginPassword={true}
            />

            <Button
              full
              rounded
              style={styles.emailButton}
              onPress={this.onLoginPress}
            >
              <Text>Login</Text>
            </Button>

            <Text style={styles.formIconAndText}>
              Don't have an account?&nbsp;
              <Text onPress={this.onSignUpPress} style={styles.formLinkText}>
                Sign up
              </Text>
            </Text>

            <Item style={styles.formDivider}>
              <Text style={styles.formDividerLabel}>OR</Text>
            </Item>

            <Button iconLeft full rounded style={styles.googleButton}>
              <Icon
                name="google"
                type="AntDesign"
                style={styles.googleButtonText}
              />
              <Text style={styles.googleButtonText}>Login with Google</Text>
            </Button>
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
  logo: {
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  formIconAndText: {
    color: "#FFFFFF90",
  },
  formLinkText: {
    color: theme.brandLight,
  },

  formDivider: {
    justifyContent: "center",
    textAlign: "center",
    marginVertical: 15,
    color: "#FFF",
  },
  formDividerLabel: {
    color: "#FFFFFF90",
    marginBottom: 5,
  },
  emailButton: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    backgroundColor: theme.btnPrimaryBg,
  },
  googleButton: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    backgroundColor: "#4285F4",
  },
  googleButtonText: {
    color: "#FFF",
  },
});

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(LoginPage);
