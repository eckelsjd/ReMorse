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
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../firebase/config";
import { registerUser } from "../redux/actions";
import { connect } from "react-redux";
import {bindActionCreators} from "redux";

export class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.userProfileImageView = React.createRef();
  }

  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePictureUri: null,
    emailError: false,
    passwordError: false,
  };

  componentDidMount() {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
    console.log(this.props);
  }

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

  chooseProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      this.setState({ profilePictureUri: result.uri });

      if (Platform.OS == "android") {
        this.userProfileImageView.current.setNativeProps({
          src: [{ uri: result.uri }],
        });
      } else if (Platform.OS == "ios") {
        this.userProfileImageView.current.setNativeProps({
          source: [{ uri: result.uri }],
        });
      }
    }
  };

  onLogInPress = () => {
    this.props.navigation.navigate("Login");
  };

  onRegisterPress = () => {
    var email = this.state.email;
    var password = this.state.email;
    var firstName = this.state.firstName;
    var lastName = this.state.lastName;
    var profilePictureUri = this.state.profilePictureUri;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const userData = {
          uid: uid,
          email: email,
          firstName: firstName,
          lastName: lastName,
          profilePictureUri: profilePictureUri,
        };
        console.log(userData);
        // this.props.registerUser(userData);
        // firebase
        //   .database()
        //   .ref("users/" + uid)
        //   .set(userData);
      })
      .catch((error) => {
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
            <Button
              active={false}
              onPress={this.chooseProfileImage}
              style={styles.userImageButton}
            >
              <Image
                ref={this.userProfileImageView}
                defaultSource={require("../../assets/add_profile_image.png")}
                source={require("../../assets/add_profile_image.png")}
                style={styles.userImage}
              />
            </Button>
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
                  this.setEmail(text);
                  this.validateEmail(text);
                }}
                value={this.state.email}
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

            <Item
              rounded
              style={
                !this.state.passwordError
                  ? styles.formItem
                  : styles.formItemError
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
                  this.setPassword(text);
                  this.validatePassword(text);
                }}
                value={this.state.password}
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
  userImage: {
    width: 128,
    height: 128,
    borderRadius: 128 / 2,
    overflow: "hidden",
  },
  userImageButton: {
    alignSelf: "center",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 136,
    height: 136,
    borderRadius: 136 / 2,
    borderWidth: 4,
    borderColor: theme.brandInfo,
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
  formItemError: {
    backgroundColor: "#00000050",
    borderColor: theme.brandDanger,
    marginVertical: 10,
  },
  formErrorIconAndText: {
    color: theme.brandDanger,
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

function mapDispatchToProps(dispatch) {
  return {
    registerUser: bindActionCreators(registerUser, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
