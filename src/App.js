import React, { Component } from "react";
import { registerRootComponent } from "expo";
import AllAppProviders from "./navigation";

class RemorseApp extends Component {
  render() {
    return <AllAppProviders />;
  }
}

registerRootComponent(RemorseApp);
export default RemorseApp;
