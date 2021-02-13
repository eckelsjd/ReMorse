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
  Input,
} from "native-base";
import theme from "../../native-base-theme/variables/custom";
import { firebase } from "../firebase/config";

export class LoginPage extends Component {
  state = {
    email: "",
    password: "",
  };

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

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        console.log(response);
        // const usersRef = firebase.firestore().collection("users");
        // usersRef
        //   .doc(uid)
        //   .get()
        //   .then((firestoreDocument) => {
        //     if (!firestoreDocument.exists) {
        //       alert("User does not exist anymore.");
        //       return;
        //     }
        //     const user = firestoreDocument.data();
        //     navigation.navigate("Home", { user });
        //   })
        //   .catch((error) => {
        //     alert(error);
        //   });
      })
      .catch((error) => {
        console.log(error);
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
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

            <Item rounded style={styles.formItem}>
              <Icon
                name="email"
                type="MaterialIcons"
                style={styles.formIconAndText}
              />
              <Input
                placeholder="Email"
                placeholderTextColor="#FFFFFF90"
                style={styles.formIconAndText}
                onChangeText={(text) => this.setEmail(text)}
              />
            </Item>

            <Item rounded style={styles.formItem}>
              <Icon
                name="lock-outline"
                type="MaterialIcons"
                style={styles.formIconAndText}
              />
              <Input
                placeholder="Password"
                placeholderTextColor="#FFFFFF90"
                secureTextEntry={true}
                style={styles.formIconAndText}
                onChangeText={(text) => this.setPassword(text)}
              />
            </Item>

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
    marginLeft: 20,
    justifyContent: "center",
    marginVertical: 20,
  },
  formIconAndText: {
    color: "#FFFFFF90",
  },
  formLinkText: {
    color: theme.brandLight,
  },
  formItem: {
    backgroundColor: "#00000050",
    borderColor: theme.brandInfo,
    marginVertical: 10,
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

export default LoginPage;
