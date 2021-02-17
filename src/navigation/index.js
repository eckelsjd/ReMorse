import React, {Component} from "react";
import { Provider } from "react-redux";
import { getTheme, StyleProvider, Root } from "native-base";
import theme from "../../native-base-theme/variables/custom";
import store from "../redux/reducers";
import { AuthProvider } from "./AuthProvider";
import Routes from "./Routes";

export default class AllAppProviders extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(theme)}>
        <Provider store={store}>
          <Root>
            <AuthProvider>
              <Routes />
            </AuthProvider>
          </Root>
        </Provider>
      </StyleProvider>
    );
  }
}
