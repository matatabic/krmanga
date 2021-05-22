import React from "react";
import { Provider } from "react-redux";
import { RootSiblingParent } from "react-native-root-siblings";
import Navigator from "@/navigator/index";
import store from "@/config/dva";
import { StatusBar } from "react-native";
import "@/config/http";
import { enableScreens } from "react-native-screens";
import codePush from "react-native-code-push";

enableScreens();

const App = () => {
    return (
        <Provider store={store}>
            <RootSiblingParent>
                <Navigator />
            </RootSiblingParent>
            <StatusBar
                backgroundColor="transparent"
                barStyle="dark-content"
                translucent
            />
        </Provider>
    );
};

const MyApp = codePush({
    updateDialog: false,
    checkFrequency: codePush.CheckFrequency.MANUAL,
    installMode: codePush.InstallMode.ON_NEXT_RESTART
})(App);

export default MyApp;
